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
          <!-- USER FORM COMPONENT -->
          <ProjectForm :newProject="editProject" :editProject="editProjectData" @submitProject="updateProjectInfo()"></ProjectForm>
        </q-card>
      </q-dialog>
      <q-card class="q-ma-md">
        <q-card-section class="bg-secondary" >
            <div class="text-white text-h6">Sprints</div>
        </q-card-section>
        <q-list  bordered separator>
            <q-item v-for="sprint in projectSprints" :key="sprint._id" clickable v-ripple>
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
            </q-item>
        </q-list>
      </q-card>
    </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ProjectForm from 'components/ProjectForm.vue'
export default {
  name: 'Project',
  components: { ProjectForm },
  data () {
    return {
      user: {},
      projectId: '',
      editProjectData: false,
      dialogTitle: 'Edit project',
      editProject: {
        name: '',
        users: [],
        deadline: '',
        _id: ''
      },
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
      ]
    }
  },
  computed: {
    project () {
      var allProjects = this.getProjects()
      for (var project in allProjects) {
        if (allProjects[project]._id === this.projectId) {
          return allProjects[project]
        }
      }
      return 'No project found.'
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
      'fetchProjects'
    ]),
    updateProjectInfo () {
      this.editProjectData = false
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
    }
  },
  mounted () {
    this.user = this.getCurrentUser()
    this.fetchProjects()
    this.projectId = this.$route.params.id
  }
}
</script>
<style>
    .text-caption {
        font-size: .9em;
        opacity: .6;
    }
</style>
