<template>
  <div class="q-ma-md">
    <q-form
        class="q-ma-md"
        @submit="onSubmit"
        @reset="onReset">
        <q-input
            filled
            v-model="addedCard.card_name"
            label="Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
        <q-input
            filled
            v-model="addedCard.description"
            label="Description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
        <!-- WHEN ADDING CARD -->
        <div class="text-caption">Acceptance tests</div>
        <q-input
          hint="Write each test in new line!"
          filled
          placeholder="First test
Second test
Third test"
          type="textarea"
          v-model="acc_tests"
          :rows="3"/>
          <hr class="q-ma-md" style="opacity:.5">
        <div class="row">
          <q-input
              filled
              type="number"
              v-model="addedCard.value"
              hint="Set business value 1-10"
              label="Business value"
              style="width: 230px"
              lazy-rules
              max="10"
              min="1"
              :rules="[ val => val && 11 > val > 0  || 'Please set Business value']"
          />
          <q-space/>
          <q-select
              filled
              v-model="addedCard.priority"
              :options="priority_options"
              label="Priority"
              style="width: 230px"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please set priority']"
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
  </div>
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
        id: '',
        project_id: '',
        expected_time: '',
        past_expected_time: '',
        comment: '',
        sprint_id: '',
        card_name: '',
        description: '',
        acceptance_test: [],
        priority: '',
        value: '',
        subtasks: [],
        card_round: 'PRODUCT BACKLOG'
      },
      acc_tests: ''
    }
  },
  props: {
    newCard: {
      type: Object
    },
    editCard: {
      type: Boolean
    },
    editCardId: {
      type: String
    }
  },
  mounted () {
    this.allCards = this.getCards()
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
        if (this.addedCard.card_name.toLowerCase().trim().trim() === this.allCards[card].card_name.toLowerCase().trim().trim() && this.allCards[card]._id !== this.addedCard._id) {
          accept = false
          this.error = 'Project with the name "' + this.addedCard.card_name.trim() + '" already exists.'
        }
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
      this.addedCard.past_expected_time = this.$props.newCard.past_expected_time
      this.addedCard.comment = this.$props.newCard.comment
      this.addedCard.sprint_id = this.$props.newCard.sprint_id
      this.addedCard.project_id = this.$props.newCard.project_id
      this.addedCard.card_name = this.$props.newCard.card_name
      this.addedCard.description = this.$props.newCard.description
      this.addedCard.acceptance_test = this.$props.newCard.acceptance_test
      this.addedCard.priority = this.$props.newCard.priority
      this.addedCard.value = this.$props.newCard.value
      this.addedCard.subtasks = this.$props.newCard.subtasks
      this.addedCard.card_round = 'PRODUCT BACKLOG'
      this.error = ''
    }
  }
}
</script>
