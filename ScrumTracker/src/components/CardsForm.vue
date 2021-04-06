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
        <!-- WHEN ADDING CARD -->
        <div class="text-caption">Write each test in new line!</div>
        <q-input
          filled
          placeholder="First test
Second test
Third test"
          type="textarea"
          v-model="acc_tests"
          :rows="3"/>
        <div v-if="editCard === true">
        </div>
        <div class="row">
          <q-select
              filled
              v-model="addedCard.value"
              :options="value_options"
              label="Business value"
              style="width: 230px"
          />
          <q-space/>
          <q-select
              filled
              v-model="addedCard.priority"
              :options="priority_options"
              label="Priority"
              style="width: 230px"
          />
        </div>
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
      value_options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      error: '',
      numberOfTests: 0,
      addedCard: {
        id: '',
        project_id: '',
        expected_time: '',
        sprint_id: '',
        card_name: '',
        description: '',
        acceptance_test: [],
        priority: '',
        value: '',
        subtasks: [],
        card_round: ''
      },
      acc_tests: ''
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
    },
    editCardId: {
      type: String
    }
  },
  mounted () {
    this.onReset()
    this.acc_tests = this.setAcceptanceTests()
  },
  methods: {
    ...mapGetters('card', [
      'getCards'
    ]),
    ...mapActions('card', [
      'postCard',
      'updateCard'
    ]),
    setAcceptanceTests () {
      const tests = this.addedCard.acceptance_test
      let testsStr = ''
      for (var v in tests) {
        testsStr += tests[v]
        testsStr += '\n'
      }
      return testsStr
    },
    checkCard () {
      var accept = true
      // CHECK IF PROJECT WITH THIS NAME ALREADY EXISTS
      for (var card in this.allCards) {
        if (this.addedCard.card_name.toLowerCase() === this.allCards[card].card_name.toLowerCase() && this.allCards[card]._id !== this.addedCard._id) {
          accept = false
          this.error = 'Project with the name "' + this.addedCard.card_name + '" already exists.'
        }
      }
      if (this.addedCard.priority === '') {
        accept = false
        this.error = 'Set priority.'
      }
      if (this.addedCard.value === '') {
        accept = false
        this.error = 'Set business value.'
      }
      return accept
    },
    splitTests (tests) {
      let testsArr = []
      if (tests.includes('\n')) {
        testsArr = tests.split('\n')
      } else {
        testsArr.push(tests)
      }
      if (testsArr[testsArr.length - 1] === '') {
        testsArr.pop()
      }
      return testsArr
    },
    upperCaseArray (tests) {
      const array = []
      for (var v in tests) {
        array.push(tests[v].charAt(0).toUpperCase() + tests[v].slice(1))
      }
      return array
    },
    onSubmit () {
      let submitMessage = ''
      if (this.checkCard()) {
        const acceptanceTestArray = this.splitTests(this.acc_tests)
        const accTestsUpperCase = this.upperCaseArray(acceptanceTestArray)
        this.addedCard.acceptance_test = accTestsUpperCase
        if (this.$props.editCard) {
          submitMessage = 'Card updated.'
          this.updateCard(this.addedCard)
          this.onReset()
        } else {
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
        this.$emit('submitCard')
        this.error = ''
      }
    },
    onReset () {
      this.addedCard._id = this.$props.newCard._id
      this.addedCard.expected_time = this.$props.newCard.expected_time
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
