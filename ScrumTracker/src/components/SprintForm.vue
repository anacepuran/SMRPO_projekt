<template>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
      <div class="text-h6">{{pushSprint.name}}</div>
      <div class="row">
        <div class="col q-ma-md">
          <q-btn label="Select duration" icon="event" color="secondary" @click="datePicker=true" />
          <q-badge class="q-ma-sm" color="secondary">
            Duration: {{ selectDuration }}
        </q-badge>
      </div>
      <div class="col q-ma-sm">
        <q-input
            filled
            v-model="pushSprint.expectedtime"
            type="number"
            label="Expected Time"
            min="1" max="50"
            hint="Please specify Sprint expected time"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please select expected time',
              val => val > 0 && val < 51 || 'Please type a valid expected time'
            ]"
        />
      </div>
      </div>
        <q-dialog v-model="datePicker">
            <q-card class="q-ma-md">
                <div class="row">
                    <q-date
                        class="q-ma-md"
                        mask="DD/MM/YYYY"
                        v-model="selectDuration"
                        minimal
                        range
                    />
                </div>
                <div class="row q-ma-md flex flex-center">
                    <q-btn label="Save" color="primary" @click="setdates()"/>
                    <q-btn label="Reset" flat color="primary" @click="selectDuration=''; dateError = ''" />
                </div>
                <q-card-section class="text-center">
                  <p style="color: red; font-size:1.5vh;word-break: break-all;" v-if="dateError != ''">{{dateError}}</p>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-card-actions horizontal align="right">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
        <div class="q-ma-md text-center">
            <p style="color: red;" v-if="error != ''">{{error}}</p>
        </div>
    </q-form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'SprintForm',
  data () {
    return {
      error: '',
      dateError: '',
      allSprints: [],
      datePicker: false,
      selectDuration: '',
      projectId: '',
      pushSprint: {
        name: '',
        _id: '',
        startdate: '',
        enddate: '',
        expectedtime: '',
        project_id: ''
      },
      today: ''
    }
  },
  props: {
    editProject: {
      type: Boolean
    },
    newSprint: {
      type: Object
    }
  },
  computed: {
    allUsers () {
      var data = []
      var users = this.getUsers()
      for (var user in users) {
        var userData = {
          label: users[user].username,
          value: users[user].username,
          role: ''
        }
        data.push(userData)
      }
      console.log(data)
      return data
    }
  },
  mounted () {
    console.log(this.pushSprint)
    this.fetchSprint()
    this.fetchUsers()
    this.onReset()
    var sprints = this.getSprints()
    this.allSprints = this.sprintsToArray(sprints)
    this.today = this.getDate()
    this.selectDuration = this.pushSprint.deadline
    this.projectId = this.$props.newSprint.project_id
  },
  methods: {
    ...mapGetters('sprint', [
      'getSprints'
    ]),
    ...mapGetters('user', [
      'getUsers'
    ]),
    ...mapActions('sprint', [
      'fetchSprint',
      'postSprint',
      'updateSprint'
    ]),
    ...mapActions('user', [
      'fetchUsers'
    ]),
    sprintsToArray (sprints) {
      var data = []
      for (var sprint in sprints) {
        if (sprints[sprint].project_id === this.pushSprint.project_id) {
          data.push(sprints[sprint])
        }
      }
      return data
    },
    setdates () {
      this.dateError = ''
      var diff = moment(this.selectDuration.from, 'DD/MM/YYYY').diff(moment(), 'days')
      if (diff < 0) {
        this.dateError = 'Please select a start date in the future.'
      }
      for (var sprint in this.allSprints) {
        if (this.dateOverlaps(this.selectDuration.from, this.selectDuration.to, this.allSprints[sprint].start_date, this.allSprints[sprint].end_date)) {
          this.dateError = 'Sprint duration overleaps with the ' + this.allSprints[sprint].name + ' duration.'
        }
      }
      if (this.dateError === '') {
        this.pushSprint.startdate = this.selectDuration.from
        this.pushSprint.enddate = this.selectDuration.to
        this.dateError = ''
        this.datePicker = false
      }
    },
    dateOverlaps (Astart, Aend, Bstart, Bend) {
      var ASmoment = moment(Astart, 'DD/MM/YYYY')
      var AEmoment = moment(Aend, 'DD/MM/YYYY')
      var BSmoment = moment(Bstart, 'DD/MM/YYYY')
      var BEmoment = moment(Bend, 'DD/MM/YYYY')
      if (ASmoment <= BSmoment && BSmoment <= AEmoment) return true // b starts in a
      if (ASmoment <= BEmoment && BEmoment <= AEmoment) return true // b ends in a
      if (BSmoment < ASmoment && AEmoment < BEmoment) return true // a in b
      return false
    },
    getDate () {
      var d = new Date()
      var dateNow = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
      return dateNow
    },
    checkSprintName () {
      // CHECK IF USER WITH USERNAME ALREADY EXISTS
      var alreadyExists = false
      if (this.pushSprint.name !== this.newSprint.name) {
        for (var sprint in this.allSprints) {
          if (this.pushSprint.name === this.allSprints[sprint].name) {
            alreadyExists = true
            this.error = 'Sprint with the name "' + this.pushSprint.name + '" already exists in this project.'
          }
        }
      }
      return alreadyExists
    },
    onSubmit () {
      var submitMessage = ''
      if (!this.checkSprintName()) {
        if (this.$props.editProject) {
          submitMessage = 'Sprint updated.'
          console.log(this.pushSprint)
          this.updateSprint(this.pushSprint)
          this.onReset()
        } else {
          submitMessage = 'Sprint added.'
          this.postSprint(this.pushSprint)
          this.onReset()
        }
        // if(this.pushSprint.startdate )
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          icon: 'cloud_done',
          message: submitMessage,
          position: 'top-right',
          timeout: 1000
        })
        this.error = ''
        this.$emit('submitSprint')
      }
    },
    onReset () {
      this.pushSprint.name = this.$props.newSprint.name
      this.pushSprint.project_id = this.$props.newSprint.project_id
      this.pushSprint.startdate = this.$props.newSprint.startdate
      this.pushSprint.enddate = this.$props.newSprint.enddate
      this.pushSprint.expectedtime = this.$props.newSprint.expectedtime
      this.pushSprint._id = this.$props.newSprint._id
      this.error = ''
      this.dateError = ''
    }
  }
}
</script>
