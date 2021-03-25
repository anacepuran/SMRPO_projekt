<template>
  <q-page class="q-ma-lg window-width">
    <q-btn class="q-ma-xs" text-color="primary" flat icon="arrow_back_ios" label="All sprints" @click="$router.back()" />
    <q-card class="q-ma-lg" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-ma-md bg-primary">
          <div class="text-overline text-white" style="transform: rotate(-90deg); margin-top: 225%;">Sprint</div>
        </q-card-section>
        <q-card-section class="q-ma-sm" style="width: 30%">
          <div class="text-h5 q-ma-md">{{ sprint.name }}</div>
          <div class="text-overline q-ma-md">StartDate: {{ sprint.start_date }}</div>
          <div class="text-overline q-ma-md">EndDate: {{ sprint.end_date }}</div>
          <div class="text-overline q-ma-md">Expected Time: {{sprint.expected_time}} days</div>
        </q-card-section>
        <q-separator vertical />
        <q-card-section class="full-width">
          <div class="row">
            <q-space/>
            <!--<q-btn v-if="checkRole()" size="md" class="q-ma-md" icon="edit" color="primary" label="Edit project" @click="editFunction" />
            -->
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
    <div class="row">
      <div class="col-12">
        <q-btn v-if="$q.screen.gt.xs" outline dense no-wrap icon="add" no-caps color="green" label="Add Task" class="q-mt-sm q-ml-sm q-pr-sm bg-white" @click="add_new = true"></q-btn>
      </div>
    </div>
    <draggable class="row q-mt-xs" group="columns" v-bind="dragOptions" @start="drag = true" @end="drag = false">
      <div class="col-3 q-px-xs">
        <div class="q-pa-xs column-background">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm to-do-title">
            <q-item-section avatar style="min-width:25px">
              <q-icon name="list" class="q-pa-none q-ma-none"/>
            </q-item-section>
            <q-item-section class="text-h6 text-weight-bolder">To do</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="rotate" transition-hide="rotate">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Mark all as completed</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Mark all as in progress</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Mark all as hold</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <draggable class="list-group" :list="task_to_do" group="tasks" v-bind="dragOptions" @start="drag = true" @end="drag = false">
            <q-card
              square
              v-for="(element, index) in task_to_do"
              v-bind:key="index"
              flat
              bordered
              class="box-shadow cursor-move bg-white q-mt-xs list-group-item border-todo"
              :style="element.task_type=='bug'?'border-left: 5px solid red !important':''"
              @mouseover="task_index.to_do_index = index"
              @mouseleave="task_index.to_do_index = null"
            >
              <q-avatar
                class="q-pa-none"
                size="25px"
                dense
                :class="element.task_type=='bug'? 'bug bottom-right-radius':'feature-to-do bottom-right-radius'"
                text-color="white"
              >
                <q-icon
                  filled
                  size="xs"
                  :name="element.task_type=='bug'? 'bug_report':'assignment'"
                />
              </q-avatar>
              <span class="text-caption text-grey-9 q-ml-xs">
                #{{element.id}}
                <q-icon
                  filled
                  size="xs"
                  name="close"
                  class="float-right text-weight-bolder"
                  :style="{'visibility':index==task_index.to_do_index?'visible':'hidden'}"
                  @click="deleteTask('task_to_do', task_index.to_do_index)"
                />
                <q-avatar class="q-ma-xs" size="20px" font-size="15px" color="secondary" text-color="white" icon="person" />
              </span>
              <q-card-section class="q-pt-sm">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div>{{element.task_title}}</div>
                  </div>
                </div>
              </q-card-section>
              <q-badge
                outline
                class="q-mx-xs text-bold tag-badge"
                v-bind:key="index"
                v-for="(tag, index) in element.tags"
                :color="tag.color"
              >{{tag.name}}
              </q-badge>
              <q-card-actions>
                <q-btn size="xs" dense filled round color="blue" icon="message"/>
                <q-btn size="xs" dense filled round color="orange" icon="flag"/>
                <q-btn size="xs" dense filled round color="grey" icon="attachment"/>
              </q-card-actions>
            </q-card>
          </draggable>
        </div>
      </div>

      <div class="col-3 q-px-xs">
        <div class="q-pa-xs column-background">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm in-progress-title">
            <q-item-section avatar style="min-width:25px">
              <q-icon name="sync" class="q-pa-none q-ma-none"/>
            </q-item-section>
            <q-item-section class="text-h6 text-weight-bolder">In progress</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="rotate" transition-hide="rotate">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Mark all as completed</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Mark all as in progress</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Mark all as hold</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <draggable
            class="list-group"
            :list="task_in_progress"
            group="tasks"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <q-card
              square
              v-for="(element, index) in task_in_progress"
              v-bind:key="index"
              flat
              bordered
              class="box-shadow cursor-move bg-white q-mt-xs list-group-item border-in-progress"
              :style="element.task_type=='bug'?'border-left: 5px solid red !important':''"
              @mouseover="task_index.in_progress_index = index"
              @mouseleave="task_index.in_progress_index = null"
            >
              <q-avatar
                class="q-pa-none"
                size="25px"
                dense
                :class="element.task_type=='bug'? 'bug bottom-right-radius':'feature-in-progress bottom-right-radius'"
                text-color="white"
              >
                <q-icon
                  filled
                  size="xs"
                  :name="element.task_type=='bug'? 'bug_report':'assignment'"
                />
              </q-avatar>
              <span class="text-caption text-grey-9 q-ml-xs">
                #{{element.id}}
                <q-icon
                  filled
                  size="xs"
                  name="close"
                  class="float-right text-weight-bolder"
                  :style="{'visibility':index==task_index.in_progress_index?'visible':'hidden'}"
                  @click="deleteTask('task_in_progress', task_index.in_progress_index)"
                />
                <q-avatar class="q-ma-xs" size="20px" font-size="15px" color="secondary" text-color="white" icon="person" />
              </span>
              <q-card-section class="q-pt-sm">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class>{{element.task_title}}</div>
                  </div>
                </div>
              </q-card-section>
              <q-badge
                outline
                v-bind:key="index"
                class="q-mx-xs text-bold tag-badge tag-badge"
                v-for="(tag, index) in element.tags"
                :color="tag.color"
              >{{tag.name}}
              </q-badge>
              <q-card-actions>
                <q-btn size="xs" dense filled round color="blue" icon="message"/>
                <q-btn size="xs" dense filled round color="orange" icon="flag"/>
                <q-btn size="xs" dense filled round color="grey" icon="attachment"/>
              </q-card-actions>
            </q-card>
          </draggable>
        </div>
      </div>

      <div class="col-3 q-px-xs">
        <div class="q-pa-xs column-background">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm test-title">
            <q-item-section avatar style="min-width:25px">
              <q-icon name="compare_arrows" class="q-pa-none q-ma-none"/>
            </q-item-section>
            <q-item-section class="text-h6 text-weight-bolder">Test</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="rotate" transition-hide="rotate">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Mark all as completed</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Mark all as in progress</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Mark all as hold</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <draggable
            class="list-group"
            :list="task_test"
            group="tasks"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <q-card
              square
              v-for="(element, index) in task_test"
              v-bind:key="index"
              flat
              bordered
              class="box-shadow cursor-move bg-white q-mt-xs list-group-item border-test"
              :style="element.task_type=='bug'?'border-left: 5px solid red !important':''"
              @mouseover="task_index.test_index = index"
              @mouseleave="task_index.test_index = null"
            >
              <q-avatar
                class="q-pa-none"
                size="25px"
                dense
                :class="element.task_type=='bug'? 'bug bottom-right-radius':'feature-test bottom-right-radius'"
                text-color="white"
              >
                <q-icon
                  filled
                  size="xs"
                  :name="element.task_type=='bug'? 'bug_report':'assignment'"
                />
              </q-avatar>
              <span class="text-caption text-grey-9 q-ml-xs">
                #{{element.id}}
                <q-icon
                  filled
                  size="xs"
                  name="close"
                  class="float-right text-weight-bolder"
                  :style="{'visibility':index==task_index.test_index?'visible':'hidden'}"
                  @click="deleteTask('task_test',task_index.test_index)"
                />
                <q-avatar class="q-ma-xs" size="20px" font-size="15px" color="secondary" text-color="white" icon="person" />
              </span>
              <q-card-section class="q-pt-sm">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div>{{element.task_title}}</div>
                  </div>
                </div>
              </q-card-section>
              <q-badge
                outline
                v-bind:key="index"
                class="q-mx-xs text-bold tag-badge tag-badge"
                v-for="(tag, index) in element.tags"
                :color="tag.color"
              >{{tag.name}}
              </q-badge>
              <q-card-actions>
                <q-btn size="xs" dense filled round color="blue" icon="message"/>
                <q-btn size="xs" dense filled round color="orange" icon="flag"/>
                <q-btn size="xs" dense filled round color="grey" icon="attachment"/>
              </q-card-actions>
            </q-card>
          </draggable>
        </div>
      </div>

      <div class="col-3 q-px-xs">
        <div class="q-pa-xs column-background">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm done-title">
            <q-item-section avatar style="min-width:25px">
              <q-icon name="las la-check-circle" class="q-pa-none q-ma-none"/>
            </q-item-section>
            <q-item-section class="text-h6 text-weight-bolder">Done</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="rotate" transition-hide="rotate">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Mark all as completed</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Mark all as in progress</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Mark all as hold</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <draggable
            class="list-group"
            :list="task_done"
            group="tasks"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <q-card
              square
              v-for="(element, index) in task_done"
              v-bind:key="index"
              flat
              bordered
              class="box-shadow cursor-move bg-white q-mt-xs list-group-item border-done"
              :style="element.task_type=='bug'?'border-left: 5px solid red !important':''"
              @mouseover="task_index.done_index = index"
              @mouseleave="task_index.done_index = null"
            >
              <q-avatar
                class="q-pa-none"
                size="25px"
                dense
                :class="element.task_type=='bug'? 'bug bottom-right-radius':'feature-done bottom-right-radius'"
                text-color="white"
              >
                <q-icon
                  filled
                  size="xs"
                  :name="element.task_type=='bug'? 'bug_report':'assignment'"
                />
              </q-avatar>
              <span class="text-caption text-grey-9 q-ml-xs">
                #{{element.id}}
                <q-icon
                  filled
                  size="xs"
                  name="close"
                  class="float-right text-weight-bolder"
                  :style="{'visibility':index==task_index.done_index?'visible':'hidden'}"
                  @click="deleteTask('task_done',task_index.done_index)"
                />
                <q-avatar class="float-right q-my-md" size="md">
                  <q-avatar class="q-ma-xs" size="20px" font-size="15px" color="secondary" text-color="white" icon="person" />
                </q-avatar>
              </span>
              <q-card-section class="q-pt-sm">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class>{{element.task_title}}</div>
                  </div>
                </div>
              </q-card-section>
              <q-badge
                outline
                v-bind:key="index"
                class="q-mx-xs text-bold tag-badge tag-badge"
                v-for="(tag, index) in element.tags"
                :color="tag.color"
              >{{tag.name}}
              </q-badge>
              <q-card-actions>
                <q-btn size="xs" dense filled round color="blue" icon="message"/>
                <q-btn size="xs" dense filled round color="orange" icon="flag"/>
                <q-btn size="xs" dense filled round color="grey" icon="attachment"/>
              </q-card-actions>
            </q-card>
          </draggable>
        </div>
      </div>
    </draggable>
    <q-dialog v-model="add_new" position="left">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Add New Task</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="row items-center no-wrap">
          <q-form class="q-gutter-md full-width">
            <q-input filled v-model="task_item.task_title" label="Card Name" class="q-ml-none"/>
            <q-input filled v-model="task_item.task_type" label="Description" class="q-ml-none"/>
            <q-input filled v-model="task_item.priority" label="Priority" class="q-ml-none"/>
            <q-input filled v-model="task_item.value" label="value" class="q-ml-none"/>
            <div class="text-right">
              <q-btn @click="add_new=false" label="Cancel" type="submit" color="primary"/>
              <q-btn
                @click="addNewTask"
                style="width: 90px"
                class="q-ml-sm"
                label="Add"
                type="submit"
                color="green"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import CardsForm from 'components/CardsVue'
