<template>
  <div>
    <q-card class="q-ma-md">
        <q-card-section class="row bg-primary">
          <div class="text-white text-h6 q-ma-sm">Sprints</div>
          <q-space/>
          <div class="q-ma-sm">
            <q-btn v-if="checkRole('Scrum Master')" size="md" color="secondary" label="Add Sprint" icon="create_new_folder" @click="addSprint=true" />
          </div>
        </q-card-section>
      </q-card>
      <div class="row q-ma-md">
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
          <template v-slot:body="props">
            <q-tr :props="props" :class="(isActive(props.row.start_date, props.row.end_date))?'bg-green-3':''" @click="openSprint(props.row._id)">
              <q-td>
                  <q-icon class="q-ma-sm" size="sm" color="secondary" name="folder_open" />
                  <span class="q-ma-sm" style="font-size: 2vh">{{props.row.name}}</span>
              </q-td>
              <q-td key="start_date">
                <span class="q-ma-sm">{{props.row.start_date}}</span>
              </q-td>
              <q-td key="end_date">
                <span class="q-ma-sm">{{props.row.end_date}}</span>
              </q-td>
              <q-td key="expected_time">
                <span class="q-ma-sm">{{props.row.expected_time}}</span>
              </q-td>
              <q-td key="delete">
                <q-btn v-if="isActive(props.row.start_date, props.row.end_date)===false" @click="confirmDelete=true; deleteSprintId=props.row._id" size="sm" round color="negative" icon="delete" />
              </q-td>
              <q-td>
                <q-btn flat @click="editSprint(props.row)" icon="edit" color="secondary" ></q-btn>
              </q-td>
            </q-tr>
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
        <q-card class="q-ma-sm" style="width: 80vh">
          <q-card-section class="row bg-primary text-white">
            <div class="text-h6"> Edit Sprint </div>
            <q-space />
            <q-btn icon="close" flat round dense @click="onReset" v-close-popup />
            </q-card-section>
          <SprintForm :newSprint="editSprints" :editProject="editSprintData"  @submitSprint="showSprints"></SprintForm>
        </q-card>
      </q-dialog>
      <q-dialog v-model="addSprint">
          <q-card class="q-ma-sm" style="width: 80vh">
            <q-card-section class="row bg-primary text-white">
              <div class="text-h6">Create new Sprint</div>
              <q-space />
              <q-btn icon="close" flat round dense @click="onReset" v-close-popup />
            </q-card-section>
            <SprintForm :newSprint="newSprint" :editProject="false" @submitSprint="showSprints"></SprintForm>
          </q-card>
      </q-dialog>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SprintForm from 'components/SprintForm.vue'
import moment from 'moment'
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
    newSprint1: {
      type: Object
    }
  },
  mounted () {
    this.user = this.getCurrentUser()
    this.projectId = this.$props.projectIdProp
    this.projectUsers = this.$props.projectUsersProp
    this.onReset()
    this.showSprints()
  },
  computed: {
    filteredSprints () {
      this.sortByDate(this.sprints)
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
          { name: 'end_date', align: 'center', label: 'End date', field: 'end_date' },
          { name: 'expected_time', align: 'right', label: 'Sprint velocity', field: 'expected_time' },
          { name: 'delete', align: 'right', label: 'Delete sprint', field: 'delete' },
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
          { name: 'expected_time', align: 'right', label: 'Sprint velocity', field: 'expected_time' }
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
    sortByDate (sprints) {
      sprints.sort(function (a, b) {
        return (moment(a.start_date, 'DD/MM/YYYY') - moment(b.start_date, 'DD/MM/YYYY'))
      })
      for (var i = 0; i < sprints.length; i++) {
        sprints[i].name = 'Sprint ' + (i + 1)
      }
    },
    showSprints () {
      this.addSprint = false
      this.editSprintData = false
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
      return data
    },
    isActive (sDate, eDate) {
      var sMoment = moment(sDate, 'DD/MM/YYYY')
      var eMoment = moment(eDate, 'DD/MM/YYYY')
      var today = new Date()
      var tMoment = moment(today, 'DD/MM/YYYY')
      if (tMoment > sMoment && tMoment < eMoment) {
        return true
      } else {
        return false
      }
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
      this.newSprint.name = 'Sprint'
      this.newSprint.startdate = ''
      this.newSprint.enddate = ''
      this.newSprint.expectedtime = ''
      this.newSprint.project_id = this.projectId // ovde namesto ova ko vo project
    }

  }
}
</script>
