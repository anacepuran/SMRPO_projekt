<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="title">
          ScrumTracker
        </q-toolbar-title>
        <q-btn-dropdown
          rounded
          flat
          class="q-ma-md"
          no-icon-animation
          dropdown-icon="person"
          size="md"
          text-color="white"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
              <q-avatar size="64px" icon="person" color="primary" text-color="white"/>
              <div class="text-subtitle1 q-mt-md q-mb-xs" v-if="currentUser!==null">{{ currentUser.username }}</div>
              <hr style="color:primary; width: 100%" />
              <q-btn
                flat
                color="primary"
                label="Edit profile"
                @click="$router.replace('/profile')"
                v-close-popup
              />
              <q-btn
                flat
                color="negative"
                label="Logout"
                @click="Logout"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
         MenuLinks
        </q-item-label>
        <MenuLinks
          v-for="link in linksData"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuLinks from 'components/MenuLinks.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  components: { MenuLinks },
  data () {
    return {
      user: {},
      leftDrawerOpen: false,
      linksData: [
        {
          title: 'Projects',
          icon: 'home',
          link: '/home',
          permissions: ''
        },
        {
          title: 'Manage users',
          icon: 'manage_accounts',
          link: '/users',
          permissions: 'Admin'
        },
        {
          title: 'Github',
          icon: 'code',
          link: 'https://github.com/quasarframework',
          permissions: ''
        },
        {
          title: 'Discord Chat Channel',
          icon: 'chat',
          link: 'https://chat.quasar.dev',
          permissions: ''
        }
      ]
    }
  },
  mounted () {
    this.$q.localStorage.set(this.user, this.currentUser)
    this.user = this.$q.localStorage.getItem(this.user)
    this.$q.sessionStorage.set(this.user, this.currentUser)
    this.user = this.$q.sessionStorage.getItem(this.user)
  },
  computed: {
    currentUser () {
      return this.getCurrentUser()
    }
  },
  methods: {
    ...mapGetters('user', [
      'getCurrentUser'
    ]),
    ...mapActions('user', ['Logout'])
  }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Recursive&display=swap');
  .title {
      font-family: 'Recursive', sans-serif;
  }
</style>
