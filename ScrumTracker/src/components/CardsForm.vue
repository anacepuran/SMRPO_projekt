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
        <q-input
            filled
            v-model="newCard.value"
            label="Value"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
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
      error: ''
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
        if (this.newCard.card_name.toLowerCase() === this.allCards[card].card_name.toLowerCase()) {
          accept = false
          this.error = 'Project with the name "' + this.newCard.card_name + '" already exists.'
        }
      }
      if (this.newCard.priority === '') {
        accept = false
        this.error = 'Set priority.'
      }
      return accept
    },
    onSubmit () {
      var submitMessage = ''
      if (this.checkCard()) {
        if (this.$props.editCard) {
          submitMessage = 'Card updated.'
          this.updateCard(this.newCard)
          this.onReset()
        } else {
          submitMessage = 'Card added.'
          console.log(this.newCard)
          this.postCard(this.newCard)
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
      this.newCard.sprint_id = this.$props.newCard.sprint_id
      this.newCard.card_name = this.$props.newCard.card_name
      this.newCard.description = this.$props.newCard.description
      this.newCard.acceptance_test = this.$props.newCard.acceptance_test
      this.newCard.priority = this.$props.newCard.priority
      this.newCard.value = this.$props.newCard.value
      this.newCard.subtasks = this.$props.newCard.subtasks
      this.newCard.card_round = this.$props.newCard.card_round
      this.error = ''
    }
  }
}
</script>
