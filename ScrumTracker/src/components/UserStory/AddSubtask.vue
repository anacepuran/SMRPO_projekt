<template>
  <div class="q-ma-md">
    <q-form
        class="q-ma-md"
        @submit="onSubmit"
        @reset="onReset">
        <q-input
            filled
            :disable ="subtask.assigned_user !== '' && edit === true"
            v-model="subtask.subtask_name"
            label="Name"
            class="q-ma-md"
            lazy-rules
            :rules="[val => val !== null && val !== '' || 'Please add name']"/>
        <q-input
            class="q-ma-md"
            filled
            v-model="subtask.subtask_time"
            type="number"
            min="1"
            style="width: 230px"
            label="Time expected [hours]"
            lazy-rules
            :rules="[val => val !== null && val !== '' || 'Please select expected time']"/>
        <q-select
              filled
              :disable ="subtask.assigned_user !== '' && edit === true"
              class="q-ma-md"
              v-model="subtask.assignees"
              :options="projectUsers"
              label="Assignees"
              color="secondary"
              use-chips
              stack-label
        />
        <q-space/>
        <q-card-actions horizontal align="right">
            <q-btn label="Submit" type="submit" color="primary" />
        </q-card-actions>
        <div class="q-ma-md text-center">
            <p style="color: red;" v-if="error != ''">{{error}}</p>
        </div>
    </q-form>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AddSubtask',
  props: {
    card: {
      type: Object
    },
    project: {
      type: Object
    },
    projectUsers: {
      type: Array
    },
    subtask: {
      type: Object
    },
    edit: {
      type: Boolean
    }
  },
  data () {
    return {
      error: '',
      uuid: uuid.v1(),
      submitMessage: '',
      users: {},
      usersBeforeEdit: []
    }
  },
  mounted () {
    this.fetchUsers()
    setTimeout(() => {
      this.users = this.getUsers()
    }, 200)
    this.usersBeforeEdit = this.subtask.assignees
  },
  methods: {
    ...mapActions('card', [
      'updateCard'
    ]),
    ...mapActions('user', [
      'updateUserTasks'
    ]),
    ...mapGetters('user', [
      'getUsers'
    ]),
    ...mapActions('user', [
      'fetchUsers'
    ]),
    onSubmit () {
      if (this.edit) {
        this.editTaskFunction()
      } else {
        this.addTaskFunction()
        this.onReset()
      }
      this.$q.notify({
        color: 'green',
        textColor: 'white',
        icon: 'cloud_done',
        message: this.submitMessage,
        position: 'top-right',
        timeout: 1000
      })
      this.$emit('submitTask')
    },
    setTask () {
      const task = {}
      if (this.edit === false) {
        task.subtask_id = this.uuid
      } else {
        task.subtask_id = this.subtask.subtask_id
      }
      if (!this.subtask.assignees || this.subtask.assignees.length === 0) {
        task.assignees = this.projectUsers
      } else if (!Array.isArray(this.subtask.assignees)) {
        const arr = []
        arr.push(this.subtask.assignees)
        task.assignees = arr
      } else {
        task.assignees = this.subtask.assignees
      }
      task.subtask_name = this.subtask.subtask_name
      task.subtask_time = this.subtask.subtask_time
      task.assigned_user = ''
      task.done = false
      return task
    },
    getCurrentUser (assignee) {
      for (const u in this.users) {
        if (this.users[u].username === assignee) {
          return this.users[u]
        }
      }
      return null
    },
    editTaskCard (task) {
      for (const t in this.card.subtasks) {
        if (this.card.subtasks[t].subtask_id === task.subtask_id) {
          this.card.subtasks[t] = task
        }
      }
    },
    deleteTaskFromUser (user, task) {
      for (const t in user.tasks) {
        if (user.tasks[t].subtask_id === task.subtask_id) {
          user.tasks.pop(user.tasks[t])
        }
      }
      return user
    },
    editTaskFunction () {
      console.log(this.subtask)
      // CAN EDIT EVERY FIELD
      if (this.subtask.assigned_user === '') {
        this.submitMessage = 'Task edited.'
        // EDIT SPECIFIC TASK IN CARD COLLECTION
        const task = this.setTask()
        this.editTaskCard(task)
        this.updateCard(this.card)
        // EDIT SPECIFIC TASK IN USERS COLLECTION - DELETE FIRST
        for (const a in this.usersBeforeEdit) {
          let currentUser = this.getCurrentUser(this.usersBeforeEdit[a])
          currentUser = this.deleteTaskFromUser(currentUser, task)
          this.updateUserTasks(currentUser)
        }
        // EDIT SPECIFIC TASK IN USERS COLLECTION - ADD TO REASSIGNED USERS
        setTimeout(() => {
          const userTask = {}
          userTask.accepted = false
          userTask.card_id = this.card._id
          userTask.subtask_id = task.subtask_id
          for (const a in task.assignees) {
            const currentUser = this.getCurrentUser(task.assignees[a])
            currentUser.tasks.push(userTask)
            this.updateUserTasks(currentUser)
          }
        }, 3000)
        this.usersBeforeEdit = []
      // EDIT ONLY TIME
      } else {
        const task = {}
        task.subtask_id = this.subtask.subtask_id
        task.subtask_name = this.subtask.subtask_name
        task.subtask_time = this.subtask.subtask_time
        task.assignees = this.subtask.assignees
        task.assigned_user = this.subtask.assigned_user
        task.done = false
        this.editTaskCard(task)
        this.updateCard(this.card)
      }
    },
    addTaskFunction () {
      // ADD TASK TO CARD DB
      const task = this.setTask()
      this.card.subtasks.push(task)
      this.updateCard(this.card)
      // ADD TASK TO USERS DB
      const userTask = {}
      userTask.accepted = false
      userTask.card_id = this.card._id
      userTask.subtask_id = task.subtask_id
      if (!Array.isArray(task.assignees)) {
        const arr = []
        arr.push(task.assignees)
        task.assignees = arr
      }
      for (const a in task.assignees) {
        const currentUser = this.getCurrentUser(task.assignees[a])
        currentUser.tasks.push(userTask)
        this.updateUserTasks(currentUser)
      }
      this.submitMessage = 'Task added.'
    },
    onReset () {
      this.subtask.subtask_name = ''
      this.subtask.subtask_time = ''
      this.subtask.assignees = []
      this.subtask.subtask_id = ''
      this.error = ''
    }
  }
}
</script>
