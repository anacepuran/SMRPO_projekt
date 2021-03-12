<template>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
        <q-input
            filled
            v-model="pushProject.name"
            label="Project name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <div class="row">
            <div class="col-8">
                <q-select
                    filled
                    v-model="pushProject.users"
                    multiple
                    :options="allUsers"
                    label="Users"
                    color="secondary"
                    use-chips
                    stack-label
                />
            </div>
            <q-space/>
            <div class="col q-ma-md">
                <q-btn size="md" label="Set user roles" color="secondary" @click="setRoles=!setRoles"/>
            </div>
        </div>
        <q-list v-if="setRoles" separator>
            <q-item v-for="user in pushProject.users" :key="user.label">
                <q-item-section>{{user.label}}</q-item-section>
                <q-space/>
                <q-select
                    filled
                    v-model="user.role"
                    :options="roleOptions"
                    label="Users"
                    style="width: 250px"
                />
            </q-item>
        </q-list>
        <div class="row">
            <div class="col q-ma-sm">
                <q-btn label="Select deadline" icon="event" color="secondary" @click="datePicker=true" />
            </div>
            <div class="col q-ma-md">
                <q-badge color="secondary">
                    Deadline: {{ selectDeadline }}
                </q-badge>
            </div>
        </div>
        <q-dialog v-model="datePicker">
            <q-card class="q-ma-md">
                <div class="row">
                    <q-date
                        mask="DD/MM/YYYY"
                        v-model="selectDeadline"
                        minimal
                    />
                </div>
                <div class="row q-ma-md flex flex-center">
                    <q-btn label="Save" color="primary" @click="pushProject.deadline=selectDeadline" v-close-popup />
                    <q-btn label="Reset" flat color="primary" @click="selectDeadline=''" v-close-popup />
                </div>
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
export default {
  name: 'ProjectForm',
  data () {
    return {
      error: '',
      roleOptions: ['Product Manager', 'Development Team Member', 'Methodology Admin'],
      allProjects: [],
      setRoles: false,
      datePicker: false,
      selectDeadline: '',
      pushProject: {
        name: '',
        users: [],
        deadline: ''
      },
      today: ''
    }
  },
  props: {
    editProject: {
      type: Boolean
    },
    newProject: {
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
    this.fetchProjects()
    this.fetchUsers()
    var projects = this.getProjects()
    this.allProjects = this.projectsToArray(projects)
    this.onReset()
    this.today = this.getDate()
    this.selectDeadline = this.pushProject.deadline
  },
  methods: {
    ...mapGetters('project', [
      'getProjects'
    ]),
    ...mapGetters('user', [
      'getUsers'
    ]),
    ...mapActions('project', [
      'fetchProjects',
      'postProject',
      'updateProject'
    ]),
    ...mapActions('user', [
      'fetchUsers'
    ]),
    projectsToArray (projects) {
      var data = []
      for (var project in projects) {
        data.push(projects[project])
      }
      return data
    },
    usersPushData (users) {
      var data = []
      var allUsers = this.getUsers()
      for (var user in users) {
        for (var isUser in allUsers) {
          if (users[user].label === allUsers[isUser].username) {
            var push = {
              user_name: allUsers[isUser].username,
              user_id: allUsers[isUser]._id,
              user_role: users[user].role
            }
            data.push(push)
          }
        }
      }
      return data
    },
    getDate () {
      var d = new Date()
      var dateNow = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
      return dateNow
    },
    checkProjectName () {
      // CHECK IF USER WITH USERNAME ALREADY EXISTS
      var alreadyExists = false
      if (this.pushProject.name !== this.newProject.name) {
        for (var project in this.allProjects) {
          if (this.pushProject.name === this.allProjects[project].name) {
            alreadyExists = true
            this.error = 'Project with the name "' + this.pushProject.name + '" already exists.'
          }
        }
      } else {
        alreadyExists = true
      }
      return alreadyExists
    },
    setPushUser () {
      this.pushProject.users = this.usersPushData(this.pushProject.users)
      if (this.selectDeadline !== '' && this.today !== this.selectDeadline) {
        this.pushProject.deadline = this.selectDeadline
      } else {
        this.pushProject.deadline = 'No deadline'
      }
    },
    onSubmit () {
      var submitMessage = ''
      if (!this.checkProjectName()) {
        this.setPushUser()
        if (this.$props.editProject) {
          submitMessage = 'Project updated.'
          this.updateProject(this.pushProject)
          this.onReset()
        } else {
          submitMessage = 'Project added.'
          this.postProject(this.pushProject)
          this.onReset()
        }
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          icon: 'cloud_done',
          message: submitMessage,
          position: 'top-right',
          timeout: 1000
        })
        this.error = ''
        this.$emit('submitProject')
      }
    },
    onReset () {
      this.pushProject.name = this.$props.newProject.name
      this.pushProject.users = this.$props.newProject.users
      this.pushProject.deadline = this.$props.newProject.deadline
      this.pushProject._id = this.$props.newProject._id
      this.selectDeadline = this.$props.newProject.deadline
      this.error = ''
    }
  }
}
</script>
