<template>
  <div>
    <q-card class="q-ma-md">
      <q-card-section class="row bg-secondary">
        <div class="text-white text-h6 q-ma-sm">Product backlog</div>
        <q-space/>
        <div class="row">
          <q-space/>
          <q-btn v-if="checkRole('Product Owner') || checkRole('Scrum Master')" size="md" class="q-ma-md" icon="add" color="primary" label="Add card to project" @click="addCard=true" />
        </div>
      </q-card-section>
    </q-card>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-8">
          <q-card-section class="row bg-secondary">
            <div class="text-white text-overline">NOT DONE</div>
          </q-card-section>
          <div class="row">
            <div class="col">
              <q-card-section class="row bg-secondary">
                <div class="text-white text-overline">Not assigned</div>
              </q-card-section>
              <div v-for="(card, index) in projectCards" v-bind:key="index" class="q-pa-sm">
                <Card v-if="card.sprint_id === ''"  :allCards="allCards" :card="card" :projectId="projectId" @updateCardsArrays="updateCardsArrays"></Card>
              </div>
            </div>
            <div class="col">
              <q-card-section class="row bg-secondary">
                <div class="text-white text-overline">Assigned</div>
              </q-card-section>
              <div v-for="(card, index) in projectCards" v-bind:key="index" class="q-pa-sm">
                <Card v-if="card.sprint_id !== ''" :allCards="allCards" :card="card" :projectId="projectId"></Card>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <q-card-section class="row bg-secondary">
            <div class="text-white text-overline">DONE</div>
          </q-card-section>
          <div v-for="(card, index) in projectCards" v-bind:key="index" class="q-pa-sm">
            <Card v-if="card.card_round === 'DONE'" :allCards="allCards" :card="card" :projectId="projectId"></Card>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="addCard">
      <q-card class="q-pa-md" style="width: 80vw">
        <q-card-section class="row items-center">
          <div class="text-h6 q-ma-md">Add new card</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="onResetCard" v-close-popup />
        </q-card-section>
        <!-- CARD FORM COMPONENT -->
        <AddCardsForm :newCard="newCard" :allCards="allCards" :editCard="false" @submitCard="onResetCard"></AddCardsForm>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Card from 'components/Card.vue'
import AddCardsForm from 'components/CardsForm.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductBacklog',
  components: { Card, AddCardsForm },
  data () {
    return {
      projectCards: [],
      project: {},
      addCard: false,
      newCard: {
        _id: '',
        project_id: this.$route.params.id,
        sprint_id: '',
        expected_time: '',
        card_name: '',
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
    this.project = this.getCurrentproject()
    this.projectCards = this.allCards
  },
  props: {
    allCards: {
      type: Array
    },
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
    updateCardsArrays () {
      setTimeout(() => {
        var cards = this.getCards()
        this.projectCards = this.cardsToArray(cards)
      }, 300)
    },
    cardsToArray (cards) {
      var allCards = []
      for (var card in cards) {
        if (cards[card].project_id === this.projectId) {
          allCards.push(cards[card])
        }
      }
      console.log(allCards)
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
      this.newCard.priority = ''
      this.newCard.value = ''
      this.expected_time = ''
    }
  }
}
</script>
