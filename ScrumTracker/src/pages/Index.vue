<template>
  <q-page class="q-ma-md column flex flex-center" width="100%">
    <div class="q-ma-md row">
      <q-input class="row" v-model="newUser.username" label="Username" />
    </div>
    <div class="row">
      <q-input class="row" v-model="newUser.password" label="Password" />
    </div>
    <div class="row q-ma-md">
      <q-btn color="primary" size="md" label="ADD USER" @click="sendApi"/>
    </div>
    <div class="row">
      <q-btn class="row" color="primary" size="md" @click="showUsersFunction" label="GET ALL USERS" />
    </div>
    <q-list class="q-pa-md row flex flex-center" v-if="showUsers==true" style="align-items: center;" width="70%">
      <q-item v-for="user in users" :key="user.username" class="col-8">
        <q-item-section>
          {{ user.username }} {{ user.password }}
        </q-item-section>
        <q-item-section>
          <q-btn style="width: 20vh" color="primary" size="sm" label="DELETE USER" @click="deleteApi(user._id)" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      show: false,
      apiResult: '',
      newUser: {
        username: '',
        password: ''
      },
      showUsers: false,
      users: [],
      msg: '',
      msg_2: ''
    }
  },
  mounted () {
    this.fetchUsers()
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
    showUsersFunction () {
      this.users = this.getUsers()
      this.showUsers = true
    },
    sendApi () {
      this.postUser(this.newUser)
      this.newUser.username = ''
      this.newUser.password = ''
    },
    deleteApi (id) {
      this.deleteUser(id)
    }
  }
}
</script>
