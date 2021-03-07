<template>
  <q-page class="q-ma-lg window-width">
    <div class="q-pa-md">
      <q-table
        class="q-pa-lg"
        title="Users"
        :data="allUsers"
        :columns="columns"
        row-key="username"
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :loading="loading"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body-cell-edit="propsEdit">
          <q-td :props="propsEdit">
            <div>
              <q-btn size="sm" round color="secondary" icon="create" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-delete="propsDelete">
          <q-td :props="propsDelete">
            <div>
              <q-btn @click="deleteUserId=propsDelete.row._id; confirmDelete=true" size="sm" round color="negative" icon="delete" />
            </div>
          </q-td>
        </template>
        </q-table>
      <div class="row q-ma-md">
        <q-space/>
        <q-btn color="primary" size="md" label="ADD NEW USER" @click="addUser = true"/>
      </div>
    </div>
    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this user?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat @click="deleteUserId=''" label="Cancel" color="primary" v-close-popup />
          <q-btn flat @click="deleteFunction(deleteUserId)" label="DELETE" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="addUser">
      <q-card class="q-pa-md" style="width: 80vh">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="newUser.name"
            label="Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            v-model="newUser.surname"
            label="Surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            v-model="newUser.email"
            label="Email"
            type="email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            v-model="newUser.username"
            label="Username"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            v-model="newUser.password"
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <div>
            <q-select filled v-model="newUser.permissions" :options="permissionOptions" label="Permissions" width="100%"/>
          </div>
          <q-card-actions horizontal align="right">
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </q-card-actions>
          <div class="q-ma-md text-center">
            <p style="color: red;" v-if="error != ''">{{error}}</p>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  data () {
    return {
      newUser: {
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        permissions: null
      },
      loading: false,
      allUsers: [],
      numOfUsers: 0,
      pagination: {
        rowsPerPage: 0
      },
      permissionOptions: ['Admin', 'User'],
      addUser: false,
      error: '',
      deleteUserId: '',
      confirmDelete: false,
      columns: [
        {
          name: 'username',
          required: true,
          label: 'Username',
          align: 'center',
          field: row => row.username,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'name', align: 'center', label: 'Name', field: 'name' },
        { name: 'surname', align: 'center', label: 'Surname', field: 'surname', sortable: true },
        { name: 'email', align: 'center', label: 'Email', field: 'email' },
        { name: 'permissions', align: 'center', label: 'Permissions', field: 'permissions' },
        { name: 'edit', align: 'center', label: 'Edit user', field: 'edit' },
        { name: 'delete', align: 'center', label: 'Delete user', field: 'delete' }
      ]
    }
  },
  mounted () {
    this.fetchUsers()
    this.loading = true
    this.showUsers()
  },
  methods: {
    ...mapGetters('user', [
      'getUsers'
    ]),
    ...mapActions('user', [
      'fetchUsers',
      'postUser',
      'deleteUser'
    ]),
    sendApi () {
      this.postUser(this.newUser)
      this.onReset()
    },
    deleteFunction (id) {
      this.deleteUser(id)
      this.loading = true
      this.showUsers()
      this.$q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'delete',
        message: 'User deleted.',
        position: 'top-right'
      })
    },
    showUsers () {
      setTimeout(() => {
        var users = this.getUsers()
        this.allUsers = this.usersToArray(users)
        console.log(this.allUsers)
        this.loading = false
      }, 1000)
    },
    usersToArray (users) {
      var data = []
      for (var user in users) {
        data.push(users[user])
      }
      console.log(data)
      return data
    },
    onSubmit () {
      var alreadyExists = false
      for (var user in this.users) {
        if (this.newUser.username === this.users[user].username) {
          alreadyExists = true
          this.error = 'User with the username "' + this.newUser.username + '" already exists.'
        }
      }
      if (!alreadyExists) {
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'User added.',
          position: 'top-right'
        })
        this.error = ''
        this.sendApi()
        this.addUser = false
        this.loading = true
        this.showUsers()
      }
    },
    onReset () {
      this.newUser.name = ''
      this.newUser.surname = ''
      this.newUser.email = ''
      this.newUser.username = ''
      this.newUser.password = ''
      this.newUser.permissions = null
      this.error = ''
    }
  }
}
</script>
