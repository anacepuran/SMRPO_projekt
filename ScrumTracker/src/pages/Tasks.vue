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
        <template v-slot:body-cell-acceptReject="propsAcceptReject">
          <q-td :props="propsAcceptReject">
            <div>
              <q-btn v-if="propsAcceptReject.row.assigned === '' && propsAcceptReject.row.accepted !== true" size="sm" round color="teal" icon="done" class="q-ma-xs" @click="acceptTask(propsAcceptReject.row)"/>
              <q-btn v-if="propsAcceptReject.row.accepted === true" size="sm" round color="red-5" icon="clear" class="q-ma-xs" @click="rejectTask(propsAcceptReject.row)"/>
              <q-icon v-if="propsAcceptReject.row.assigned !== '' && propsAcceptReject.row.accepted !== true" size="sm" round color="grey-4" name="hide_source" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-logtime="propsLogTime">
          <q-td :props="propsLogTime">
            <div v-if="propsLogTime.row.assigned !== '' && propsLogTime.row.accepted === true">
              <q-btn v-if="propsLogTime.row.active_task===true" flat size="md" round color="teal" label="timer is running" class="q-ma-xs" @click="logTimeDialog=true; logToTaskRow=propsLogTime.row; timeLeft=propsLogTime.row.time" />
              <q-btn v-else flat size="md" round color="teal" icon="schedule" class="q-ma-xs" @click="logTimeDialog=true; logToTaskRow=propsLogTime.row; timeLeft=propsLogTime.row.time" />
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
    <q-dialog v-model="logTimeDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 400px">
        <q-card-section class="bg-primary text-white text-center" >
          <div class="text-h6">Log Time</div>
        </q-card-section>
        <q-card-section class="row bg-white text-primary flex flex-center">
          <q-btn v-if="timerRunning===false && logToTaskRow.active_task===false" label="start timer" icon="schedule" color="primary" @click="startTimer()" class="q-ma-md" size="lg"/>
          <q-btn v-else label="stop timer" icon="schedule" color="secondary" @click="stopTimer()" class="q-ma-md" size="lg"/>
        </q-card-section>
        <q-separator inset />
        <q-card-section v-if="timerRunning===false || logToTaskRow.active_task===false" >
          <div class="text-caption q-ma-sm">or Log Time for this task.</div>
          <div class="row">
            <q-input v-model="timeSpent" hint="please use the form '1d 2h 33m' (days, hours, minutes)" filled style="max-width: 150px" class="q-ma-md"/>
            <q-space />
            <q-input v-model="timeLeft" hint="Time left to finish this task (specify in hours)." filled style="max-width: 150px" class="q-ma-md"/>
          </div>
        </q-card-section>
        <q-card-section v-if="errorMessageTime!==''">
          <p class="text-red text-caption text-center">{{ errorMessageTime }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="cancel" @click="timeSpent=0" v-close-popup/>
          <q-space />
          <q-btn v-if="timerRunning===false" color="primary" label="Log Time" @click="writeTime()" />
          <q-btn v-else color="secondary" label="Ok" v-close-popup />
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
      startTime: 0,
      stopTime: 0,
      timeSpent: 0,
      timeLeft: 0,
      timerRunning: false,
      errorMessageTime: '',
      logToTaskRow: '',
      allTasks: [],
      allCards: [],
      currentUser: {},
      loading: false,
      errorMessage: '',
      errorMessageDialog: false,
      logTimeDialog: false,
      columns: [
        { name: 'finnished', align: 'center', label: 'Mark as (not) done' },
        { name: 'project', required: true, label: 'Project name', align: 'center', field: 'project' },
        { name: 'card', required: true, align: 'center', label: 'Card name', field: 'card' },
        { name: 'task', required: true, align: 'center', label: 'Task name', field: 'task' },
        { name: 'acceptReject', align: 'center', label: 'Accept/Reject' },
        { name: 'timespent', align: 'center', label: 'Time Spent', field: 'time_spent' },
        { name: 'timeleft', align: 'center', label: 'Time Left (h)', field: 'time' },
        { name: 'logtime', align: 'center', label: 'Log Time' }
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
    startTimer () {
      console.log(this.logToTaskRow.active)
      this.timerRunning = true
      this.startTime = new Date()
      const user = this.currentUser
      const subtaskKeyUser = this.getKeyOfSubtask(user.tasks, this.logToTaskRow.subtaskId)
      const currentSubtaskUser = this.getCurrentTask(this.logToTaskRow.subtaskId, user.tasks)
      currentSubtaskUser.active_task = true
      currentSubtaskUser.start_time = this.startTime
      user.tasks[subtaskKeyUser] = currentSubtaskUser
      this.updateUserTasks(user)
      this.updateCurrentUser(user)
      this.showTasks()
    },
    stopTimer () {
      this.timerRunning = false
      this.stopTime = new Date()
      const user = this.currentUser
      const subtaskKeyUser = this.getKeyOfSubtask(user.tasks, this.logToTaskRow.subtaskId)
      const currentSubtaskUser = this.getCurrentTask(this.logToTaskRow.subtaskId, user.tasks)
      var timeToLog = 0
      if (this.startTime) {
        timeToLog = this.stopTime.getTime() - this.startTime.getTime()
      } else {
        timeToLog = this.stopTime.getTime() - currentSubtaskUser.start_time.getTime()
      }
      this.timeSpent = this.formatTimeFromMs(timeToLog)
      currentSubtaskUser.active_task = false
      currentSubtaskUser.start_time = ''
      user.tasks[subtaskKeyUser] = currentSubtaskUser
      this.updateUserTasks(user)
      this.updateCurrentUser(user)
      this.showTasks()
      // this.logTimeDialog = false
    },
    formatTimeFromMs (timeToLog) {
      var days = Math.floor(timeToLog / (1000 * 60 * 60 * 24))
      var tmp = days * 1000 * 60 * 60 * 24
      var hours = Math.floor((timeToLog - tmp) / (1000 * 60 * 60))
      tmp = (days * 1000 * 60 * 60 * 24) + (hours * 1000 * 60 * 60)
      var minutes = Math.round((timeToLog - tmp) / (1000 * 60))
      var returnTime = ''
      if (days > 0) {
        returnTime += days + 'd '
      } else if (hours > 0) {
        returnTime += hours + 'h '
      } else if (minutes > 0) {
        returnTime += minutes + 'm'
      } else {
        returnTime = 0
      }
      return returnTime
    },
    formatTimeToMs (timeToLog) {
      this.errorMessageTime = ''
      var time = timeToLog.split(' ')
      var miliseconds = 0
      for (var t in time) {
        if (time[t].substr(time[t].length - 1, 1) === 'd') {
          miliseconds += time[t].match(/\d+/)[0] * (1000 * 60 * 60 * 24)
        } else if (time[t].substr(time[t].length - 1, 1) === 'h') {
          miliseconds += time[t].match(/\d+/)[0] * (1000 * 60 * 60)
        } else if (time[t].substr(time[t].length - 1, 1) === 'm') {
          miliseconds += time[t].match(/\d+/)[0] * (1000 * 60)
        } else {
          this.errorMessageTime = 'Wrong time format.'
        }
        return miliseconds
      }
    },
    writeTime () {
      const currentCard = this.getCurrentCard(this.logToTaskRow.cardId)
      const currentSubtask = this.getCurrentTask(this.logToTaskRow.subtaskId, currentCard.subtasks)
      const subtaskKeyCard = this.getKeyOfSubtask(currentCard.subtasks, this.logToTaskRow.subtaskId)
      currentSubtask.subtask_time = this.timeLeft
      if (currentSubtask.subtask_time_spent) {
        currentSubtask.subtask_time_spent += this.timeSpent
      } else {
        currentSubtask.subtask_time_spent = this.timeSpent
      }
      currentCard.subtasks[subtaskKeyCard] = currentSubtask
      this.updateCard(currentCard)
      // CHANGE USER DATA IN DB
      const user = this.currentUser
      const subtaskKeyUser = this.getKeyOfSubtask(user.tasks, this.logToTaskRow.subtaskId)
      const currentSubtaskUser = this.getCurrentTask(this.logToTaskRow.subtaskId, user.tasks)
      if (currentSubtaskUser.time_spent) {
        currentSubtaskUser.time_spent += this.timeSpent
      } else {
        currentSubtaskUser.time_spent = this.timeSpent
      }
      user.tasks[subtaskKeyUser] = currentSubtaskUser
      this.updateUserTasks(user)
      this.updateCurrentUser(user)
      if (this.errorMessageTime === '') {
        this.timeSpent = ''
        this.logToTaskRow = ''
        this.logTimeDialog = false
      }
      this.showTasks()
    },
    showTasks () {
      setTimeout(() => {
        this.allCards = this.getCards()
        this.allTasks = this.tasksToArray(this.allCards)
        console.log(this.allTasks)
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
          console.log(currentCard)
          const timeSpentOnTask = this.formatTimeFromMs(task.time_spent)
          const cardProject = this.getCurrentProject(currentCard.project_id)
          const cardReorder = { finnished: currentTask.done, project: cardProject.name, card: currentCard.card_name, subtaskId: task.subtask_id, cardId: task.card_id, task: currentTask.subtask_name, accepted: task.accepted, assigned: currentTask.assigned_user, time: currentTask.subtask_time, time_spent: timeSpentOnTask, active_task: task.active_task, start_time: task.start_time }
          console.log(cardReorder)
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
