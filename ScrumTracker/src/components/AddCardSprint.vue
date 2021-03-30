<template>
  <div>
    <div v-for="(card, index) in allCards" v-bind:key="index" >
      <q-card v-if="card.sprint_id === ''" square flat bordered class="box-shadow cursor-move bg-white q-mt-xs list-group-item">
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
                <div class="col">
                <div class="text-overline text-secondary">
                    VALUE:
                    <span class="text-weight-bolder text-h6 text-black">{{ card.value }}</span>
                </div>
                </div>
            </div>
            <div class="row items-center no-wrap">
                <div class="col">
                <div class="text-overline text-secondary">ACCEPTANCE TESTS:</div>
                <div v-for="(test, index) in card.acceptance_test" v-bind:key="index"><span class="material-icons text-h6">tag</span>{{test}}</div>
                </div>
            </div>
            </q-card-section>
          </q-card>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      editCard: {
        project_id: '',
        sprint_id: '',
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
  },
  methods: {
    ...mapActions('card', [
      'updateCard'
    ]),
    addCardToSprint (card) {
      if (card.priority === 'WON\'T HAVE THIS TIME') {
        this.error = 'You can\'t add this card!'
      } else {
        this.editCard = card
        this.editCard.card_round = 'PRODUCT BACKLOG'
        this.editCard.sprint_id = this.sprintId
        console.log(this.editCard)
        this.updateCard(this.editCard)
        this.$emit('addCard')
      }
    }
  }
}
</script>
