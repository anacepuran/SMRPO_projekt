<template>
  <div>
    <q-card class="q-ma-md">
      <q-card-section class="row bg-primary">
        <div class="text-white text-h6 q-ma-sm">Product backlog</div>
        <q-space/>
        <div class="row">
          <q-space/>
          <div class="q-ma-sm">
            <q-btn v-if="checkRole('Product Owner') || checkRole('Scrum Master')" size="md" icon="add" color="secondary" label="Add user story" @click="addCard=true" />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-8">
          <q-card-section class="row bg-secondary">
            <div class="text-white text-overline">UNFINISHED USER STORIES</div>
          </q-card-section>
          <div class="row">
            <div class="col">
              <q-card-section class="row bg-secondary">
                <div class="text-white text-overline">List of user stories</div>
              </q-card-section>
              <div v-for="(card, index) in projectCards" v-bind:key="index" class="q-pa-sm">
                <Card v-if="card.sprint_id === '' && card.card_round !== 'DONE'"  :allCards="allCards" :card="card" :projectId="projectId" :projectUsers="namesOfUsers" @updateCardsArrays="updateCardsArrays"></Card>
              </div>
            </div>
            <div class="col">
              <q-card-section class="row bg-secondary">
                <div class="text-white text-overline">User stories for active Sprint</div>
              </q-card-section>
              <div v-for="(card, index) in projectCards" v-bind:key="index" class="q-pa-sm">
                <Card v-if="card.sprint_id !== '' && isActive(card.sprint_id) && card.card_round !== 'DONE'" :card="card" :projectId="projectId" :projectUsers="namesOfUsers"></Card>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <q-card-section class="row bg-secondary">
            <div class="text-white text-overline">FINISHED</div>
          </q-card-section>
          <div v-for="(card, index) in projectCards" v-bind:key="index" class="q-pa-sm">
            <Card v-if="card.card_round === 'DONE'" :card="card" :projectId="projectId" :projectUsers="namesOfUsers"></Card>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="addCard">
      <q-card class="q-ma-sm" style="width: 80vh">
        <q-card-section class="row bg-primary text-white">
          <div class="text-h6">Add new user story</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="onResetCard" v-close-popup />
        </q-card-section>
        <!-- CARD FORM COMPONENT -->
        <AddCardsForm :newCard="newCard" :editCard="false" @submitCard="onResetCard"></AddCardsForm>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Card from 'components/Card.vue'
import moment from 'moment'
import AddCardsForm from 'components/CardsForm.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ProductBacklog',
  components: { Card, AddCardsForm },
  data () {
    return {
      projectCards: [],
      sprints: {},
      project: {},
      addCard: false,
      allCards: [],
      namesOfUsers: [],
      newCard: {
        _id: '',
        project_id: this.$route.params.id,
        sprint_id: '',
        expected_time: '',
        past_expected_time: '',
        card_name: '',
        comment: '',
        description: '',
        acceptance_test: [],
        priority: '',
        value: '',
        subtasks: [],
        card_round: ''
      }
    }
  },
  mounted () {
    this.fetchCards()
    this.fetchSprint()
    this.project = this.getCurrentproject()
    this.sprints = this.getSprints()
    this.projectCards = this.cardsToArray(this.getCards())
    setTimeout(() => {
      this.namesOfUsers = this.namesOfProjectUsers()
    }, 200)
  },
  props: {
    projectId: {
      type: String
    },
    user: {
      type: Object
    }
  },
  methods: {
    ...mapGetters('card', [
      'getCards'
    ]),
    ...mapGetters('project', [
      'getProjects'
    ]),
    ...mapActions('card', [
      'fetchCards'
    ]),
    ...mapGetters('sprint', [
      'getSprints'
    ]),
    ...mapActions('sprint', [
      'fetchSprint'
    ]),
    updateCardsArrays () {
      setTimeout(() => {
        var cards = this.getCards()
        this.projectCards = this.cardsToArray(cards)
      }, 1000)
    },
    cardsToArray (cards) {
      var allCards = []
      for (var card in cards) {
        if (cards[card].project_id === this.projectId) {
          allCards.push(cards[card])
        }
      }
      return allCards
    },
    checkRole (currentRole) {
      var validRole = false
      if (this.user !== {}) {
        if (this.user.permissions === 'Admin') {
          validRole = true
        }
        for (var user in this.project.users) {
          if (this.user.username === this.project.users[user].user_name) {
            if (this.project.users[user].user_role[1] === currentRole) {
              validRole = true
            }
          }
        }
      }
      return validRole
    },
    getCurrentproject () {
      var allProjects = this.getProjects()
      for (var project in allProjects) {
        if (allProjects[project]._id === this.projectId) {
          return allProjects[project]
        }
      }
      return 'No project found.'
    },
    namesOfProjectUsers () {
      const userNames = []
      for (var p in this.project.users) {
        // ZA TASKE SE LAHKO DODAJAJO SAMO DEVELOPERJI
        if (this.project.users[p].user_role[1].toLowerCase() !== 'scrum master' && this.project.users[p].user_role[1].toLowerCase() !== 'product owner') {
          userNames.push(this.project.users[p].user_name)
        }
      }
      return userNames
    },
    isActive (sprintId) {
      var sprints = this.getCardsSprint(sprintId)
      var sDate = sprints[0]
      var eDate = sprints[1]
      var sMoment = moment(sDate, 'DD/MM/YYYY')
      var eMoment = moment(eDate, 'DD/MM/YYYY')
      var today = new Date()
      var tMoment = moment(today, 'DD/MM/YYYY')
      if (tMoment > sMoment && tMoment < eMoment) {
        return true
      } else {
        return false
      }
    },
    getCardsSprint (sprintId) {
      for (const c in this.sprints) {
        console.log(this.sprints[c]._id)
        console.log(sprintId)
        if (this.sprints[c]._id === sprintId) {
          return [this.sprints[c].start_date, this.sprints[c].end_date]
        }
      }
    },
    onResetCard () {
      this.addCard = false
      this.updateCardsArrays()
      this.newCard.project_id = this.$route.params.id
      this.newCard.sprint_id = ''
      this.newCard.description = ''
      this.newCard.card_name = ''
      this.newCard.acceptance_test = []
      this.newCard.subtasks = ''
      this.newCard.card_round = ''
      this.newCard.expectedtime = ''
      this.newCard.comment = ''
      this.newCard.past_expected_time = ''
      this.newCard.priority = ''
      this.newCard.value = ''
      this.newCard.subtasks = ''
      this.expected_time = ''
    }
  }
}
</script>
