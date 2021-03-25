<template>
  <q-page class="q-ma-lg window-width">
    <div class="text-h4 q-ma-md">Projects</div>
    <div class="row q-ma-md">
      <div class="col-3">
        <q-input dense outlined bottom-slots v-model="search" label="Search">
          <template v-slot:append>
            <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
            <q-icon name="search" />
          </template>
          <template v-slot:hint>
            Search project by name
          </template>
        </q-input>
      </div>
      <q-space/>
      <div class="q-ma-sm col-2">
        <q-btn v-if="currentUser.permissions === 'Admin'" size="md" color="primary" label="Add project" icon="create_new_folder" @click="addProject=true" />
      </div>
    </div>
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
        <q-td :props="propsName" @click="openProject(propsName.row._id)">
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
              <q-avatar class="q-ma-xs" size="20px" font-size="15px" :color="avatarColor(user.user_role)" text-color="white" icon="person" />
            </div>
            <span class="col-2 q-ma-xs">{{user.user_name}}</span><span class="col text-caption text-dark-grey q-ma-xs"> {{formatUserRoles(user.user_role)}}</span>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-delete="propsDelete" v-if="currentUser.permissions === 'Admin'">
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
          <div class="text-h6 q-ma-md">Create new project</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="onReset" v-close-popup />
        </q-card-section>
        <!-- USER FORM COMPONENT -->
        <ProjectForm :newProject="newProject" :editProject="false" @submitProject="showProjects"></ProjectForm>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ProjectForm from 'components/ProjectForm.vue'
export default {
  name: 'Home',
  components: { ProjectForm },
  data () {
    return {
      currentUser: {},
      pagination: {
        rowsPerPage: 0
      },
      loading: false,
      search: '',
      addProject: false,
      deleteProjectId: '',
      confirmDelete: false,
      projects: [],
      newProject: {
        name: '',
        users: [],
        deadline: ''
      }
    }
  },
  computed: {
    filteredProjects () {
      return this.getSearchFiltered(this.search)
    },
    columns () {
      if (this.currentUser.permissions === 'Admin') {
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
    ...mapGetters('project', [
      'getProjects'
    ]),
    ...mapActions('project', [
      'fetchProjects',
      'editProject',
      'deleteProject'
    ]),
    openProject (projectId) {
      console.log(projectId)
      this.$router.push('/project/' + projectId)
    },
    deleteFunction (projectId) {
      this.deleteProject(projectId)
      this.showProjects()
    },
    showProjects () {
      this.addProject = false
      this.loading = true
      setTimeout(() => {
        var projects = this.getProjects()
        this.projects = this.projectsToArray(projects)
        this.loading = false
      }, 1000)
    },
    formatUserRoles (userRoles) {
      var roles = ''
      for (var i = 1; i < userRoles.length; i++) {
        roles += userRoles[i]
        if (i < userRoles.length - 1) {
          roles += ' + '
        }
      }
      return roles
    },
    avatarColor (userRole) {
      console.log(userRole)
      var color = ''
      if (userRole[1] === 'Product Owner') {
        color = 'teal'
      }
      if (userRole[1] === 'Scrum Master') {
        color = 'orange'
      }
      if (userRole[1] === 'Developer') {
        color = 'red'
      }
      return color
    },
    projectsToArray (projects) {
      var data = []
      for (var project in projects) {
        data.push(projects[project])
      }
      return data
    },
    onReset () {
      this.newProject.name = ''
      this.newProject.users = []
      this.newProject.deadline = ''
    },
    getSearchFiltered (search) {
      if (this.search !== '') {
        var filteredItems = []
        for (var project in this.projects) {
          const projectName = this.projects[project].name.toLowerCase()
          if (projectName.startsWith(search.toLowerCase())) {
            // console.log(checkedItems[i].title.toLowerCase().startsWith(searchString))
            filteredItems.push(this.projects[project])
          }
        }
        return filteredItems
      }
      return this.projects
    }
  },
  mounted () {
    this.currentUser = this.getCurrentUser()
    // console.log(this.currentUser)
    this.fetchProjects()
    this.showProjects()
  }
}
</script>
<style></style>
