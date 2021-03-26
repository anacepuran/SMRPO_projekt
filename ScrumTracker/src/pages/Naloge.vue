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

    <!--
    <q-dialog v-model="editCardData">
      <q-card class="q-pa-md" style="width: 80vh">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ dialogTitle }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <CardForm :newCard="editCard" :editCard="editCardData" @submitCard="updateCardInfo()"></CardForm>
      </q-card>
    </q-dialog>
   <q-card class="q-ma-md">
      <q-card-section class="bg-secondary" >
        <div class="text-white text-h6">Uporabniske Zgodbe</div>
        <div class="q-ma-sm col-2">
          <q-btn v-if="user.permissions === 'Admin'" size="md" color="primary" label="Add Card" icon="create_new_folder" @click="addCard=true" />
        </div>
      </q-card-section>
    </q-card> -->
      <!--
      <div class="row q-ma-md">
        <q-table
          class="full-width"
          :data="filteredProjects"
          :columns="columns"
          row-key="name"
          virtual-scroll
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
          :loading="loading"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:body-cell-name="propsName">
            <q-td :props="propsName" @click="openSprint(propsName.row._id)">
              <div>
                <q-icon class="q-ma-sm" size="sm" color="secondary" name="folder_open" />
                <span class="q-ma-sm" style="font-size: 2vh">{{propsName.row.name}}</span>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-users="propsUsers">
            <q-td :props="propsUsers">
              <div class="row" v-for="user in propsUsers.row.users" :key="user.user_name">
                <div clasS=" col-1">
                  <q-avatar class="q-ma-xs" size="20px" font-size="15px" color="secondary" text-color="white" icon="person" />
                </div>
                <span class="col-2 q-ma-xs">{{user.user_name}}</span><span class="col text-caption text-grey q-ma-xs"> {{user.user_role}}</span>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-delete="propsDelete" v-if="user.permissions === 'Admin'">
            <q-td :props="propsDelete">
              <div>
                <q-btn @click="confirmDelete=true; deleteProjectId=propsDelete.row._id" size="sm" round color="negative" icon="delete" />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <q-dialog v-model="confirmDelete">
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="primary" text-color="white" />
            <span class="q-ml-sm">Are you sure you want to delete this project?</span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat @click="deleteProjectId=''" label="Cancel" color="primary" v-close-popup />
            <q-btn flat @click="deleteFunction(deleteProjectId)" label="DELETE" color="negative" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="addProject">
        <q-card class="q-pa-md" style="width: 80vh">
          <q-card-section class="row items-center">
            <div class="text-h6 q-ma-md">Create new Sprint</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="onReset" v-close-popup />
          </q-card-section>
           USER FORM COMPONENT
          <SprintForm :newProject="newSprint" :editProject="false" @submitProject="showSprints"></SprintForm>
        </q-card>
      </q-dialog>
        -->
      <!--<q-list  bordered separator>
          <q-item v-for="sprint in projectSprints" :key="sprint._id" clickable v-ripple>
            <q-td @click="openSprint(sprint._id)">
            <q-item-section style="width: 3%" class="col-1">
              <q-avatar size="md" color="secondary" text-color="white" icon="folder_open"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="q-ma-sm" style="font-size: 2.2vh">{{ sprint.name }}</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label class="q-ma-sm"><span style="opacity: .6">From: </span>{{ sprint.start_date }}</q-item-label>
              <q-item-label class="q-ma-sm"><span style="opacity: .6">To: </span>{{ sprint.end_date }}</q-item-label>
            </q-item-section>
            </q-td>
          </q-item>
      </q-list>-->
    <div class="row">
      <div class="col-12">
        <q-btn
          v-if="$q.screen.gt.xs"
          outline
          dense
          no-wrap
          icon="add"
          no-caps
          color="green"
          label="Add Task"
          class="q-mt-sm q-ml-sm q-pr-sm bg-white"
          @click="add_new = true"
        ></q-btn>
      </div>
    </div>
    <draggable
      class="row q-mt-xs"
      group="columns"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
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
              <q-card square v-if="card.round.toLowerCase() == element.name.toLowerCase()" flat bordered class="box-shadow cursor-move bg-white q-mt-xs list-group-item" :class="element.border">
                <span class="text-caption text-grey-9 q-ml-xs">
                  {{card.card_name}}
                </span>
                <q-card-section class="q-pt-sm">
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div>{{card.description}}</div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </draggable>
        </div>
      </div>
    </draggable>
    </draggable>
    <q-dialog v-model="addCard" position="left">
      <q-card class="q-pa-md" style="width: 300px">
        <q-card-section class="row items-center no-wrap">
          <q-form class="q-gutter-md full-width">
          <div class="text-h6 q-ma-md">Add new card</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="onReset" v-close-popup />
          </q-form>
        </q-card-section>
        <!-- CARD FORM COMPONENT -->
        <CardsForm :newProject="newCard" @submitCard="showCardsshowCards"></CardsForm>
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
        sprint_id: '',
        card_name: '',
        description: '',
        acceptance_test: '',
        priority: '',
        value: '',
        subtasks: '',
        round: ''
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
      this.addProject = false
      this.loading = true
      setTimeout(() => {
        var projectCards = this.getCards()
        this.cards = this.projectsToArray(projectCards)
        this.loading = false
      }, 1000)
    },
    projectsToArray (projectCards) {
      var data = []
      for (var sprint in projectCards) {
        var currentSprint = projectCards[sprint]
        if (currentSprint.card_id === this.cardId) {
          data.push(projectCards[sprint])
        }
      }
      return data
    },
    cardsToArray (cards) {
      var allCards = []
      for (var card in cards) {
        if (cards[card].sprint_id === this.sprintId) {
          allCards.push(cards[card])
        }
      }
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
      this.newProject.sprint_id = ''
      this.newProject.description = ''
      this.newProject.card_name = ''
      this.newProject.users = []
      this.newProject.acceptance_test = ''
      this.newProject.value = ''
      this.newProject.subtasks = ''
      this.newProject.round = ''
      this.newProject.priority = ''
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
