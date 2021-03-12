<template>
    <q-page class="q-ma-lg window-width">
      <q-btn class="q-ma-xs" text-color="primary" flat icon="arrow_back_ios" label="All projects" @click="$router.push('/home')" />
      <q-card class="q-ma-lg" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-ma-md">
            <div class="text-overline">Project</div>
            <div class="text-h5 q-ma-md">{{ project.name }}</div>
            <div class="row q-ma-sm" v-for="user in project.users" :key="user.user_name" style="width: 100%">
                <div class=" col">
                    <q-avatar class="q-ma-xs" size="20px" font-size="15px" color="secondary" text-color="white" icon="person" />
                </div>
                <div class="col-10">
                    <div class="row">
                        <div class="col">
                            <span class="q-ma-xs">{{user.user_name}}</span><span class="text-caption text-grey q-ma-xs"> {{user.user_role}}</span>
                        </div>
                    </div>
                </div>
            </div>
          </q-card-section>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <div class="text-overline q-ma-md">Deadline: {{ project.deadline }}</div>
          <q-space/>
          <q-btn v-if="checkRole()" class="q-ma-md" color="primary" label="Edit project" @click="editFunction" />
        </q-card-actions>
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
      }
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
