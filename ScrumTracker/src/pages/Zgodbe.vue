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
            <q-btn v-if="user.permissions === 'Admin'" size="md" color="primary" label="Add Card" icon="create_new_folder" @click="addCard=true" />
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
    <draggable class="row q-mt-xs" group="columns" v-bind="dragOptions" @start="drag = true" @end="drag = false">
      <div class="col-3 q-px-xs" v-for="(element, index) in sections" v-bind:key="index">
        <div class="q-pa-xs column-background">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm" :class="element.theme">
            <q-item-section avatar style="min-width:25px">
              <q-icon name="list" class="q-pa-none q-ma-none"/>
            </q-item-section>
            <q-item-section class="text-h6 text-weight-bolder">{{element.name}}</q-item-section>
          </q-item>
          <draggable class="list-group" :list="cards" group="tasks" v-bind="dragOptions" @start="drag = true" @end="drag = false">
            <div v-for="(card, index) in allCards" v-bind:key="index">
              <q-card square v-if="card.card_round.toLowerCase() == element.name.toLowerCase()" flat bordered class="box-shadow cursor-move bg-white q-mt-xs list-group-item" :class="element.border">
                <span class="text-h6 text-capitalize text-grey-9 q-ml-xs">
                  {{ card.card_name }}
                </span>
                <span class="text-subtitle-2 float-right text-uppercase">
                  {{ card.priority }}
                </span>
                <q-card-section class="q-pt-sm">
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div><b>DESCRIPTION:</b> {{ card.description }}</div>
                    </div>
                  </div>
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div><b>ACCEPTANCE TEST:</b> {{ card.acceptance_test }}</div>
                    </div>
                  </div>
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div><b>VALUE:</b> {{ card.value }}</div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </draggable>
        </div>
      </div>
    </draggable>
    <q-dialog v-model="addCard">
      <q-card class="q-pa-md" style="width: 80vh">
        <q-card-section class="row items-center">
          <div class="text-h6 q-ma-md">Add new card</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="onReset" v-close-popup />
        </q-card-section>
        <!-- CARD FORM COMPONENT -->
        <CardsForm :newCard="newCard" :allCards="allCards" :editCard="false" @submitCard="showCards"></CardsForm>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import draggable from 'vuedraggable'
import CardsForm from 'components/CardsForm.vue'

Vue.component('draggable', draggable)

export default {
  name: 'Zgodbe',
  components: { CardsForm },
  data () {
    return {
      addCard: false,
      editCard: true,
      sections: {
        1: {
          name: 'To do',
          theme: 'to-do-title',
          border: 'border-todo'
        },
        2: {
          name: 'In progress',
          theme: 'in-progress-title',
          border: 'border-in-progress'
        },
        3: {
          name: 'Test',
          theme: 'test-title',
          border: 'border-test'
        },
        4: {
          name: 'Done',
          theme: 'done-title',
          border: 'border-done'
        }
      },
      sprints: [],
      cards: [],
      user: {},
      pagination: {
        rowsPerPage: 0
      },
      allCards: [],
      newCard: {
        sprint_id: this.$route.params.id,
        card_name: '',
        description: '',
        acceptance_test: '',
        priority: '',
        value: '',
        subtasks: '',
        card_round: 'to do'
      },
      sprintId: '',
      add_new: false,
      drag: false,
      cardId: ''
    }
  },
  mounted () {
    this.fetchCards()
    this.user = this.getCurrentUser()
    this.sprintId = this.$route.params.id
    this.sprints = this.sprint()
    this.showCards()
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
    sprint () {
      var sprints = this.getSprints()
      for (var s in sprints) {
        if (sprints[s]._id === this.sprintId) {
          return sprints[s]
        }
      }
      return 'No sprint found.'
    },
    showCards () {
      this.addCard = false
      setTimeout(() => {
        var cards = this.getCards()
        console.log(cards)
        this.allCards = this.cardsToArray(cards)
      }, 1000)
    },
    cardsToArray (cards) {
      var allCards = []
      for (var card in cards) {
        if (cards[card].sprint_id === this.sprintId) {
          allCards.push(cards[card])
        }
      }
      console.log(allCards)
      return allCards
    },
    columns () {
      if (this.user.permissions === 'Admin') {
        return [
          {
            name: 'name',
            required: true,
            label: 'Name',
            align: 'left',
            field: row => row.name,
            sortable: true
          },
          { name: 'users', align: 'left', label: 'Users', field: 'users' },
          { name: 'startdate', align: 'left', label: 'StartDate', field: 'startdate', sortable: true },
          { name: 'enddate', align: 'left', label: 'EndDate', field: 'enddate', sortable: true },
          { name: 'expectedtime', align: 'left', label: 'expectedtime', field: 'expectedtime', sortable: true },
          { name: 'delete', align: 'center', label: 'Delete project', field: 'delete' }
        ]
      } else {
        return [
          {
            name: 'name',
            required: true,
            label: 'Name',
            align: 'left',
            field: row => row.name,
            sortable: true
          },
          { name: 'users', align: 'left', label: 'Users', field: 'users' },
          { name: 'startdate', align: 'left', label: 'StartDate', field: 'startdate', sortable: true },
          { name: 'enddate', align: 'left', label: 'EndDate', field: 'enddate', sortable: true },
          { name: 'expectedtime', align: 'left', label: 'expectedtime', field: 'expectedtime', sortable: true }
        ]
      }
    },
    onReset () {
      this.newCard.sprint_id = this.$route.params.id
      this.newCard.description = ''
      this.newCard.card_name = ''
      this.newCard.users = []
      this.newCard.acceptance_test = ''
      this.newCard.value = ''
      this.newCard.subtasks = ''
      this.newCard.card_round = 'to do'
      this.newCard.priority = ''
    },
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    addNewTask () {
      const maxid = Math.max.apply(
        Math,
        this.task_to_do.map(function (o) {
          return o.id
        })
      )
      this.task_item.id = maxid + 1
      this.task_to_do.push(this.task_item)
      this.add_new = false
      this.postCard(this.task_item)
      this.onReset()
      this.$q.notify({
        type: 'positive',
        message: 'The new task is added successfully.'
      })
    },
    deleteTask (tasklane, index) {
      this[tasklane].splice(index, 1)
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
    border-left: 5px solid #060036 !important;
  }

  .feature-to-do {
    background-color: #060036;
  }

  .to-do-title {
    background-color: rgb(6, 0, 54);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .border-in-progress {
    border-left: 5px solid #ee9835 !important;
  }

  .feature-in-progress {
    background-color: #ee9835;
  }

  .in-progress-title {
    background-color: #ee9835;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .border-test {
    border-left: 5px solid blueviolet !important;
  }

  .feature-test {
    background-color: blueviolet;
  }

  .test-title {
    background-color: blueviolet;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .border-done {
    border-left: 5px solid green !important;
  }

  .feature-done {
    background-color: green;
  }

  .done-title {
    background-color: green;
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
