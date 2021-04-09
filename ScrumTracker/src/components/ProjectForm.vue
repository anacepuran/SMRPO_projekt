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
      <div class="row q-pa-md" >
        <q-input
          class="full-width"
          label="Description"
          v-model="pushProject.description"
          clearable
          filled
          autogrow
        />
      </div>
      <div class="row">
          <div class="col">
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
        </div>
        <q-list separator>
          <q-item v-for="user in pushProject.users" :key="user.label">
            <q-item-section>{{user.label}}</q-item-section>
            <q-space/>
            <div class="q-gutter-sm">
              <q-checkbox v-if="disablePO(user.role)" v-model="user.role" val="Product Owner" label="Product Owner" color="teal"/>
              <q-checkbox v-else disable v-model="user.role" val="Product Owner" label="Product Owner" color="teal"/>
              <q-checkbox v-if="disableOption(user.role)" v-model="user.role" val="Scrum Master" label="Scrum Master" color="orange"/>
              <q-checkbox v-else disable v-model="user.role" val="Scrum Master" label="Scrum Master" color="orange"/>
              <q-checkbox v-if="disableOption(user.role)" v-model="user.role" val="Developer" label="Developer" color="red"/>
              <q-checkbox v-else disable v-model="user.role" val="Developer" label="Developer" color="red" />
            </div>
          </q-item>
        </q-list>
        <q-card-actions horizontal align="right">
            <q-btn label="Submit" type="submit" color="primary"/>
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
      roleOptions: [
        {
          label: 'Product Owner',
          value: 'Product Owner',
          disable: false
        },
        {
          label: 'Developer',
          value: 'Developer',
          disable: false
        },
        {
          label: 'Scrum Master',
          value: 'Scrum Master',
          disable: false
        }
      ],
      allProjects: [],
      setRoles: false,
      pushProject: {
        name: '',
        users: [],
        description: ''
      }
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
          role: [null]
        }
        data.push(userData)
      }
      return data
    }
  },
  mounted () {
    this.fetchProjects()
    this.fetchUsers()
    var projects = this.getProjects()
    this.allProjects = this.projectsToArray(projects)
    this.onReset()
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
            users[user].role.sort()
            users[user].role.reverse()
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
    checkProject () {
      var accept = true
      // CHECK IF PROJECT WITH THIS NAME ALREADY EXISTS
      if (this.pushProject.name.toLowerCase().trim() !== this.newProject.name.toLowerCase().trim()) {
        for (var project in this.allProjects) {
          if (this.pushProject.name.toLowerCase().trim() === this.allProjects[project].name.toLowerCase().trim()) {
            accept = false
            this.error = 'Project with the name "' + this.pushProject.name + '" already exists.'
          }
        }
      }
      // CHECK IF THERE IS MORE THAN ONE PROJECT OWNERS
      var numOfPO = 0
      var numOfSM = 0
      for (var user in this.pushProject.users) {
        for (var role in this.pushProject.users[user].role) {
          if (this.pushProject.users[user].role[role] === 'Product Owner') {
            numOfPO++
            if (numOfPO > 1) {
              accept = false
              this.error = 'There can only be one Product Owner.'
            }
          }
          if (this.pushProject.users[user].role[role] === 'Scrum Master') {
            numOfSM++
            if (numOfSM > 1) {
              accept = false
              this.error = 'There can only be one Scrum Master.'
            }
          }
        }
      }
      return accept
    },
    disablePO (userRole) {
      for (var option in userRole) {
        if (userRole[option] === 'Developer' || userRole[option] === 'Scrum Master') {
          return false
        }
      }
      return true
    },
    disableOption (userRole) {
      for (var option in userRole) {
        if (userRole[option] === 'Product Owner') {
          return false
        }
      }
      return true
    },
    onSubmit () {
      var submitMessage = ''
      if (this.checkProject()) {
        this.pushProject.users = this.usersPushData(this.pushProject.users)
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
      for (var user in this.pushProject.users) {
        this.pushProject.users[user].role = [null]
      }
      this.pushProject.name = this.$props.newProject.name
      this.pushProject.users = this.$props.newProject.users
      this.pushProject.description = this.$props.newProject.description
      this.pushProject.documentation = this.$props.newProject.documentation
      this.pushProject.wall = this.$props.newProject.wall
      this.pushProject._id = this.$props.newProject._id
      this.error = ''
    }
  }
}
</script>
