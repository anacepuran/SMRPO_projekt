<template>
  <q-page class="q-ma-lg window-width">
    <q-btn class="q-ma-xs" text-color="primary" flat icon="arrow_back_ios" label="All sprints" @click="$router.back()" />
    <q-card class="q-ma-lg" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-ma-md bg-primary">
          <div class="text-overline text-white" style="transform: rotate(-90deg); margin-top: 225%;">Sprint</div>
        </q-card-section>
        <q-card-section class="q-ma-md">
          <div class="text-h5 q-ma-md">{{ project.name }}</div>
          <div class="text-overline q-ma-md">StartDate: {{ project.start_date }}</div>
          <div class="text-overline q-ma-md">EndDate: {{ project.end_date }}</div>
          <div class="mdi-format-text-wrapping-overflow">Expected Time: {{project.expected_time}}</div>
        </q-card-section>
        <q-separator vertical />
        <q-card-section style="width: 50%">
          <div class="row q-ma-md" v-for="user in project.users" :key="user.user_name">
            <q-avatar class="q-ma-xs" size="20px" font-size="15px" color="secondary" text-color="white" icon="person" />
            <span class="q-ma-xs" style="font-weight: bold;">{{user.user_name}}</span>
            <span class="text-caption text-dark-grey q-ma-xs"> {{user.user_role}}</span>
          </div>
        </q-card-section>
        <q-card-section class="full-width">
          <div class="row">
            <q-space/>
            <q-btn v-if="checkRole()" size="md" class="q-ma-md" icon="edit" color="primary" label="Edit project" @click="editFunction" />
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
          <draggable
            class="list-group"
            :list="task_to_do"
            group="tasks"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
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
// import ProjectForm from 'components/ProjectForm.vue'
// import SprintForm from 'components/SprintForm.vue'
import Vue from 'vue'
import draggable from 'vuedraggable'
// import { Notify } from 'quasar'

Vue.component('draggable', draggable)

