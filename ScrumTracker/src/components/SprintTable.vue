<template>
    <q-card class="q-ma-md">
        <q-card-section class="row bg-secondary">
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
            <template v-slot:body-cell-delete="propsDelete" v-if="checkRole('Scrum Master')" >
              <q-td :props="propsDelete">
                <div>
                  <q-btn @click="confirmDelete=true; deleteSprintId=propsDelete.row._id" size="sm" round color="negative" icon="delete" />
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-edit="propsEdit" v-if="checkRole('Scrum Master')">
              <q-td :props="propsEdit">
                <div>
                  <q-btn flat @click="editSprint(propsEdit.row)" icon="edit" color="secondary" ></q-btn>
                </div>
              </q-td>
            </template>
          </q-table>
        </div>
        <q-dialog v-model="confirmDelete">
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="delete" color="primary" text-color="white" />
                <span class="q-ml-sm">Are you sure you want to delete this Sprint?</span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat @click="deleteSprintId=''" label="Cancel" color="primary" v-close-popup />
                <q-btn flat @click="deleteFunction(deleteSprintId)" label="DELETE" color="negative" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        <q-dialog v-model="editSprintData">
          <q-card class="q-pa-md" style="width: 80vh">
            <q-card-section class="row items-center">
              <div class="text-h6"> Edit Sprint </div>
              <q-space />
              <q-btn icon="close" flat round dense @click="onReset" v-close-popup />
             </q-card-section>
            <SprintForm :newSprint="editSprints" :editProject="editSprintData"  @submitSprint="showSprints()"></SprintForm>
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
    </q-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SprintForm from 'components/SprintForm.vue'
export default {
  name: 'SprintTable',
  components: { SprintForm },
  data () {
    return {
      user: {},
      projectId: '',
      projectUsers: [],
      sprints: [],
      addSprint: false,
      pagination: {
        rowsPerPage: 0
      },
      loading: false,
      deleteSprintId: '',
      confirmDelete: false,
      newSprint: {
        name: '',
        project_id: '',
        startdate: '',
        enddate: '',
        expectedtime: ''
      },
      editSprints: {
        _id: '',
        name: '',
        project_id: '',
        startdate: '',
        enddate: '',
        expectedtime: ''
      },
      editSprintData: false,
      projectCards: '',
      dateError: '',
      today: '',
      sdate: '',
      edate: ''
    }
  },
  props: {
    projectUsersProp: {
      type: Array
    },
    projectIdProp: {
      type: String
    },
    allSprints: {
      type: Array
    },
    newSprint1: {
      type: Object
    }
  },
  mounted () {
    setTimeout(() => {
      this.projectCards = this.allSprints
    }, 100)
    this.user = this.getCurrentUser()
    this.projectId = this.$props.projectIdProp
    this.projectUsers = this.$props.projectUsersProp
    this.today = this.getDate()
    this.onReset()
    this.showSprints()
  },
  computed: {
    filteredSprints () {
      return this.sprints
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
          { name: 'delete', align: 'center', label: 'Delete sprint', field: 'delete' },
          { name: 'edit', align: 'left', label: 'Edit sprint', field: 'edit' }
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
      'deleteSprint',
      'updateSprint'
    ]),
    ...mapGetters('project', [
      'getProjects'
    ]),
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
        if (projectSprints[sprint].project_id === this.projectId) {
          data.push(projectSprints[sprint])
        }
      }
      this.newSprint.name = 'Sprint ' + (data.length + 1)
      return data
    },
    /*
    Sprintdate (sprint1) {
      this.sdate = sprint1.startdate
      this.edate = sprint1.enddate
      console.log(this.sdate)
      // this.sdate = this.newSprint.startdate
      var today1 = moment(this.today, 'DD/MM/YYYY')
      var start1 = moment(this.sdate, 'DD/MM/YYYY')
      var end1 = moment(this.edate, 'DD/MM/YYYY')
      // console.log(start1)
      // console.log(end1)
      // console.log(today1)

      if (today1 > start1 && today1 > end1) return false
      return true
    }, */
    getDate () {
      var d = new Date()
      var dateNow = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
      return dateNow
    },
    checkRole (currentRole) {
      var validRole = false
      if (this.user !== {}) {
        if (this.user.permissions === 'Admin') {
          validRole = true
        }
        for (var user in this.projectUsers) {
          if (this.user.username === this.projectUsers[user].user_name) {
            if (this.projectUsers[user].user_role[1] === currentRole) {
              validRole = true
            }
          }
        }
      }
      return validRole
    },
    editSprint (sprint) {
      this.editSprints.name = sprint.name
      this.editSprints.startdate = sprint.start_date
      this.editSprints.enddate = sprint.end_date
      this.editSprints.expectedtime = sprint.expected_time
      this.editSprints.project_id = sprint.project_id
      this.editSprints._id = sprint._id
      this.editSprintData = true
    },
    openSprint (sprintId) {
      this.$router.push('/sprints/' + sprintId)
    },
    deleteFunction (sprintId) {
      this.deleteSprint(sprintId)
      this.showSprints()
    },
    onReset () {
      this.newSprint.name = 'Sprint ' + (this.sprints.length + 1)
      this.newSprint.startdate = ''
      this.newSprint.enddate = ''
      this.newSprint.expectedtime = ''
      this.newSprint.project_id = this.projectId // ovde namesto ova ko vo project
    }

  }
}
</script>
