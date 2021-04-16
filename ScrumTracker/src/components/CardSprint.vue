<template>
  <div>
    <q-card square flat bordered class="cursor-move bg-white">
      <q-card-section class="row q-pa-s" :class="(card.card_round==='DONE')?'bg-green-4':'bg-secondary'">
        <span class="text-white text-subtitle2" style="font-size: 17px">{{card.card_name}}</span>
        <q-space/>
        <q-btn size="sm" round color="primary" icon="open_in_new" class="q-ma-xs" @click="openCard(card)"  :class="(card.card_round==='DONE')?'bg-green-8':'bg-primary'"></q-btn>
      </q-card-section>
      <q-card-section>
        <UserStoryTasks :project="this.project" :card="this.card" :projectUsers="this.projectUsers" @submit="openCurrentCard=false" @refreshCards="refreshCards()"></UserStoryTasks>
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
        <UserStory :card="this.currentCard" :project="this.project" :projectUsers="this.projectUsers" @submit="openCurrentCard=false" @refreshCards="refreshCards()"></UserStory>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import UserStory from 'components/UserStory/UserStory.vue'
import UserStoryTasks from 'components/UserStory/UserStoryTasks.vue'
export default {
  name: 'CardSprint',
  components: { UserStory, UserStoryTasks },
  props: {
    card: {
      type: Object
    },
    project: {
      type: Object
    },
    projectUsers: {
      type: Array
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
    },
    refreshCards () {
      this.$emit('resetData')
    }
  }
}
</script>
