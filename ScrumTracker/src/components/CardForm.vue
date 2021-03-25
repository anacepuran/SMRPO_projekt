<template>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
        <q-input
            filled
            v-model="pushCard.card_name"
            label="Card name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
          filled
          v-model="pushCard.description"
          label="Description name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
          filled
          v-model="pushCard.value"
          label="Value"
          mask="#.#"
          fill-mask="0"
          reverse-fill-mask
          hint="Mask: #.#"
          input-class="text-right"
        ></q-input>
        <q-card-actions horizontal align="right">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
        <div class="q-ma-md text-center">
            <p style="color: red;" v-if="error != ''">{{error}}</p>
        </div>
    </q-form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CardForm',
  data () {
    return {
      error: '',
      roleOptions: ['Product Owner', 'Developer', 'Scrum Master'],
      allProjects: [],
      allCards: [],
      pushCard: {
        cardname: '',
        description: '',
        acceptancetest: '',
        priority: '',
        subtasks: '',
        value: ''
      },
    }
  },
  props: {
    editCard: {
      type: Boolean
    },
    newCard: {
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
    this.fetchCard()
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
      'fetchCard',
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
    setdates () {
      this.pushProject.startdate = this.selectDeadline.from
      this.pushProject.enddate = this.selectDeadline.to
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
    getDate () {
      var d = new Date()
      var dateNow = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
      return dateNow
    },
    checkProjectName () {
      // CHECK IF USER WITH USERNAME ALREADY EXISTS
      var alreadyExists = false
      if (this.pushCard.cardname !== this.newCard.cardname) {
        for (var card in this.allCards) {
          if (this.pushCard.cardname === this.allCards[card].cardname) {
            alreadyExists = true
            this.error = 'Card with the name "' + this.pushCard.name + '" already exists.'
          }
        }
      } else {
        alreadyExists = true
      }
      return alreadyExists
    },
    setPushUser () {
      this.pushProject.users = this.usersPushData(this.pushProject.users)
    },
    onSubmit () {
      var submitMessage = ''
      if (!this.checkProjectName()) {
        this.setPushUser()
        if (this.$props.editProject) {
          submitMessage = 'Project updated.'
          this.updateSprint(this.pushProject)
          this.onReset()
        } else {
          submitMessage = 'Project added.'
          this.postSprint(this.pushProject)
          this.onReset()
        }
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
      }
    },
    onReset () {
      this.pushCard.cardname = this.$props.newCard.cardname
      this.pushCard.description = this.$props.newCard.description
      this.pushCard.value = this.$props.newCard.value
      this.pushCard.acceptancetest = this.$props.newCard.acceptancetest
      this.pushCard.subtasks = this.$props.newCard.subtasks
      this.error = ''
    }
  }
}
</script>
