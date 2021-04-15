<template>
  <div class="q-ma-md">
    <q-form
        class="q-ma-md"
        @submit="onSubmit"
        @reset="onReset">
        <q-input
            filled
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
              class="q-ma-md"
              v-model="subtask.assignees"
              multiple
              :options="projectUsers"
              label="Asignees"
              color="secondary"
              use-chips
              stack-label
        />
        <q-space/>
        <q-card-actions horizontal align="right">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
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
      users: {}
    }
  },
  mounted () {
    this.fetchUsers()
    setTimeout(() => {
      this.users = this.getUsers()
    }, 200)
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

      } else {
        // ADD TASK TO CARD DB
        const task = this.setTask()
        this.card.subtasks.push(task)
        this.updateCard(this.card)
        // ADD TASK TO USERS DB
        // TO DO: PREVERI PODJAVANJE IMENA - NU NUJNO
        const userTask = {}
        userTask.accepted = false
        userTask.card_id = this.card._id
        userTask.subtask_id = task.subtask_id
        for (const a in task.assignees) {
          const currentUser = this.getCurrentUser(task.assignees[a])
          currentUser.tasks.push(userTask)
          this.updateUserTasks(currentUser)
        }
        this.submitMessage = 'Task added.'
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          icon: 'cloud_done',
          message: this.submitMessage,
          position: 'top-right',
          timeout: 1000
        })
        this.onReset()
        this.$emit('submitTask')
      }
    },
    setTask () {
      const task = {}
      task.subtask_id = this.uuid
      if (this.subtask.assignees.length === 0) {
        task.assignees = this.projectUsers
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
      console.log(this.users)
      for (const u in this.users) {
        if (this.users[u].username === assignee) {
          return this.users[u]
        }
      }
      return null
    },
    onReset () {
      this.subtask.subtask_name = ''
      this.subtask.subtask_time = ''
      this.subtask.assignees = ''
      this.subtask.asignees = []
      this.subtask.subtask_id = ''
      this.error = ''
    }
  }
}
</script>
