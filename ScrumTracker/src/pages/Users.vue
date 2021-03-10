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
              <q-btn @click="editFunction(propsEdit.row)" size="sm" round color="secondary" icon="create" />
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
        <q-btn color="primary" size="md" label="ADD NEW USER" @click="dialogTitle='Add user'; addUser = true"/>
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
        <q-card-section class="row items-center">
          <div class="text-h6">{{ dialogTitle }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="onReset" v-close-popup />
        </q-card-section>
        <!-- USER FORM COMPONENT -->
        <UserForm :newUser="newUser" :editUser="editUser" @submitUser="showUsers"></UserForm>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserForm from 'components/UserForm.vue'
export default {
  name: 'Users',
  components: { UserForm },
  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },
      newUser: {
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        permissions: null,
        _id: ''
      },
      dialogTitle: '',
      loading: false,
      allUsers: [],
      addUser: false,
      deleteUserId: '',
      confirmDelete: false,
      editUser: false,
      columns: [
        { name: 'username', required: true, label: 'Username', align: 'center', field: row => row.username, sortable: true },
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
      'deleteUser'
    ]),
    deleteFunction (id) {
      this.deleteUser(id)
      this.loading = true
      this.showUsers()
      this.$q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'delete',
        message: 'User deleted.',
        position: 'top-right',
        timeout: 1000
      })
    },
    editFunction (user) {
      this.dialogTitle = 'Edit user'
      this.editUser = true
      this.newUser.name = user.name
      this.newUser.surname = user.surname
      this.newUser.email = user.email
      this.newUser.username = user.username
      this.newUser.password = ''
      this.newUser.permissions = user.permissions
      this.oldUsername = user.username
      this.newUser._id = user._id
      this.addUser = true
    },
    showUsers () {
      this.addUser = false
      this.loading = true
      setTimeout(() => {
        var users = this.getUsers()
        this.allUsers = this.usersToArray(users)
        this.loading = false
      }, 1500)
    },
    usersToArray (users) {
      var data = []
      for (var user in users) {
        data.push(users[user])
      }
      return data
    },
    onReset () {
      this.newUser.name = ''
      this.newUser.surname = ''
      this.newUser.email = ''
      this.newUser.username = ''
      this.newUser.password = ''
      this.newUser.permissions = null
      this.newUser._id = ''
      this.editUser = false
    }
  }
}
</script>