import Vue from 'vue'
import draggable from 'vuedraggable'

Vue.component('draggable', draggable)

export default {
  name: 'Zgodbe',
  // components: { CardsForm },
  data () {
    return {
      user: {},
      pagination: {
        rowsPerPage: 0
      },
      cards: {
        id: '',
        sprint_id: '',
        card_name: '',
        description: '',
        acceptance_test: '',
        priority: '',
        value: '',
        subtasks: ''
      },
      sprintId: '',
      task_index: {
        to_do_index: null,
        in_progress_index: null,
        test_index: null,
        done_index: null
      },
      task_item: {
        sprint_id: '',
        task_title: '', // card name
        task_type: '', // description
        acceptance_test: '',
        priority: '',
        value: '',
        subtasks: ''
      },
      add_new: false,
      drag: false,
      task_to_do: [
        {
          task_title: 'Develop the add new call feature',
          task_type: 'feature',
          id: 1,
          tags: [
            { name: 'css', color: 'yellow' },
            { name: 'html', color: 'pink' }
          ]
        }
      ]
    }
  },
  mounted () {
    this.user = this.getCurrentUser()
    this.sprintId = this.$route.params.id
    this.fetchCards()
  },
  computed: {
    sprint () {
      var sprints = this.getSprints()
      for (var s in sprints) {
        if (sprints[s]._id === this.sprintId) {
          return sprints[s]
        }
      }
      return 'No sprint found.'
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
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  methods: {
    ...mapGetters('user', [
      'getCurrentUser'
    ]),
    ...mapGetters('sprint', [
      'getSprints'
    ]),
    ...mapActions('card', [
      'fetchCard',
      'postCard',
      'updateCard'
    ]),
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
