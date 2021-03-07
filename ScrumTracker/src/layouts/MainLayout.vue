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
        <!--<q-btn round class="q-ma-md" icon="person" color="secondary" @click="dropdownProfile" />-->
        <q-btn-dropdown
          rounded
          class="q-ma-md"
          color="white"
          no-icon-animation
          dropdown-icon="person"
          size="md"
          text-color="primary"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
              <q-avatar size="64px" icon="person" color="primary" text-color="white"/>
              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ currentUser }}</div>
              <hr style="color:primary; width: 100%" />
              <q-btn
                flat
                color="primary"
                label="Edit profile"
                @click="$router.push('/profile')"
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
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
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
import EssentialLink from 'components/EssentialLink.vue'
import { mapGetters, mapActions } from 'vuex'
const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed: {
    currentUser () {
      var currentUser = this.getCurrentUser()
      console.log(currentUser)
      return currentUser
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
