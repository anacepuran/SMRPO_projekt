<template>
  <div>
    <div v-if="card.subtasks !== '' || card.subtasks.length !== 0">
      <q-table
        class="q-pa-lg"
        :data="card.subtasks"
        :columns="columns"
        virtual-scroll
        :rows-per-page-options="[0]"
        hide-bottom
        style="box-shadow: none">
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body-cell-status="propsStatus">
          <q-td :props="propsStatus">
            <div>
              <span v-if="propsStatus.row.done === true" class="text-teal">DONE</span>
              <span v-if="propsStatus.row.done !== true" class="text-blue-4">ACTIVE</span>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-name="propsName">
          <q-td :props="propsName" class="text-caption" style="font-size:13px">
            {{propsName.row.subtask_name}}
          </q-td>
        </template>
        <template v-slot:body-cell-assignee="propsAssignee">
          <q-td :props="propsAssignee">
            <span v-if="propsAssignee.row.assigned_user !== ''"><b>{{ getUserIdentity(propsAssignee.row.assigned_user) }}</b></span>
            <span v-if="propsAssignee.row.assigned_user === ''" class="text-grey-9"><b>Not assigned</b></span>
          </q-td>
        </template>
        <template v-slot:body-cell-time="propsTime">
          <q-td :props="propsTime">
            {{ propsTime.row.subtask_time }}h
          </q-td>
        </template>
        <template v-slot:body-cell-delete="propsDelete">
          <q-td :props="propsDelete">
            <q-btn v-if="propsDelete.row.assigned_user === ''" style="font-size: 10px" round color="red-5" icon="delete" class="q-ma-xs" @click="deleteTaskBool = true; deleteTaskObj = propsDelete.row"/>
            <q-btn style="font-size: 10px" round color="blue-5" icon="edit" class="q-ma-xs" @click="editTaskBool = true; editTaskObj = propsDelete.row"/>
          </q-td>
        </template>
      </q-table>
    </div>
    <div v-if="card.subtasks === '' || card.subtasks.length === 0" class="text-overline text-center" style="font-size:13px">
      There are no tasks in this user story.
    </div>
    <div>
    <q-dialog v-model="editTaskBool">
      <q-card class="q-pa-md" style="width: 80vh">
        <q-card-section class="row items-center">
          <div class="text-h6"> Edit Task </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <AddSubtask :card="this.card" :project="this.project" :subtask="this.editTaskObj" :edit="true" :projectUsers="this.projectUsers" @submitTask="editTaskBool=false; $emit('submit')"/>
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
      allCards: {},
      columns: [
        { name: 'status', align: 'center', label: 'Status' },
        { name: 'name', required: true, label: 'Name', align: 'center', field: 'name' },
        { name: 'assignee', required: true, align: 'center', label: 'Assignee', field: 'assignee' },
        { name: 'time', required: true, align: 'center', label: 'Time expected', field: 'time' },
        { name: 'delete', align: 'center', label: '' }
      ]
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
      // CHANGE CARD DATA IN DB
      const currentCard = this.getCurrentCard()
      const filteredSubtasks = currentCard.subtasks.filter((item) => item.subtask_id !== this.deleteTaskObj.subtask_id)
      currentCard.subtasks = filteredSubtasks
      this.updateCard(currentCard)

      // CHANGE USER DATA IN DB
      for (const u in this.deleteTaskObj.assignees) {
        const user = this.getUserIdentityObj(this.deleteTaskObj.assignees[u])
        const filteredSubtasksUser = user.tasks.filter((item) => item.subtask_id !== this.deleteTaskObj.subtask_id)
        user.tasks = filteredSubtasksUser
        this.updateUserTasks(user)
        this.updateCurrentUser(user)
      }
      this.$emit('refreshCards')
    },
    editTaskFunction () {
      this.editTaskBool = false
      this.$emit('refreshCards')
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
