pii<template>
  <q-item
    v-if="permissions === '' || this.user.permissions === 'Admin'"
    clickable
    @click = '$router.push(link)'
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MenuLinks',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String
    },
    icon: {
      type: String,
      default: ''
    },
    permissions: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.user = this.getCurrentUser()
  },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    ...mapGetters('user', [
      'getCurrentUser'
    ])
  }
}
</script>
