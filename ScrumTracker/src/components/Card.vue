<template>
  <div>
    <q-card square flat bordered class="cursor-move bg-white q-mt-xs" >
      <q-card-section class="row bg-secondary">
        <span class="text-white text-h6 q-ma-xxs">{{card.card_name}}</span>
        <q-space/>
        <span class="text-white text-capitalize q-ml-xxs right">({{ card.priority }})</span>
      </q-card-section>
      <q-card-section class="q-pt-sm">
        <div class="row">
          <div class="col">
              <div><span class="material-icons text-h4 text-secondary">description</span> {{ card.description }}</div>
          </div>
        </div>
        <div class="row items-center no-wrap">
          <div class="col"  v-if="card.expected_time !== ''">
            <div>
              <span class="material-icons text-h4 text-secondary">update</span>
              <span class="text-weight-bolder text-h6 text-black"> {{ card.expected_time }}</span>
              <span v-if="card.expected_time > 1" class="text-p text-black"> hours</span>
              <span v-if="card.expected_time == 1" class="text-p text-black"> hour</span>
            </div>
          </div>
          <div class="col">
            <div class="text-overline text-secondary">
                VALUE:<span class="text-weight-bolder text-h6 text-black">{{ card.value }}</span>
            </div>
          </div>
        </div>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-overline text-secondary">
              ASSIGNED TO SPRINT:
              <span class="text-weight-bolder text-h5 text-negative" v-if="card.sprint_id === ''"><span class="material-icons">highlight_off</span></span>
              <span class="text-weight-bolder text-h5 text-negative" v-if="card.sprint_id !== ''"><span class="material-icons">done</span></span>
            </div>
          </div>
        </div>
        <div class="row items-center no-wrap" v-if="card.acceptance_test === ''  || card.acceptance_test.length !== 0">
          <div class="col">
            <div class="text-overline text-secondary">ACCEPTANCE TESTS:</div>
              <div v-for="(test, index) in card.acceptance_test" v-bind:key="index"><span class="material-icons text-h6">tag</span>{{test}}</div>
          </div>
        </div>
        </q-card-section>
        <q-card-actions horizontal align="right" v-if="card.sprint_id === '' && card.card_round !== 'DONE'">
          <q-btn flat @click="confirmDelete=true; deleteCardId=card._id" round color="negative" icon="delete"/>
          <q-btn flat @click="editCardId=card._id; editCards=card; editCardData=true" icon="edit" color="secondary"/>
          <q-btn flat @click="expectedTime=true; expectedTimeCard=card" round color="teal" icon="schedule" v-if="checkRole('Scrum Master')"/>
        </q-card-actions>
      </q-card>
      <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this card?</span>
        </q-card-section>
        <q-card-actions horizontal align="right">
          <q-btn flat @click="deleteCardId=''" label="Cancel" color="primary" v-close-popup/>
          <q-btn flat @click="deleteFunction(deleteCardId)" label="DELETE" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editCardData">
      <q-card class="q-pa-md" style="width: 80vh">
        <q-card-section class="row items-center">
          <div class="text-h6"> Edit Card </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <CardsForm :allCards="allCards" :newCard="editCards" :editCard="true" :editCardId="editCardId" @submitCard="updateCards()"></CardsForm>
      </q-card>
    </q-dialog>
    <q-dialog v-model="expectedTime">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm text-overline text-secondary">SET EXPECTED TIME FOR THE CARD [hours]</span>
        </q-card-section>
        <q-card-actions horizontal align="center">
          <q-card-section class="row">
            <q-input filled v-model="timeExpected" type="number" min="1" lazy-rules :label="card.expected_time"
              :rules="[val => val !== null && val !== '' || 'Please select expected time']"/>
          </q-card-section>
          <q-card-section class="row items-center">
            <q-btn flat @click="expectedTimeCard=''" label="Cancel" color="primary" v-close-popup/>
            <q-btn flat @click="editExpectedTime(expectedTimeCard)" label="SET" color="teal" v-close-popup />
          </q-card-section>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CardsForm from 'components/CardsForm.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Card',
  components: { CardsForm },
  props: {
    card: {
      type: Object
    },
    projectId: {
      type: String
    },
    allCards: {
      type: Array
    }
  },
  data () {
    return {
      editCard: true,
      user: {},
      project: {},
      editCardData: false,
      confirmDelete: false,
      expectedTimeCard: {},
      expectedTime: false,
      timeExpected: '',
      projectCards: '',
      deleteCardId: '',
      editCardId: '',
      editCards: {
        sprint_id: '',
        expected_time: '',
        project_id: '',
        card_name: '',
        description: '',
        acceptance_test: [],
        priority: '',
        value: '',
        subtasks: [],
        card_round: 'PRODUCT BACKLOG'
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.projectCards = this.allCards
    }, 100)
    this.user = this.getCurrentUser()
    this.project = this.getCurrentProject()
  },
  methods: {
    ...mapGetters('card', [
      'getCards'
    ]),
    ...mapActions('card', [
      'postCard',
      'updateCard',
      'deleteCard'
    ]),
    ...mapGetters('user', [
      'getCurrentUser'
    ]),
    ...mapGetters('project', [
      'getProjects'
    ]),
    updateCards () {
      this.editCardData = false
      this.$emit('updateCardsArrays')
    },
    deleteFunction (cardId) {
      this.deleteCard(cardId)
      this.$emit('updateCardsArrays')
    },
    editExpectedTime (card) {
      card.expected_time = this.timeExpected
      this.updateCard(card)
      this.timeExpected = ''
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
    getCurrentProject () {
      var project = {}
      var projects = this.getProjects()
      for (var p in projects) {
        if (projects[p]._id === this.projectId) {
          project = projects[p]
          return project
        }
      }
    }
  }
}
</script>
