<template>
  <q-page class="q-ma-lg window-width">
    <div class="q-pa-md">
      <q-table
        class="q-pa-lg"
        title="Tasks"
        :data="allTasks"
        :columns="columns"
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :loading="loading">
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body-cell-finnished="propsFinnished">
          <q-td :props="propsFinnished">
            <div>
              <q-btn v-if="propsFinnished.row.finnished !== true && propsFinnished.row.accepted === true" size="sm" round color="teal" icon="done" @click="markAsDone(propsFinnished.row)"/>
              <q-btn v-if="propsFinnished.row.finnished === true && propsFinnished.row.accepted === true" size="sm" round color="blue-10" icon="clear" @click="markAsDone(propsFinnished.row)"/>
              <q-icon v-if="propsFinnished.row.accepted !== true" size="sm" round color="grey-4" name="hide_source" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-accepted="propsAccepted">
          <q-td :props="propsAccepted">
            <div>
              <q-icon v-if="propsAccepted.row.accepted === true" size="sm" round color="teal" name="done" />
              <q-icon v-if="propsAccepted.row.accepted !== true" size="sm" round color="red-5" name="clear" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-assigned="propsAssigned">
          <q-td :props="propsAssigned">
            <div>
              <q-icon v-if="propsAssigned.row.assigned !== ''" size="sm" round color="teal" name="done" />
              <q-icon v-if="propsAssigned.row.assigned === ''" size="sm" round color="red-5" name="clear" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-acceptReject="propsAcceptReject">
          <q-td :props="propsAcceptReject">
            <div>
              <q-btn v-if="propsAcceptReject.row.assigned === '' && propsAcceptReject.row.accepted !== true" size="sm" round color="teal" icon="done" class="q-ma-xs" @click="acceptTask(propsAcceptReject.row)"/>
              <q-btn v-if="propsAcceptReject.row.accepted === true" size="sm" round color="red-5" icon="clear" class="q-ma-xs" @click="rejectTask(propsAcceptReject.row)"/>
              <q-icon v-if="propsAcceptReject.row.assigned !== '' && propsAcceptReject.row.accepted !== true" size="sm" round color="grey-4" name="hide_source" />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="errorMessageDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white text-center" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{this.errorMessage}}
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Tasks',
  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },
      allTasks: [],
      allCards: [],
      currentUser: {},
      loading: false,
      errorMessage: '',
      errorMessageDialog: false,
      columns: [
        { name: 'finnished', align: 'center', label: 'Mark as (not) done' },
        { name: 'project', required: true, label: 'Project name', align: 'center', field: 'project' },
        { name: 'card', required: true, align: 'center', label: 'Card name', field: 'card' },
        { name: 'task', required: true, align: 'center', label: 'Task name', field: 'task' },
        { name: 'accepted', required: true, align: 'center', label: 'Accepted', field: 'accepted' },
        { name: 'assigned', required: true, align: 'center', label: 'Assigned', field: 'assigned' },
        { name: 'acceptReject', align: 'center', label: 'Accept/Reject' }
      ]
    }
  },
  mounted () {
    this.currentUser = this.getCurrentUser()
    this.allProjects = this.getProjects()
    this.fetchCards()
    this.showTasks()
  },
  methods: {
    ...mapGetters('user', [
      'getUsers',
      'getCurrentUser'
    ]),
    ...mapGetters('card', [
      'getCards'
    ]),
    ...mapGetters('project', [
      'getProjects'
    ]),
    ...mapActions('card', [
      'fetchCards'
    ]),
    ...mapActions('card', [
      'updateCard'
    ]),
    ...mapActions('user', [
      'updateUserTasks',
      'updateCurrentUser'
    ]),
    showTasks () {
      setTimeout(() => {
        var cards = this.getCards()
        this.allCards = this.getCards()
        this.allTasks = this.tasksToArray(cards)
      }, 500)
    },
    tasksToArray () {
      const taskValues = []
      setTimeout(() => {
        const userTasks = this.currentUser.tasks
        for (const t in userTasks) {
          const task = userTasks[t]
          const currentCard = this.getCurrentCard(task.card_id)
          const currentTask = this.getCurrentTask(task.subtask_id, currentCard.subtasks)
          const cardProject = this.getCurrentProject(currentCard.project_id)
          const cardReorder = { finnished: currentTask.done, project: cardProject.name, card: currentCard.card_name, subtaskId: task.subtask_id, cardId: task.card_id, task: currentTask.subtask_name, accepted: task.accepted, assigned: currentTask.assigned_user }
          taskValues.push(cardReorder)
        }
      }, 500)
      return taskValues
    },
    getCurrentCard (card) {
      for (const c in this.allCards) {
        if (this.allCards[c]._id === card) {
          return this.allCards[c]
        }
      }
    },
    getCurrentTask (task, tasks) {
      for (const t in tasks) {
        if (tasks[t].subtask_id === task) {
          return tasks[t]
        }
      }
    },
    getCurrentProject (projectId) {
      for (const p in this.allProjects) {
        if (this.allProjects[p]._id === projectId) {
          return this.allProjects[p]
        }
      }
    },
    getKeyOfSubtask (subtasks, subtask) {
      let key = 0
      for (const t in subtasks) {
        if (subtasks[t].subtask_id === subtask) {
          key = t
        }
      }
      return key
    },
    acceptTask (data) {
      console.log(data)
      // CHANGE CARD DATA IN DB
      const currentCard = this.getCurrentCard(data.cardId)
      const currentSubtask = this.getCurrentTask(data.subtaskId, currentCard.subtasks)
      const subtaskKeyCard = this.getKeyOfSubtask(currentCard.subtasks, data.subtaskId)
      currentSubtask.assigned_user = this.currentUser._id
      currentCard.subtasks[subtaskKeyCard] = currentSubtask
      this.updateCard(currentCard)
      // CHANGE USER DATA IN DB
      const user = this.currentUser
      const subtaskKeyUser = this.getKeyOfSubtask(user.tasks, data.subtaskId)
      const currentSubtaskUser = this.getCurrentTask(data.subtaskId, user.tasks)
      currentSubtaskUser.accepted = true
      user.tasks[subtaskKeyUser] = currentSubtaskUser
      this.updateUserTasks(user)
      this.updateCurrentUser(user)
      this.showTasks()
    },
    rejectTask (data) {
      console.log(data)
      // CHANGE CARD DATA IN DB
      const currentCard = this.getCurrentCard(data.cardId)
      const currentSubtask = this.getCurrentTask(data.subtaskId, currentCard.subtasks)
      const subtaskKeyCard = this.getKeyOfSubtask(currentCard.subtasks, data.subtaskId)
      currentSubtask.assigned_user = ''
      currentCard.subtasks[subtaskKeyCard] = currentSubtask
      this.updateCard(currentCard)
      // CHANGE USER DATA IN DB
      const user = this.currentUser
      const subtaskKeyUser = this.getKeyOfSubtask(user.tasks, data.subtaskId)
      const currentSubtaskUser = this.getCurrentTask(data.subtaskId, user.tasks)
      currentSubtaskUser.accepted = false
      user.tasks[subtaskKeyUser] = currentSubtaskUser
      this.updateUserTasks(user)
      this.updateCurrentUser(user)
      this.showTasks()
    },
    markAsDone (data) {
      const currentCard = this.getCurrentCard(data.cardId)
      const currentSubtask = this.getCurrentTask(data.subtaskId, currentCard.subtasks)
      const subtaskKeyCard = this.getKeyOfSubtask(currentCard.subtasks, data.subtaskId)
      if (currentCard.card_round !== 'DONE') {
        currentSubtask.done = !data.finnished
        currentCard[subtaskKeyCard] = currentSubtask
        this.updateCard(currentCard)
        this.showTasks()
      } else {
        this.errorMessage = 'You can\'t change the status of this task as the associated user stoy is already marked as finnished!'
        this.errorMessageDialog = true
      }
    }
  }
}
</script>
