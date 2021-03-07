<template>
    <div class="bg-primary window-height window-width row justify-center items-center">
      <div class="column">
        <div class="row">
          <q-card class="q-pa-lg shadow-1" style="width:50vh">
            <q-card-section class="row">
                <h5 class="q-my-md">ScrumTracker</h5>
            </q-card-section>
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input square filled clearable v-model="login.username" type="email" label="Username" />
                <q-input square filled clearable v-model="login.password" type="password" label="Password" />
              </q-form>
            </q-card-section>
            <q-card-actions class="q-ma-md">
              <q-btn @click="auth" unelevated color="primary" size="lg" class="full-width" label="Login" />
            </q-card-actions>
            <q-card-section class="text-center">
                <p v-if="error" style="color: red;">{{ errorMessage }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      login: {
        username: '',
        password: ''
      },
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    ...mapActions('user', ['Login']),
    auth () {
      if (this.login.username === '' || this.login.password === '') {
        this.error = true
        this.errorMessage = 'Please provide username and password.'
      } else {
        this.Login({
          username: this.login.username,
          password: this.login.password
        })
          .then((res) => {
            this.$router.push('/home')
          })
          .catch((err) => {
            this.error = true
            this.errorMessage = 'Invalid username or password.'
            throw new Error(`API ${err}`)
          })
      }
    }
  }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Recursive&display=swap');
    h5 {
        font-family: 'Recursive', sans-serif;
    }
</style>
