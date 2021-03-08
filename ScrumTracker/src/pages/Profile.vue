<template>
    <q-page class="q-ma-lg window-width">
        <q-card class="q-ma-lg" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-ma-md">
                <div class="text-overline">Profile</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ user.username }}</div>
                <div class="text-caption text-grey">
                  {{ user.name }} {{ user.surname }}
                </div>
              </q-card-section>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <div class="text-overline q-ma-md">Last login: {{ user.last_login }}</div>
              <q-space/>
              <q-btn class="q-ma-md" color="primary" label="Edit profile" />
              <q-btn class="q-ma-md" color="primary" label="Change password" />
            </q-card-actions>
          </q-card>
          <q-card class="q-ma-lg">
            <q-list  bordered separator>
                <q-item v-for="project in projects" :key="project.name" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ project.name }}</q-item-label>
                    <q-item-label caption>{{ project.caption }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
          </q-card>
    </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Users',
  data () {
    return {
      user: {},
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
      'updateUser'
    ])
  },
  mounted () {
    this.user = this.getCurrentUser()
    console.log(this.user)
  }
}
</script>
<style></style>
