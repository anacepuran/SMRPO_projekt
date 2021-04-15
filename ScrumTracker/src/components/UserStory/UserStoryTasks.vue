<template>
  <div>
    <div>
      <q-list separator>
        <!-- TO DO: POPRAVI IZGLED SEZNAMA -->
        <div v-for="(task, index) in card.subtasks" v-bind:key="index">
          <q-item v-if="card.subtasks !== '' || card.subtasks.length !== 0" clickable v-ripple>
            <q-item-section avatar style="display: inline">
              <span class="text-overline q-pr-sm">
                <span v-if="task.done === true" class="text-teal">DONE</span>
                <span v-if="task.done === false" class="text-blue-4">ACTIVE</span>
              </span>
            </q-item-section>
            <q-item-section class="text-caption" style="font-size:13px" @click="editTaskBool = true; editTaskObj = task">{{ task.subtask_name }}</q-item-section>
            <q-item-section @click="editTaskBool = true; editTaskObj = task">
              <span v-if="task.assigned_user !== ''"><b>{{ getUserIdentity(task.assigned_user) }}</b></span>
              <span v-if="task.assigned_user === ''" class="text-grey-9"><b>Not assigned</b></span>
            </q-item-section>
            <q-item-section >
              <span>{{ task.subtask_time }}h</span>
            </q-item-section>
            <q-item-section v-if="task.assigned_user === ''" side>
              <q-btn style="font-size: 10px" round color="red-5" icon="delete" class="q-ma-xs" @click="deleteTaskBool = true; deleteTaskObj = task"/>
            </q-item-section>
          </q-item>
          <q-separator/>
        </div>
        <q-item v-if="card.subtasks === '' || card.subtasks.length === 0">
          <span class="text-overline" style="font-size:13px">There are no tasks in this user story.</span>
        </q-item>
      </q-list>
    </div>
    <div>
    <q-dialog v-model="editTaskBool">
      <q-card class="q-pa-md" style="width: 80vh">
        <q-card-section class="row items-center">
          <div class="text-h6"> Edit Task </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <AddSubtask :card="this.card" :project="this.project" :subtask="this.editTaskObj" :edit="true" :projectUsers="this.projectUsers" @submit="editTaskFunction"/>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteTaskBool" transition-show="scale" transition-hide="scale">
      <q-card style="width: 300px" class="text-subtitle1 text-center">
        <q-card-section>
          Are you sure you want to delete this Task?
          <q-card-actions align="center">
            <q-btn flat label="Cancel" color="teal" v-close-popup />
            <q-btn flat @click="deleteFunction()" label="DELETE" color="red-6" v-close-popup />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
    </div>
  </div>
</template>

<script>
import AddSubtask from 'components/UserStory/AddSubtask.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UserStoryTasks',
  components: { AddSubtask },
  props: {
    card: {
      type: Object
    },
    project: {
      type: Object
    },
    projectUsers: {
      type: Array
    }
  },
  data () {
    return {
      users: {},
      editTaskBool: false,
      deleteTaskBool: false,
      deleteTaskObj: {},
      editTaskObj: {},
      allCards: {}
    }
  },
  mounted () {
    this.fetchUsers()
    this.users = this.getUsers()
    this.allCards = this.getCards()
    this.currentUser = this.getCurrentUser()
  },
  methods: {
    ...mapGetters('user', [
      'getUsers'
    ]),
    ...mapActions('user', [
      'fetchUsers',
      'updateUserTasks',
      'updateCurrentUser'
    ]),
    ...mapGetters('card', [
      'getCards'
    ]),
    ...mapActions('card', [
      'updateCard'
    ]),
    ...mapGetters('user', [
      'getUsers',
      'getCurrentUser'
    ]),
    getUserIdentity (userId) {
      for (const u in this.users) {
        if (this.users[u]._id === userId) {
          return this.users[u].username
        }
      }
    },
    getUserIdentityObj (username) {
      for (const u in this.users) {
        if (this.users[u].username === username) {
          return this.users[u]
        }
      }
    },
    deleteFunction () {
      console.log(this.deleteTaskObj)
      // CHANGE CARD DATA IN DB
      const currentCard = this.getCurrentCard()
      const filteredSubtasks = currentCard.subtasks.filter((item) => item.subtask_id !== this.deleteTaskObj.subtask_id)
      currentCard.subtasks = filteredSubtasks
      this.updateCard(currentCard)

      // CHANGE USER DATA IN DB
      for (const u in this.deleteTaskObj.assignees) {
        const user = this.getUserIdentityObj(this.deleteTaskObj.assignees[u])
        console.log(user.tasks)
        const filteredSubtasksUser = user.tasks.filter((item) => item.subtask_id !== this.deleteTaskObj.subtask_id)
        user.tasks = filteredSubtasksUser
        this.updateUserTasks(user)
        this.updateCurrentUser(user)
      }
      this.allCards = this.getCards()
    },
    editTaskFunction () {
      this.editTaskBool = false
      this.allCards = this.getCards()
    },
    getCurrentCard () {
      for (const c in this.allCards) {
        for (const t in this.allCards[c].subtasks) {
          if (this.allCards[c].subtasks[t].subtask_id === this.deleteTaskObj.subtask_id) {
            return this.allCards[c]
          }
        }
      }
    },
    getCurrentTask (task, tasks) {
      for (const t in tasks) {
        if (tasks[t].subtask_id === task) {
          return tasks[t]
        }
      }
    }
  }
}
</script>
