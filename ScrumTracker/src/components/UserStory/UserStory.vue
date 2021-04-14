<template>
  <div>
    <q-tabs v-model="tab" inline-label class="text-primary shadow-2">
      <q-tab name="details" icon="info" label="Details"/>
      <q-tab name="subtasks" icon="task" label="Tasks"/>
      <q-space/>
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="details">
        <UserStoryDetails :card="this.card"/>
      </q-tab-panel>
      <q-tab-panel name="subtasks">
        <UserStoryTasks :card="this.card"/>
      </q-tab-panel>
    </q-tab-panels>
  <div>
  </div>
  </div>
</template>

<script>
import UserStoryDetails from 'components/UserStory/UserStoryDetails.vue'
import UserStoryTasks from 'components/UserStory/UserStoryTasks.vue'

export default {
  name: 'Card',
  components: { UserStoryDetails, UserStoryTasks },
  props: {
    card: {
      type: Object
    }
  },
  data () {
    return {
      tab: 'details'
    }
  }
}
</script>
