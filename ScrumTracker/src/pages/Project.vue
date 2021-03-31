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
                <q-btn v-if="checkRole('Scrum Master')" size="md" class="q-ma-md" icon="edit" color="primary" label="Edit project" @click="editFunction" />
            </div>
            <div class="row">
                <q-space/>
                <q-btn v-if="checkRole('Product Owner') || checkRole('Scrum Master')" size="md" class="q-ma-md" icon="add" color="primary" label="Add card to project" @click="addCard=true" />
            </div>
            <div class="row">
                <q-space/>
                <q-btn v-if="checkRole('Product Owner') || checkRole('Scrum Master')" size="md" class="q-ma-md" icon="visibility" color="primary" label="Show project cards" @click="showAllCards=true" />
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
        <q-card-section class="row bg-secondary" v-if="checkRole('Scrum Master') || checkRole('Developer')">
          <div class="text-white text-h6 q-ma-sm">Sprints</div>
          <q-space/>
          <div class="q-ma-sm">
            <q-btn v-if="checkRole('Scrum Master')" size="md" color="primary" label="Add Sprint" icon="create_new_folder" @click="addSprint=true" />
          </div>
        </q-card-section>
        <div class="row q-ma-md"  v-if="checkRole('Scrum Master') || checkRole('Developer')">
          <q-table
            class="full-width"
            :data="filteredSprints"
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
            <template v-slot:body-cell-delete="propsDelete" v-if="checkRole('Scrum Master')">
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
        <q-dialog v-model="addSprint">
          <q-card class="q-pa-md" style="width: 80vh">
            <q-card-section class="row items-center">
              <div class="text-h6 q-ma-md">Create new Sprint</div>
              <q-space />
              <q-btn icon="close" flat round dense @click="onReset" v-close-popup />
            </q-card-section>
            <!-- USER FORM COMPONENT -->
            <SprintForm :newSprint="newSprint" :editProject="false" @submitSprint="showSprints"></SprintForm>
          </q-card>
        </q-dialog>
        <q-dialog v-model="addCard">
          <q-card class="q-pa-md" style="width: 80vw">
            <q-card-section class="row items-center">
              <div class="text-h6 q-ma-md">Add new card</div>
              <q-space />
              <q-btn icon="close" flat round dense @click="onResetCard" v-close-popup />
            </q-card-section>
            <!-- CARD FORM COMPONENT -->
            <AddCardsForm :newCard="newCard" :allCards="allCards" :editCard="false" @submitCard="onResetCard"></AddCardsForm>
          </q-card>
        </q-dialog>
        <q-dialog v-model="showAllCards" full-width>
          <q-card class="q-pa-md">
            <q-card-section class="row items-center">
              <q-btn icon="close" flat round dense @click="onResetCard" v-close-popup/>
            </q-card-section>
            <!-- SHOW CARDS COMPONENT -->
            <ShowCards :allCards="allCards" :projectId="this.$route.params.id"></ShowCards>
          </q-card>
        </q-dialog>
      </q-card>
    </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ProjectForm from 'components/ProjectForm.vue'
import SprintForm from 'components/SprintForm.vue'
import AddCardsForm from 'components/CardsForm.vue'
import ShowCards from 'components/ShowCards.vue'

export default {
  name: 'Project',
  components: { ProjectForm, SprintForm, AddCardsForm, ShowCards },
  data () {
    return {
      user: {},
      pagination: {
        rowsPerPage: 0
      },
      loading: false,
      search: '',
      addSprint: false,
      deleteProjectId: '',
      confirmDelete: false,
      sprints: [],
      projectId: '',
      editProjectData: false,
      dialogTitle: 'Edit project',
      editProject: {
        name: '',
        users: [],
        description: '',
        _id: ''
      },
      newSprint: {
        name: '',
        project_id: '',
        startdate: '',
        enddate: '',
        expectedtime: '',
        numOfUsers: 0
      },
      addCard: false,
      showAllCards: false,
      allCards: [],
      newCard: {
        _id: '',
        project_id: this.$route.params.id,
        sprint_id: '',
        expected_time: '',
        card_name: '',
        description: '',
        acceptance_test: [],
        priority: '',
        value: '',
        subtasks: [],
        card_round: ''
      }
    }
  },
  computed: {
    filteredSprints () {
      return this.sprints
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
      if (this.checkRole('Scrum Master')) {
        return [
          {
            name: 'name',
            required: true,
            label: 'Name',
            align: 'left',
            field: row => row.name,
            sortable: true
          },
          { name: 'start_date', align: 'center', label: 'Start date', field: 'start_date' },
          { name: 'end_date', align: 'center', label: 'End date', field: 'end_date', sortable: true },
          { name: 'expected_time', align: 'center', label: 'Expected time', field: 'expected_time' },
          { name: 'delete', align: 'center', label: 'Delete sprint', field: 'delete' }
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
          { name: 'start_date', align: 'center', label: 'Start date', field: 'start_date' },
          { name: 'end_date', align: 'center', label: 'End date', field: 'end_date', sortable: true },
          { name: 'expected_time', align: 'center', label: 'Expected time', field: 'expected_time' }
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
    ...mapActions('card', [
      'fetchCards'
    ]),
    ...mapGetters('card', [
      'getCards'
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
      this.addSprint = false
      this.loading = true
      setTimeout(() => {
        var projectSprints = this.getSprints()
        this.sprints = this.sprintsToArray(projectSprints)
        this.loading = false
      }, 1000)
    },
    sprintsToArray (projectSprints) {
      var data = []
      for (var sprint in projectSprints) {
        var currentSprint = projectSprints[sprint]
        if (currentSprint.project_id === this.projectId) {
          data.push(projectSprints[sprint])
        }
      }
      this.newSprint.name = 'Sprint ' + (data.length + 1)
      return data
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
      this.newSprint.name = 'Sprint ' + (this.sprints.length + 1)
      this.newSprint.startdate = ''
      this.newSprint.enddate = ''
      this.newSprint.expectedtime = ''
      this.newSprint.numOfUsers = this.project.users.length
    },
    onResetCard () {
      this.showCards()
      this.newCard.project_id = this.$route.params.id
      this.newCard.sprint_id = ''
      this.newCard.description = ''
      this.newCard.card_name = ''
      this.newCard.acceptance_test = []
      this.newCard.subtasks = ''
      this.newCard.card_round = ''
      this.newaCard.expectedtime = ''
      this.newCard.priority = ''
      this.newCard.value = ''
      this.expected_time = ''
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
      console.log(allCards)
      return allCards
    }
  },
  mounted () {
    this.user = this.getCurrentUser()
    this.fetchSprint()
    this.fetchCards()
    this.projectId = this.$route.params.id
    this.newSprint.project_id = this.projectId
    this.newSprint.numOfUsers = this.project.users.length
    this.showSprints()
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
