<template>
  <div>
    <div>
      <q-list bordered separator>
        <div v-for="(task, index) in card.subtasks" v-bind:key="index">
          <q-item v-if="card.subtasks !== '' || card.subtasks.length !== 0" clickable v-ripple :class="setBackgroundColor(task.done)">
            <q-item-section avatar>
              <span>
                <q-btn style="font-size: 10px" round color="red-5" icon="delete" class="q-ma-xs" @click="deleteTask(task)"/>
              </span>
            </q-item-section>
            <q-item-section class="text-caption" style="font-size:13px" @click="editTask(task)">{{ task.subtask_name }}</q-item-section>
            <q-item-section side @click="editTask(task)">
              <span v-if="task.assigned_user !== ''"><b>{{ getUserIdentity(task.assigned_user) }}</b></span>
              <span v-if="task.assigned_user === ''" class="text-grey-9"><b>Not assigned</b></span>
            </q-item-section>
          </q-item>
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
        <q-card-section>
          TO DO: EDIT TASK OBRAZEC
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteTaskBool">
      <q-card class="q-pa-md" style="width: 80vh">
        <q-card-section class="row items-center">
          <div class="text-h6"> Delete Task </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          TO DO: DELETE TASK OBRAZEC
        </q-card-section>
      </q-card>
    </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UserStoryTasks',
  props: {
    card: {
      type: Object
    },
    project: {
      type: Object
    }
  },
  data () {
    return {
      users: {},
      editTaskBool: false,
      deleteTaskBool: false
    }
  },
  mounted () {
    this.fetchUsers()
    this.users = this.getUsers()
  },
  methods: {
    ...mapGetters('user', [
      'getUsers'
    ]),
    ...mapActions('user', [
      'fetchUsers'
    ]),
    getUserIdentity (userId) {
      console.log(userId)
      for (const u in this.users) {
        if (this.users[u]._id === userId) {
          return this.users[u].username
        }
      }
    },
    setBackgroundColor (done) {
      if (done) {
        return 'bg-red-1'
      } else {
        return 'bg-green-1'
      }
    },
    editTask (task) {
      this.editTaskBool = true
      // TUKI DOPOLNES FUNKCIJO ZA UREJANJE KARTICE
      console.log('edit')
    },
    deleteTask (task) {
      this.deleteTaskBool = true
      // TUKI DOPOLNES FUNKCIJO ZA BRISANJE KARTICE
      console.log('delete')
    }
  }
}
</script>
