<template>
  <div>
    <q-list bordered separator>
      <div v-for="(task, index) in card.subtasks" v-bind:key="index">
        <q-item v-if="card.subtasks !== '' || card.subtasks.length !== 0" clickable v-ripple>
          <q-item-section avatar>
            <span class="text-overline text-red-4" v-if="task.done === true">DONE</span>
            <span class="text-overline text-teal" v-if="task.done === false">ACTIVE</span>
          </q-item-section>
          <q-item-section class="text-caption" style="font-size:13px">{{ task.subtask_name }}</q-item-section>
          <q-item-section side>
            <span v-if="task.assigned_user !== ''" class="text-teal">TASK ASSIGNEE: <span class="text-black">{{ getUserIdentity(task.assigned_user) }}</span></span>
            <span v-if="task.assigned_user === ''" class="text-red-4"> TASK NOT ASSIGNED </span>
          </q-item-section>
        </q-item>
        <!-- TO DO: PRIKAZI NAPIS DA NI NALOG V STORIJU -->
        <div v-if="card.subtasks === '' || card.subtasks.length === 0 || card.subtasks === undefined">
          <span class="text-caption" style="font-size:13px">There are no tasks in this user story.</span>
        </div>
      </div>
    </q-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      users: {}
    }
  },
  mounted () {
    this.users = this.getUsers()
  },
  methods: {
    ...mapGetters('user', [
      'getUsers'
    ]),
    getUserIdentity (userId) {
      console.log(userId)
      for (const u in this.users) {
        console.log(this.users[u]._id)
        if (this.users[u]._id === userId) {
          return this.users[u].username
        }
      }
    }
  }
}
</script>
