<template>
  <q-page class="flex flex-center column">
    <div class="row q-ma-md">
      <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
      >
    </div>
    <div class="row q-ma-md">
      <q-btn label="testApi" @click="showApi"/>
    </div>
    <div class="row q-ma-md">
      <p v-if="show==true">{{ apiResult }}</p>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  data () {
    return {
      show: false,
      apiResult: ''
    }
  },
  created () {
    this.fetchApi()
  },
  methods: {
    ...mapGetters('user', [
      'getApi'
    ]),
    ...mapActions('user', [
      'fetchApi'
    ]),
    showApi () {
      this.apiResult = this.getApi()
      this.show = true
    }
  }
}
</script>
