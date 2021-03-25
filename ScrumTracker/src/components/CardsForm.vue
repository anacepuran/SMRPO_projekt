<template>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md">
        <q-input
            filled
            v-model="newCard.card_name"
            label="Card name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
        <q-input
            filled
            v-model="newCard.description"
            label="Card description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
        <q-select
            filled
            v-model="newCard.priority"
            :options="priority_options"
            label="Priority"
            style="width: 250px"
        />
        <q-input
            filled
            v-model="newCard.acceptance_test"
            label="Acceptance test"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
        <q-card-actions horizontal align="right">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
    </q-form>
</template>

<script>
export default {
  name: 'CardForm',
  data () {
    return {
      newCard: {
        sprint_id: '',
        card_name: '',
        description: '',
        acceptance_test: '',
        priority: '',
        value: '',
        subtasks: '',
        round: '' // to do / in progress / done / test
      },
      priority_options: ['Must have', 'Could have', 'Should have', 'Won\'t have this time']
    }
  }
}
</script>
