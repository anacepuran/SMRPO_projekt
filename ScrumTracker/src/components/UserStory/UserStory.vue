<template>
  <div>
    <q-tabs v-model="tab" inline-label class="text-primary shadow-2">
      <q-tab name="details" icon="info" label="Details"/>
      <q-tab v-if="card.card_round !== 'DONE'" name="addSubtasks" icon="add" label="Add task"/>
      <q-tab v-if="checkRole('Product Owner')" name="acceptReject" icon="grading" label="Accept/Reject"/>
      <q-space/>
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="details">
        <UserStoryDetails :card="this.card" :project="this.project"/>
      </q-tab-panel>
      <q-tab-panel name="addSubtasks">
        <AddSubtask :card="this.card" :project="this.project" :projectUsers="this.projectUsers" :subtask="this.subtask" :edit="false" @submitTask="submit"/>
      </q-tab-panel>
      <q-tab-panel name="acceptReject" v-if="checkRole('Product owner')">
        <AcceptReject :card="this.card" :project="this.project"/>
      </q-tab-panel>
    </q-tab-panels>
  <div>
  </div>
  </div>
</template>

<script>
import UserStoryDetails from 'components/UserStory/UserStoryDetails.vue'
import AddSubtask from 'components/UserStory/AddSubtask.vue'
import AcceptReject from 'components/UserStory/AcceptReject.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Card',
  components: { UserStoryDetails, AddSubtask, AcceptReject },
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
  mounted () {
    this.user = this.getCurrentUser()
  },
  methods: {
    ...mapGetters('user', [
      'getCurrentUser'
    ]),
    submit () {
      this.tab = 'details'
      this.$emit('refreshCards')
    },
    checkRole (currentRole) {
      var validRole = false
      if (this.user !== {}) {
        for (var user in this.project.users) {
          if (this.user.username === this.project.users[user].user_name) {
            if (this.project.users[user].user_role[1] === currentRole) {
              validRole = true
            }
          }
        }
      }
      return validRole
    }
  },
  data () {
    return {
      tab: 'details',
      projects: {},
      currentProject: {},
      subtask: {
        subtask_name: '',
        subtask_time: '',
        assignees: []
      },
      user: {}
    }
  }
}
</script>
