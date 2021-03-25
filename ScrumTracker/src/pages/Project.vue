<template>
    <q-page class="q-ma-lg window-width">
    <q-btn class="q-ma-xs" text-color="primary" flat icon="arrow_back_ios" label="All projects" @click="$router.push('/home')" />
      <q-card class="q-ma-lg" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-ma-md bg-primary">
            <div class="text-overline text-white" style="transform: rotate(-90deg); margin-top: 150%;">Project</div>
          </q-card-section>
          <q-card-section class="q-ma-md">
            <div class="text-h5 q-ma-md">{{ project.name }}</div>
            <div class="text-overline q-ma-md">Deadline: {{ project.deadline }}</div>
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
      <q-dialog v-model="editProjectData">
        <q-card class="q-pa-md" style="width: 80vh">
          <q-card-section class="row items-center">
            <div class="text-h6">{{ dialogTitle }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <ProjectForm :newProject="editProject" :editProject="editProjectData" @submitProject="updateProjectInfo()"></ProjectForm>
        </q-card>
      </q-dialog>
      <q-card class="q-ma-md">
        <q-card-section class="row bg-secondary" >
          <div class="text-white text-h6 q-ma-sm">Sprints</div>
          <q-space/>
          <div class="q-ma-sm">
            <q-btn v-if="user.permissions === 'Admin'" size="md" color="primary" label="Add Sprint" icon="create_new_folder" @click="addProject=true" />
          </div>
        </q-card-section>
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
            <!-- USER FORM COMPONENT -->
            <SprintForm :newProject="newSprint" :editProject="false" @submitProject="showSprints"></SprintForm>
          </q-card>
        </q-dialog>

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
      </q-card>
    </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ProjectForm from 'components/ProjectForm.vue'
import SprintForm from 'components/SprintForm.vue'

export default {
  name: 'Project',
  components: { ProjectForm, SprintForm },
  data () {
    return {
      user: {},
      pagination: {
        rowsPerPage: 0
      },
      loading: false,
      search: '',
      addProject: false,
      deleteProjectId: '',
      confirmDelete: false,
      sprints: [],

      projectId: '',
      editProjectData: false,
      dialogTitle: 'Edit project',
      editProject: {
        name: '',
        users: [],
        deadline: '',
        _id: ''
      },
      newSprint: {
        name: '',
        id: '',
        startdate: '',
        enddate: '',
        expectedtime: ''
      }
    }
  },
  computed: {
    filteredProjects () {
      return this.getSearchFilteredSprints(this.search)
    },
    project () {
      var allProjects = this.getProjects()
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
          { name: 'deadline', align: 'left', label: 'Deadline', field: 'deadline', sortable: true },
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
          { name: 'deadline', align: 'left', label: 'Deadline', field: 'deadline', sortable: true }
        ]
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
        var projectSprints = this.getSprints()
        this.sprints = this.projectsToArray(projectSprints)
        this.loading = false
      }, 1000)
    },
    projectsToArray (projectSprints) {
      var data = []
      for (var sprint in projectSprints) {
        var currentSprint = projectSprints[sprint]
        if (currentSprint.project_id === this.projectId) {
          data.push(projectSprints[sprint])
        }
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
      this.newProject.name = ''
      this.newProject.users = []
      this.newProject.deadline = ''
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
<style>
    .text-caption {
        font-size: .9em;
        opacity: .6;
    }
</style>
