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
              <q-btn v-if="propsAcceptReject.row.assigned !== ''" size="sm" round color="teal" icon="done" class="q-ma-xs"/>
              <q-btn v-if="propsAcceptReject.row.assigned !== ''" size="sm" round color="red-5" icon="clear" class="q-ma-xs"/>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
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
      allTasks: {},
      allCards: {},
      currentUser: {},
      loading: false,
      columns: [
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
    this.fetchCards()
    this.currentUser = this.getCurrentUser()
    this.allCards = this.getCards()
    this.allProjects = this.getProjects()
    this.allTasks = this.tasksToArray()
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
    tasksToArray () {
      const taskValues = []
      setTimeout(() => {
        const userTasks = this.currentUser.tasks
        for (const t in userTasks) {
          const task = userTasks[t]
          const currentCard = this.getCurrentCard(task.card_id)
          const currentTask = this.getCurrentTask(task.subtask_id, currentCard.subtasks)
          const cardProject = this.getCurrentProject(currentCard.project_id)
          const cardReorder = { project: cardProject.name, card: currentCard.card_name, task: currentTask.subtask_name, accepted: task.accepted, assigned: currentTask.assigned_user }
          taskValues.push(cardReorder)
        }
      }, 100)
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
    }
  }
}
</script>
