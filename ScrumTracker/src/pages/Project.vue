<template>
    <q-page class="q-ma-lg window-width">
    <q-btn class="q-ma-xs" text-color="primary" flat icon="arrow_back_ios" label="All projects" @click="$router.push('/home')" />
      <q-card class="q-ma-lg" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-ma-md bg-primary">
            <div class="text-overline text-white" style="transform: rotate(-90deg); margin-top: 50%;">Project</div>
          </q-card-section>
          <q-card-section style="width: 80%">
            <div class="text-h5 q-ma-md">{{ project.name }}</div>
            <div class="text-caption text-dark-grey q-ma-md">{{ project.description }}</div>
          </q-card-section>
          <q-separator vertical />
          <q-card-section style="width: 70%">
            <div class="row q-ma-md" v-for="user in project.users" :key="user.user_name">
                <q-avatar class="q-ma-xs" size="20px" font-size="15px" :color="avatarColor(user.user_role)" text-color="white" icon="person" />
                <span class="q-ma-xs">{{user.user_name}}</span>
                <span class="text-caption text-dark-grey q-ma-xs"> {{formatUserRoles(user.user_role)}}</span>
            </div>
          </q-card-section>
          <q-card-section class="full-width">
            <div class="row">
                <q-space/>
                <q-btn v-if="checkRole('Scrum Master')" size="md" class="q-ma-md" icon="edit" color="secondary" label="Edit project" @click="editFunction" />
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
      <div>
        <q-splitter
          v-model="splitterModel"
        >
          <template v-slot:before>
            <q-tabs
              v-model="tab"
              vertical
              class="text-secondary"
            >
              <q-tab name="productbacklog" icon="credit_card" label="Product Backlog" />
              <q-tab name="sprints" icon="dynamic_feed" label="Sprints" />
              <q-tab name="documentation" icon="description" label="Documentation" />
              <q-tab name="wall" icon="post_add" label="Project Wall" />
            </q-tabs>
          </template>
          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="productbacklog">
                <ProductBacklog :allCards="allCards" :projectId="$route.params.id" :user="user"></ProductBacklog>
              </q-tab-panel>
              <q-tab-panel name="sprints">
                <SprintTable :projectIdProp="$route.params.id" :projectUsersProp="project.users"></SprintTable>
              </q-tab-panel>
              <q-tab-panel name="documentation">
                <Documentation :project="project"></Documentation>
              </q-tab-panel>
              <q-tab-panel name="wall">
                <ProjectWall :project="project"></ProjectWall>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
    </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ProjectForm from 'components/ProjectForm.vue'
import Documentation from 'components/Documentation.vue'
import SprintTable from 'components/SprintTable.vue'
import ProjectWall from 'components/ProjectWall.vue'
import ProductBacklog from 'components/ProductBacklog.vue'

export default {
  name: 'Project',
  components: { ProjectForm, SprintTable, Documentation, ProjectWall, ProductBacklog },
  data () {
    return {
      user: {},
      projectId: '',
      editProjectData: false,
      dialogTitle: 'Edit project',
      editProject: {
        name: '',
        users: [],
        description: '',
        documentation: '',
        wall: [],
        _id: ''
      },
      allCards: [],
      tab: 'sprints',
      splitterModel: 20
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
    ...mapActions('sprint', [
      'fetchSprint'
    ]),
    ...mapGetters('project', [
      'getProjects'
    ]),
    ...mapActions('card', [
      'fetchCards'
    ]),
    ...mapGetters('card', [
      'getCards'
    ]),
    updateProjectInfo () {
      this.editProjectData = false
    },
    checkRole (currentRole) {
      var validRole = false
      if (this.user !== {}) {
        if (this.user.permissions === 'Admin') {
          validRole = true
        }
        for (var user in this.project.users) {
          if (this.user.username === this.project.users[user].user_name) {
            if (this.project.users[user].user_role[1] === currentRole) {
              validRole = true
            }
          }
        }
      }
      return validRole
    },
    editFunction () {
      this.editProject.name = this.project.name
      this.editProject.description = this.project.description
      this.editProject.documentation = this.project.documentation
      this.editProject.wall = this.project.wall
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
    showCards () {
      this.addCard = false
      setTimeout(() => {
        var cards = this.getCards()
        this.allCards = this.cardsToArray(cards)
      }, 1000)
    },
    cardsToArray (cards) {
      var allCards = []
      for (var card in cards) {
        if (cards[card].project_id === this.projectId) {
          allCards.push(cards[card])
        }
      }
      return allCards
    }
  },
  created () {
    this.user = this.getCurrentUser()
    this.fetchSprint()
    this.fetchCards()
    this.projectId = this.$route.params.id
    this.showCards()
  }
}
</script>
<style>
    .text-caption {
        font-size: .9em;
        opacity: .6;
    }
</style>
