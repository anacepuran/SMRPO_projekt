<template>
  <div class="text-black" style="width:100%">
    <q-card-section>
      <div v-if="card.subtasks !== '' || card.subtasks.length !== 0">
      <q-table
        class="q-pr-lg q-pl-lg q-pt-lg"
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
        <template v-slot:body-cell-time="propsTime">
          <q-td :props="propsTime">
            {{ propsTime.row.subtask_time }}h
          </q-td>
        </template>
      </q-table>
    </div>
    <div v-if="card.subtasks === '' || card.subtasks.length === 0" class="text-overline text-center" style="font-size:13px">
      There are no tasks in this user story.
    </div>
    </q-card-section>
    <hr class="q-ma-lg" style="opacity:.5">
    <q-card-section>
      <span class="text-overline q-ma-md">ADD COMMENT (only for rejected story)</span>
      <q-input
          filled
          placeholder="New comment"
          type="textarea"
          v-model="rejectedComment"
          class="q-ml-lg q-mr-lg"
          :rows="1"/>
    </q-card-section>
    <div class="q-ma-md text-center">
      <p style="color: red;" v-if="error != ''">{{error}}</p>
    </div>
    <q-card-actions horizontal align="right">
      <q-btn flat label="Accept" color="teal" v-close-popup @click="acceptUserStory()"/>
      <q-btn flat label="Reject" color="red-4" v-close-popup @click="rejectUserStory()"/>
    </q-card-actions>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AcceptReject',
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
      rejectedComment: '',
      users: [],
      error: '',
      columns: [
        { name: 'status', align: 'center', label: 'Status' },
        { name: 'name', required: true, label: 'Name', align: 'center', field: 'name' },
        { name: 'time', required: true, align: 'center', label: 'Time expected', field: 'time' }
      ]
    }
  },
  mounted () {
    this.users = this.getUsers()
  },
  methods: {
    ...mapActions('card', [
      'updateCard'
    ]),
    ...mapActions('user', [
      'fetchUsers',
      'updateUserTasks',
      'updateCurrentUser'
    ]),
    ...mapGetters('user', [
      'getUsers'
    ]),
    acceptUserStory () {
      if (this.computeAllDoneTasks(this.card) === this.card.subtasks.length) {
        this.submitMessage = 'User story accepted.'
        this.card.card_round = 'DONE'
        this.card.comment = ''
        // this.updateCard(this.card)
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          icon: 'cloud_done',
          message: this.submitMessage,
          position: 'top-right',
          timeout: 1000
        })
      } else {
        this.submitMessage = 'In order to accept user story all tasks should be finished.'
        this.$q.notify({
          color: 'orange-4',
          textColor: 'white',
          icon: 'cloud_off',
          message: this.submitMessage,
          position: 'top-right',
          timeout: 4000
        })
      }
    },
    rejectUserStory () {
      this.submitMessage = 'User story rejected.'
      this.card.card_round = 'PRODUCT BACKLOG'
      this.card.sprint_id = ''
      this.card.past_expected_time = this.card.expected_time
      this.card.expected_time = ''
      this.card.comment = this.rejectedComment
      // DELETE USERS TASKS FROM HIS TASKS LIST IN DATABASE
      for (const u in this.projectUsers) {
        const user = this.getUserIdentityObj(this.projectUsers[u])
        const filteredSubtasksUser = user.tasks.filter((item) => item.card_id === this.card.card_id)
        user.tasks = filteredSubtasksUser
        this.updateUserTasks(user)
        this.updateCurrentUser(user)
      }
      // ADD ALL TASKS AGAIN TO ALL PROJECT USERS
      setTimeout(() => {
        for (const u in this.projectUsers) {
          const user = this.getUserIdentityObj(this.projectUsers[u])
          for (const t in this.card.subtasks) {
            const userTask = {}
            userTask.accepted = false
            userTask.card_id = this.card._id
            userTask.subtask_id = this.card.subtasks[t].subtask_id
            user.tasks.push(userTask)
            this.updateUserTasks(user)
            this.updateCurrentUser(user)
          }
        }
      }, 1000)
      for (const task in this.card.subtasks) {
        this.card.subtasks[task].assigned_user = ''
        this.card.subtasks[task].assignees = this.projectUsers
      }
      this.updateCard(this.card)
      this.$q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'cloud_off',
        message: this.submitMessage,
        position: 'top-right',
        timeout: 1000
      })
    },
    computeAllDoneTasks (card) {
      let counterDone = 0
      for (const task in card.subtasks) {
        if (card.subtasks[task].done) {
          counterDone++
        }
      }
      return counterDone
    },
    getUserIdentityObj (username) {
      for (const u in this.users) {
        if (this.users[u].username === username) {
          return this.users[u]
        }
      }
    }
  }
}
</script>
