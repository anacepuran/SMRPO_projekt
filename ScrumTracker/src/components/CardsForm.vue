<template>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md">
        <q-input
            filled
            v-model="addedCard.card_name"
            label="Card name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
        <q-input
            filled
            v-model="addedCard.description"
            label="Card description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
        <div class="text-caption">Write each test in new line!</div>
        <q-input
            filled
            placeholder="First test
Second test
Third test"
            type="textarea"
            v-model="addedCard.acceptance_test"
            :rows="3"/>
        <q-input
            filled
            v-model="addedCard.value"
            label="Business value"
            type="number"
            style="width: 200px"
            lazy-rules
            :rules=" [val => val < 11 && val > 0 && val.length > 0 || 'Range: from 1 to 10!']"/>
        <q-select
            filled
            v-model="addedCard.priority"
            :options="priority_options"
            label="Priority"
            style="width: 200px"
        />
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CardForm',
  data () {
    return {
      priority_options: ['Must have', 'Could have', 'Should have', 'Won\'t have this time'],
      error: '',
      numberOfTests: 0,
      addedCard: {
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
  props: {
    newCard: {
      type: Object
    },
    allCards: {
      type: Array
    },
    editCard: {
      type: Boolean
    }
  },
  mounted () {
    this.fetchCards()
    this.onReset()
  },
  methods: {
    ...mapGetters('card', [
      'getCards'
    ]),
    ...mapActions('card', [
      'fetchCards',
      'postCard',
      'updateCard'
    ]),
    checkCard () {
      var accept = true
      // CHECK IF PROJECT WITH THIS NAME ALREADY EXISTS
      console.log(this.allCards)
      for (var card in this.allCards) {
        if (this.addedCard.card_name.toLowerCase() === this.allCards[card].card_name.toLowerCase()) {
          accept = false
          this.error = 'Project with the name "' + this.addedCard.card_name + '" already exists.'
        }
      }
      if (this.addedCard.priority === '') {
        accept = false
        this.error = 'Set priority.'
      }
      return accept
    },
    splitTests (tests) {
      const testsArr = tests.split('\n')
      return testsArr
    },
    onSubmit () {
      var submitMessage = ''
      if (this.checkCard()) {
        if (this.$props.editCard) {
          submitMessage = 'Card updated.'
          this.updateCard(this.addedCard)
          this.onReset()
        } else {
          const acceptanceTestArray = this.splitTests(this.addedCard.acceptance_test)
          this.addedCard.acceptance_test = acceptanceTestArray
          submitMessage = 'Card added.'
          this.postCard(this.addedCard)
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
        this.$emit('submitCard')
      }
    },
    onReset () {
      this.addedCard.sprint_id = this.$props.newCard.sprint_id
      this.addedCard.project_id = this.$props.newCard.project_id
      this.addedCard.card_name = this.$props.newCard.card_name
      this.addedCard.description = this.$props.newCard.description
      this.addedCard.acceptance_test = this.$props.newCard.acceptance_test
      this.addedCard.priority = this.$props.newCard.priority
      this.addedCard.value = this.$props.newCard.value
      this.addedCard.subtasks = this.$props.newCard.subtasks
      this.addedCard.card_round = this.$props.newCard.card_round
      this.error = ''
    }
  }
}
</script>
