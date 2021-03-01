<template>
  <q-page class="flex flex-center column">
    <q-input v-model="username" label="Username" />
    <q-input v-model="password" label="Password" />
    <div class="row q-ma-md">
      <q-btn label="ADD USER" @click="sendApi"/>
    </div>
    <div class="row q-ma-md">
      <p v-if="show==true">{{ msg }}</p>
    </div>
    <div class="row q-ma-md">
      <ul id="example-1">
        <li v-for="item in msg_2" :key="item._id">
          {{ item.username }}
          {{ item.password }}
          <q-btn size="xs" label="DELETE USER" @click="deleteApi(item._id)"/>
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'PageIndex',
  data () {
    return {
      show: false,
      apiResult: '',
      username: '',
      password: '',
      msg: '',
      msg_2: ''
    }
  },
  beforeMount () {
    this.getApi()
  },
  methods: {
    ...mapGetters('user', [
      'getApi'
    ]),
    ...mapActions('user', [
      'fetchApi'
    ]),
    sendApi () {
      const path = 'http://localhost:5000/users/add'
      const sendData = { username: this.username, password: this.password }
      console.log(sendData)
      axios.post(path, sendData)
        .then((res) => {
          this.msg = res.data
          console.log(this.msg)
          this.msg_2[this.msg._id] = this.msg
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
      this.show = true
      this.username = ''
      this.password = ''
    },
    getApi () {
      const path = 'http://localhost:5000/users/get'
      axios.get(path)
        .then((res) => {
          this.msg_2 = res.data
          console.log(this.msg_2)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    deleteApi (id) {
      const path = 'http://localhost:5000/users/delete'
      console.log(id)
      axios.delete(path, { data: { _id: id } })
        .then(response => {
          console.log(response)
          for (const key of Object.entries(this.msg_2)) {
            if (key[0] === id) {
              const data = {
                ...this.msg_2
              }
              delete data[id]
              this.msg_2 = data
              break
            }
          }
        })
    }
  }
}
</script>