export default {
  name: 'Zgodbe',
  // components: { ProjectForm },
  data () {
    return {
      user: {},
      pagination: {
        rowsPerPage: 0
      },
      loading: false,
      search: '',
      addCard: false,
      deleteProjectId: '',
      confirmDelete: false,
      sprints: [],

      projectId: '',
      editCardData: false,
      dialogTitle: 'Edit card',
      editCard: {
        card_name: '',
        description: '',
        acceptance_test: '',
        priority: '',
        value: '',
        subtasks: ''
      },
      newSprint: {
        name: '',
        id: '',
        startdate: '',
        enddate: '',
        expectedtime: ''
      },

      /*
      projectSprints: [
        {
          name: 'Sprint 1',
          start_date: '02/04/2021',
          end_date: '22/04/2021',
          _id: '1'
        },
        {
          name: 'Sprint 2',
          start_date: '02/04/2021',
          end_date: '22/04/2021',
          _id: '2'
        },
        {
          name: 'Sprint 3',
          start_date: '02/04/2021',
          end_date: '22/04/2021',
          _id: '3'
        }
      ] */
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
        },
        {
          task_title: 'Improvements',
          task_type: 'enhancement',
          id: 2,
          tags: [
            { name: 'js', color: 'orange' },
            { name: 'html', color: 'pink' },
            { name: 'api', color: 'teal' }
          ]
        },
        {
          task_title: 'Fix the issue in send email',
          task_type: 'bug',
          id: 3,
          tags: [{ name: 'api', color: 'teal' }]
        },
        {
          task_title: 'Remove static handling',
          task_type: 'feature',
          id: 4,
          tags: [
            { name: 'js', color: 'orange' },
            { name: 'api', color: 'teal' }
          ]
        }
      ],
      task_in_progress: [
        {
          task_title: 'Fix upgrade issues',
          task_type: 'bug',
          id: 5,
          tags: [
            { name: 'api', color: 'teal' },
            { name: 'html', color: 'pink' }
          ]
        },
        {
          task_title: 'Convert list to grid',
          task_type: 'feature',
          id: 6,
          tags: [
            { name: 'html', color: 'pink' },
            { name: 'api', color: 'teal' },
            { name: 'css', color: 'yellow' }
          ]
        },
        {
          task_title: 'Update back-end API',
          task_type: 'feature',
          id: 7,
          tags: [
            { name: 'css', color: 'yellow' },
            { name: 'api', color: 'teal' }
          ]
        }
      ],
      task_test: [
        {
          task_title: 'Test project upgrade version',
          task_type: 'feature',
          id: 5,
          tags: [{ name: 'api', color: 'teal' }]
        },
        {
          task_title: 'The edit blog functionalities',
          task_type: 'feature',
          id: 6,
          tags: [
            { name: 'html', color: 'pink' },
            { name: 'api', color: 'teal' },
            { name: 'js', color: 'orange' }
          ]
        },
        {
          task_title: 'Back-end API enhancements',
          task_type: 'feature',
          id: 7,
          tags: [
            { name: 'api', color: 'teal' },
            { name: 'html', color: 'pink' }
          ]
        }
      ],
      task_done: [
        {
          task_title: 'Handle new user API',
          task_type: 'feature',
          id: 5,
          tags: [
            { name: 'api', color: 'teal' },
            { name: 'html', color: 'pink' },
            { name: 'css', color: 'yellow' }
          ]
        },
        {
          task_title: 'Handle issues in front-end linking',
          task_type: 'bug',
          id: 6,
          tags: [
            { name: 'js', color: 'orange' },
            { name: 'html', color: 'pink' }
          ]
        },
        {
          task_title: 'Manage back-end API calls',
          task_type: 'feature',
          id: 7,
          tags: [
            { name: 'api', color: 'teal' },
            { name: 'css', color: 'yellow' }
          ]
        }
      ]
    }
  },
  props: {
    newProject: {
      type: Object
    }
  },
  computed: {
    filteredProjects () {
      return this.getSearchFilteredSprints(this.search)
    },
    project () {
      var allProjects = this.getSprints()
      for (var project in allProjects) {
        if (allProjects[project]._id === this.projectId) {
          return allProjects[project]
        }
      }
      return 'No project found.'
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
    ...mapActions('sprint', [
      'fetchSprint',
      'deleteSprint'
    ]),
    ...mapGetters('project', [
      'getProjects'
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
    },
    openSprint (sprintId) {
      console.log(sprintId)
      this.$router.push('/sprints/' + sprintId)
    },
    updateProjectInfo () {
      this.editProjectData = false
    },
    deleteFunction (sprintId) {
      this.deleteSprint(sprintId)
      this.showSprints()
    },
    showSprints () {
      this.addProject = false
      this.loading = true
      setTimeout(() => {
        var projects = this.getSprints()
        this.sprints = this.projectsToArray(projects)
        this.loading = false
      }, 1000)
    },
    projectsToArray (sprintss) {
      var data = []
      for (var project in sprintss) {
        data.push(sprintss[project])
      }
      return data
    },
    checkRole () {
      if (this.user !== {}) {
        if (this.user.permissions === 'Admin') {
          return true
        }
        for (var user in this.project.users) {
          if (this.project.users[user].user_role === 'Methodology Admin') {
            return true
          }
        }
      }
      return false
    },
    editFunction () {
      this.editProject.name = this.project.name
      this.editProject.deadline = this.project.deadline
      this.editProject._id = this.projectId
      var userTable = []
      for (var user in this.project.users) {
        var userData = {
          label: this.project.users[user].user_name,
          value: this.project.users[user].user_name,
          role: this.project.users[user].user_role
        }
        userTable.push(userData)
      }
      this.editProject.users = userTable
      this.editProjectData = true
    },
    onReset () {
      this.task_item.task_title = this.$props.newProject.task_title
      this.task_item.task_type = this.$props.newProject.task_type
      this.task_item.acceptance_test = this.$props.newProject.acceptance_test
      this.task_item.priority = this.$props.newProject.priority
      this.task_item.value = this.$props.newProject.value
      this.task_item.subtasks = this.$props.newProject.subtasks
      this.error = ''
    },

    getSearchFilteredSprints (search) {
      if (this.search !== '') {
        var filteredItems = []
        for (var project in this.newSprint) {
          const projectName = this.sprints[project].name.toLowerCase()
          if (projectName.startsWith(search.toLowerCase())) {
            // console.log(checkedItems[i].title.toLowerCase().startsWith(searchString))
            filteredItems.push(this.sprints[project])
          }
        }
        return filteredItems
      }
      return this.sprints
    }
  },
  mounted () {
    this.user = this.getCurrentUser()
    this.fetchSprint()
    this.projectId = this.$route.params.id
    this.newSprint.id = this.projectId
    this.showSprints()
  }
}
</script>
<!--
<style>
  .text-caption {
    font-size: .9em;
    opacity: .6;
  }
</style> -->
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
