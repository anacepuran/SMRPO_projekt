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
        <q-item v-for="project in myProjects" :key="project.name" clickable v-ripple @click="$router.push(`/project/${project._id}`)">
          <q-item-section style="width: 3%" class="col-1">
            <q-avatar size="md" color="secondary" text-color="white" icon="folder_open"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="q-ma-sm" style="font-size: 2.2vh">{{ project.name }}</q-item-label>
            <q-item-label class="q-ma-sm" caption>Deadline: {{ project.deadline }}</q-item-label>
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
      projects: []
    }
  },
  computed: {
    myProjects () {
      var allProjects = this.getProjects()
      var myProjects = []
      for (var project in allProjects) {
        for (var user in allProjects[project].users) {
          if (allProjects[project].users[user].user_name === this.user.username) {
            myProjects.push(allProjects[project])
          }
        }
      }
      return myProjects
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
    ...mapGetters('project', [
      'getProjects'
    ]),
    ...mapActions('project', [
      'fetchProjects'
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
    this.fetchProjects()
  }
}
</script>
<style>
    .text-caption {
        font-size: .9em;
        opacity: .6;
    }
</style>
