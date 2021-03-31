<template>
  <q-page class="q-ma-lg window-width">
    <q-btn class="q-ma-xs" text-color="primary" flat icon="arrow_back_ios" label="All sprints" @click="$router.back()" />
    <q-card class="q-ma-lg" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-ma-md bg-primary">
          <div class="text-overline text-white" style="transform: rotate(-90deg); margin-top: 225%;">Sprint</div>
        </q-card-section>
        <q-card-section class="q-ma-sm" style="width: 30%">
          <div class="text-h5 q-ma-md">{{ sprints.name }}</div>
          <div class="text-overline q-ma-md">StartDate: {{ sprints.start_date }}</div>
          <div class="text-overline q-ma-md">EndDate: {{ sprints.end_date }}</div>
          <div class="text-overline q-ma-md">Expected Time: {{sprints.expected_time}} days</div>
        </q-card-section>
        <q-separator vertical />
        <q-card-section class="full-width">
          <div class="row">
            <q-space/>
            <div class="q-ma-sm">
            <q-btn size="md" color="primary" label="Add Card to sprint" icon="create_new_folder" @click="addCard=true" />
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
    <draggable class="row q-mt-xs" group="columns" v-bind="dragOptions" @start="drag = true" @end="drag = false">
      <div class="col-4 q-px-xs" v-for="(element, index) in sections" v-bind:key="index">
        <div class="q-pa-xs column-background">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm" :class="element.theme">
            <q-item-section avatar style="min-width:25px">
              <q-icon name="list" class="q-pa-none q-ma-none"/>
            </q-item-section>
            <q-item-section class="text-h6 text-weight-bolder">{{element.name}}</q-item-section>
          </q-item>
          <draggable class="list-group" :list="cards" group="tasks" v-bind="dragOptions" @start="drag = true" @end="drag = false">
            <div v-for="(card, index) in allSprintCards" v-bind:key="index">
              <q-card square v-if="card.card_round.toLowerCase() == element.name.toLowerCase()" flat bordered class="box-shadow cursor-move bg-white q-mt-xs list-group-item">
                <q-card-section class="row" :class="element.border">
                  <span class="text-white text-h6 q-ma-xxs">{{card.card_name}}</span>
                  <q-space/>
                  <span class="text-white text-capitalize q-ml-xxs right">({{ card.priority }})</span>
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
                          VALUE:<span class="text-weight-bolder text-h6 text-black">{{ card.value }}</span>
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
          </draggable>
        </div>
      </div>
    </draggable>
    <q-dialog v-model="addCard" full-width>
      <q-card class="q-pa-md">
        <q-card-section class="row items-center">
          <div class="text-h6">Add cards to sprint</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <AddCard :allCards="allProjectCards" :sprintId="sprintId" @addCard="showCards()"></AddCard>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import draggable from 'vuedraggable'
import AddCard from 'components/AddCardSprint.vue'

Vue.component('draggable', draggable)

export default {
  name: 'Zgodbe',
  components: { AddCard },
  data () {
    return {
      addCard: false,
      editCard: true,
      editCardData: false,
      confirmDelete: false,
      deleteCardId: '',
      editCardId: '',
      sections: {
        1: {
          name: 'PRODUCT BACKLOG',
          theme: 'to-do-title',
          border: 'border-todo'
        },
        2: {
          name: 'SPRINT BACKLOG',
          theme: 'in-progress-title',
          border: 'border-in-progress'
        },
        3: {
          name: 'DONE',
          theme: 'done-title',
          border: 'border-done'
        }
      },
      sprints: [],
      cards: [],
      user: {},
      allProjectCards: [],
      allSprintCards: [],
      editCards: {
        sprint_id: '',
        project_id: '',
        expected_time: '',
        card_name: '',
        description: '',
        acceptance_test: [],
        priority: '',
        value: '',
        subtasks: [],
        card_round: ''
      },
      sprintId: '',
      drag: false
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  mounted () {
    this.fetchCards()
    this.user = this.getCurrentUser()
    this.sprintId = this.$route.params.id
    this.sprints = this.sprint()
    this.showCards()
    this.allProjectCards = this.projectCards()
  },
  methods: {
    ...mapGetters('user', [
      'getCurrentUser'
    ]),
    ...mapGetters('card', [
      'getCards'
    ]),
    ...mapGetters('sprint', [
      'getSprints'
    ]),
    ...mapActions('card', [
      'fetchCards',
      'postCard',
      'updateCard'
    ]),
    projectCards () {
      var cards = this.getCards()
      var projectCards = []
      for (var c in cards) {
        if (cards[c].project_id === this.projectId) {
          projectCards.push(cards[c])
        }
      }
      return projectCards
    },
    sprint () {
      var sprints = this.getSprints()
      for (var s in sprints) {
        if (sprints[s]._id === this.sprintId) {
          this.projectId = sprints[s].project_id
          return sprints[s]
        }
      }
      return 'No sprint found.'
    },
    showCards () {
      this.addCard = false
      setTimeout(() => {
        var cards = this.getCards()
        this.allSprintCards = this.cardsToArray(cards)
      }, 1000)
    },
    cardsToArray (cards) {
      var allCards = []
      for (var card in cards) {
        if (cards[card].sprint_id === this.sprintId) {
          allCards.push(cards[card])
        }
      }
      return allCards
    }
  }
}
</script>

<style scoped>
  .button {
    margin-top: 35px;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-group {
    min-height: 100vh;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }

  .cursor-move {
    cursor: move;
  }

  .border-todo {
    background: #060036;
  }

  .to-do-title {
    background-color: rgb(6, 0, 54);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .border-in-progress {
    background: #ee9835 ;
  }

  .in-progress-title {
    background-color: #ee9835;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .border-done {
    background: #0c3e3a;
  }

  .done-title {
    background-color: #0c3e3a;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .to-do-title {
    background-color: rgb(6, 0, 54);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .bottom-right-radius {
    border-bottom-right-radius: 4px !important;
  }

  .tag-badge {
    border: 1px solid currentColor !important;
    border-radius: 4px !important;
  }

  .bug {
    background-color: red;
  }

  .box-shadow:hover {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14),
    0 1px 10px rgba(0, 0, 0, 0.12) !important;
  }
</style>
