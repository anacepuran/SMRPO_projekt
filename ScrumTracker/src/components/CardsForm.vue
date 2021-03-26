<template>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md">
        <q-input
            filled
            v-model="newCard.card_name"
            label="Card name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
        <q-input
            filled
            v-model="newCard.description"
            label="Card description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
        <q-select
            filled
            v-model="newCard.priority"
            :options="priority_options"
            label="Priority"
            style="width: 250px"
        />
        <q-input
            filled
            v-model="newCard.acceptance_test"
            label="Acceptance test"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
        <q-card-actions horizontal align="right">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CardForm',
  data () {
    return {
      newCard: {
        sprint_id: '',
        card_name: '',
        description: '',
        acceptance_test: '',
        priority: '',
        value: '',
        subtasks: '',
        round: '' // to do / in progress / done / test
      },
      priority_options: ['Must have', 'Could have', 'Should have', 'Won\'t have this time'],
      allCards: [],
      error: ''
    }
  },
  props: {
    newCards: {
      type: Object
    }
  },
  computed: {
    allUsers () {
      var data = []
      var users = this.getUsers()
      for (var user in users) {
        var userData = {
          label: users[user].username,
          value: users[user].username,
          role: ''
        }
        data.push(userData)
      }
      console.log(data)
      return data
    }
  },
  mounted () {
    this.fetchCards()
    this.fetchUsers()
    var projects = this.getCards()
    this.allProjects = this.projectsToArray(projects)
    this.onReset()
  },
  methods: {
    ...mapGetters('card', [
      'getCards'
    ]),
    ...mapGetters('user', [
      'getUsers'
    ]),
    ...mapActions('card', [
      'fetchCards',
      'postCard',
      'updateCard'
    ]),
    ...mapActions('user', [
      'fetchUsers'
    ]),
    projectsToArray (projects) {
      var data = []
      for (var project in projects) {
        data.push(projects[project])
      }
      return data
    },
    usersPushData (users) {
      var data = []
      var allUsers = this.getUsers()
      for (var user in users) {
        for (var isUser in allUsers) {
          if (users[user].label === allUsers[isUser].username) {
            var push = {
              user_name: allUsers[isUser].username,
              user_id: allUsers[isUser]._id,
              user_role: users[user].role
            }
            data.push(push)
          }
        }
      }
      return data
    },
    checkProjectName () {
      // CHECK IF USER WITH USERNAME ALREADY EXISTS
      var alreadyExists = false
      if (this.newCard.card_name !== this.newCards.card_name) {
        for (var project in this.allCards) {
          if (this.newCard.card_name === this.allCards[project].card_name) {
            alreadyExists = true
            this.error = 'Project with the name "' + this.pushProject.name + '" already exists.'
          }
        }
      } else {
        alreadyExists = true
      }
      return alreadyExists
    },
    setPushUser () {
      this.newCard.users = this.usersPushData(this.newCard.users)
    },
    onSubmit () {
      var submitMessage = ''

      this.setPushUser()
      if (this.$props.editProject) {
        submitMessage = 'Card updated.'
        this.updateCard(this.newCard)
        this.onReset()
      } else {
        submitMessage = 'Card added.'
        this.postCard(this.newCard)
        this.onReset()
      }
      // if(this.pushProject.startdate )
      this.$q.notify({
        color: 'green',
        textColor: 'white',
        icon: 'cloud_done',
        message: submitMessage,
        position: 'top-right',
        timeout: 1000
      })
      this.error = ''
      this.$emit('submitProject')
    },
    onReset () {
      this.newCard.sprint_id = this.$props.newCards.sprint_id
      this.newCard.card_name = this.$props.newCards.card_name
      this.newCard.description = this.$props.newCards.description
      this.newCard.acceptance_test = this.$props.newCards.acceptance_test
      this.newCard.priority = this.$props.newCards.priority
      this.newCard.value = this.$props.newCards.value
      this.newCard.subtasks = this.$props.newCards.subtasks
      this.newCard.round = this.$props.newCards.round
      this.error = ''
    }
  }
}
</script>
