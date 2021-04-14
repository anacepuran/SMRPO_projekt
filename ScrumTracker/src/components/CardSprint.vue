<template>
  <div>
    <q-card square flat bordered class="cursor-move bg-white">
      <q-card-section class="row bg-secondary q-pa-s">
        <span class="text-white text-overline">{{card.card_name}}</span>
        <q-space/>
        <q-btn size="sm" round color="primary" icon="open_in_new" class="q-ma-xs"  @click="openCard(card)"></q-btn>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col">
              <div><span class="material-icons text-h6 text-secondary">description</span> {{ card.description }}</div>
          </div>
        </div>
        </q-card-section>
      </q-card>
      <q-dialog v-model="openCurrentCard" medium>
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section class="row bg-primary text-white">
          <div class="text-h6">{{ this.currentCard.card_name }}</div>
          <span class="text-overline" style="margin-left: 10px"> ({{ this.currentCard.priority }})</span>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <UserStory :card="this.currentCard"></UserStory>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import UserStory from 'components/UserStory/UserStory.vue'
export default {
  name: 'CardSprint',
  components: { UserStory },
  props: {
    card: {
      type: Object
    }
  },
  data () {
    return {
      openCurrentCard: false,
      currentCard: {}
    }
  },
  methods: {
    openCard (card) {
      this.openCurrentCard = true
      this.currentCard = card
    }
  }
}
</script>
