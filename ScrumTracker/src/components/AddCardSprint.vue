<template>
  <div>
      <div v-for="(card, index) in allCards" v-bind:key="index">
        <div class= "row justify-around items-start ">
        <q-card v-if="card.sprint_id === '' && card.card_round !== 'DONE' && card.expected_time !== ''" square flat bordered class="col-sm-6 col-md-4 q-pa-sm box-shadow cursor-move bg-white q-mt-xs">
          <q-card-section class="row bg-secondary" >
            <span class="text-white text-h6 q-ma-xxs">{{ card.card_name}}</span>
            <q-space/>
            <span class="text-white text-overline q-ma-xxs">({{ card.priority }})</span>
            <q-space/>
            <q-btn round color="primary" icon="add" @click="addCardToSprint(card)"/>
          </q-card-section>
          <q-card-section class="q-pt-sm">
              <div class="row items-center no-wrap">
              <div class="col">
                  <div><span class="material-icons text-h5 text-secondary">description</span> {{ card.description }}</div>
              </div>
              </div>
              <div class="row items-center no-wrap">
                  <div class="col" v-if="card.expected_time !== ''">
                    <div>
                      <span class="material-icons text-h4 text-secondary">update</span>
                      <span class="text-weight-bolder text-h6 text-black"> {{ card.expected_time }}</span>
                      <span v-if="card.expected_time > 1" class="text-p text-black"> hours</span>
                      <span v-if="card.expected_time == 1" class="text-p text-black"> hour</span>
                    </div>
                  </div>
                  <div class="col">
                  <div class="text-overline text-secondary">
                      VALUE:
                      <span class="text-weight-bolder text-h6 text-black">{{ card.value }}</span>
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
            </q-card>
            </div>
        </div>
    <div class="q-ma-md text-center">
      <p style="color: red;" v-if="error != ''">{{error}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ShowCards',
  props: {
    allCards: {
      type: Array
    },
    sprintId: {
      type: String
    }
  },
  data () {
    return {
      error: '',
      user: {},
      editCard: {
        _id: '',
        project_id: '',
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
    this.user = this.getCurrentUser()
  },
  methods: {
    ...mapActions('card', [
      'updateCard'
    ]),
    ...mapGetters('user', [
      'getCurrentUser'
    ]),
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
    addCardToSprint (card) {
      if (card.priority === 'Won\'t have this time') {
        this.error = 'You can\'t add this card!'
      } else {
        this.editCard = card
        this.editCard.card_round = 'PRODUCT BACKLOG'
        this.editCard.sprint_id = this.sprintId
        this.updateCard(this.editCard)
        this.$emit('addCard')
      }
    }
  }
}
</script>
