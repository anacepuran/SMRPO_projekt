<template>
  <q-page class="q-ma-lg window-width">
    <q-card class="q-ma-lg" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-ma-md">
          <div class="text-overline">Profile</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ user.username }}</div>
          <div class="text-caption">
            {{ user.name }} {{ user.surname }}
          </div>
          <div class="text-caption">
            {{ user.email }}
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <div class="text-overline q-ma-md">Last login: {{ user.last_login }}</div>
        <q-space/>
        <q-btn class="q-ma-md" color="primary" label="Edit profile" @click="editUserData=true" />
      </q-card-actions>
    </q-card>
    <q-card class="q-ma-lg">
      <q-card-section class="bg-secondary" >
        <div class="text-white text-h6">My projects</div>
      </q-card-section>
      <q-list  bordered separator>
          <q-item v-for="project in projects" :key="project.name" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ project.name }}</q-item-label>
              <q-item-label caption>{{ project.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
    </q-card>
    <q-dialog v-model="editUserData">
      <q-card class="q-pa-md" style="width: 80vh">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ dialogTitle }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <!-- USER FORM COMPONENT -->
        <UserForm :newUser="user" :editUser="editUserData" @submitUser="updateProfileInfo()"></UserForm>
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
      user: {},
      editUserData: false,
      dialogTitle: 'Edit your profile information',
      projects: [
        {
          name: 'Project 1',
          description: 'Project 1'
        },
        {
          name: 'Project 2',
          description: 'Project 2'
        },
        {
          name: 'Project 3',
          description: 'Project 3'
        }
      ]
    }
  },
  methods: {
    ...mapGetters('user', [
      'getCurrentUser'
    ]),
    ...mapActions('user', [
      'updateUser',
      'updateCurrentUser'
    ]),
    updateProfileInfo () {
      this.editUserData = false
      setTimeout(() => {
        this.user = this.getCurrentUser()
        console.log('updated')
        console.log(this.user)
      }, 1000)
    }
  },
  mounted () {
    this.user = this.getCurrentUser()
    console.log('current')
    console.log(this.user)
  }
}
</script>
<style>
    .text-caption {
        font-size: .9em;
        opacity: .6;
    }
</style>
