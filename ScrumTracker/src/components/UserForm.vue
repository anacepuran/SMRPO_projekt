<template>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
        <q-input
            filled
            v-model="pushUser.name"
            label="Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
            filled
            v-model="pushUser.surname"
            label="Surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
            filled
            v-model="pushUser.email"
            label="Email"
            type="email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
            filled
            v-model="pushUser.username"
            label="Username"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
            v-if="changePassword"
            filled
            v-model="pushUser.password"
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-btn class="q-ma-md" size="sm" v-if="!changePassword && $props.editUser" @click="changePassword=true" label="Change password"/>
        <q-btn size="sm" v-if="changePassword && $props.editUser" @click="changePassword=false; pushUser.password=''" label="Leave the old password" style="margin-top: -10px"/>
        <div v-if="this.$router.currentRoute.path === '/users'">
            <q-select filled v-model="pushUser.permissions" :options="permissionOptions" label="Permissions" width="100%"/>
        </div>
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
  name: 'UserForm',
  data () {
    return {
      error: '',
      permissionOptions: ['Admin', 'User'],
      changePassword: false,
      allUsers: [],
      pushUser: {
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        permissions: '',
        last_login: ''
      }
    }
  },
  props: {
    editUser: {
      type: Boolean
    },
    newUser: {
      type: Object
    }
  },
  mounted () {
    var users = this.getUsers()
    this.allUsers = this.usersToArray(users)
    this.onReset()
    if (!this.$props.editUser) {
      this.changePassword = true
    }
  },
  methods: {
    ...mapGetters('user', [
      'getUsers'
    ]),
    ...mapActions('user', [
      'postUser',
      'updateUser'
    ]),
    usersToArray (users) {
      var data = []
      for (var user in users) {
        data.push(users[user])
      }
      return data
    },
    onSubmit () {
      // CHECK IF USER WITH USERNAME ALREADY EXISTS
      if (this.pushUser.username !== this.newUser.username) {
        var alreadyExists = false
        for (var user in this.allUsers) {
          if (this.pushUser.username === this.allUsers[user].username) {
            alreadyExists = true
            this.error = 'User with the username "' + this.pushUser.username + '" already exists.'
          }
        }
      }
      var submitMessage = ''
      if (!alreadyExists) {
        if (this.$props.editUser) {
          submitMessage = 'User updated.'
          this.updateUser(this.pushUser)
          this.onReset()
        } else {
          submitMessage = 'User added.'
          this.postUser(this.pushUser)
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
        this.$emit('submitUser')
      }
    },
    onReset () {
      this.pushUser.name = this.$props.newUser.name
      this.pushUser.surname = this.$props.newUser.surname
      this.pushUser.email = this.$props.newUser.email
      this.pushUser.username = this.$props.newUser.username
      this.pushUser.password = ''
      this.pushUser.permissions = this.$props.newUser.permissions
      this.pushUser._id = this.$props.newUser._id
      this.pushUser.last_login = this.$props.newUser.last_login
      this.error = ''
    }
  }
}
</script>
