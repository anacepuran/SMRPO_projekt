<template>
  <div class="text-black" style="width:100%">
    <q-card-section>
      <div v-if="card.subtasks !== '' || card.subtasks.length !== 0">
      <q-table
        class="q-pa-lg"
        :data="card.subtasks"
        :columns="columns"
        virtual-scroll
        :rows-per-page-options="[0]"
        hide-bottom
        style="box-shadow: none">
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body-cell-status="propsStatus">
          <q-td :props="propsStatus">
            <div>
              <span v-if="propsStatus.row.done === true" class="text-teal">DONE</span>
              <span v-if="propsStatus.row.done !== true" class="text-blue-4">ACTIVE</span>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-name="propsName">
          <q-td :props="propsName" class="text-caption" style="font-size:13px">
            {{propsName.row.subtask_name}}
          </q-td>
        </template>
        <template v-slot:body-cell-time="propsTime">
          <q-td :props="propsTime">
            {{ propsTime.row.subtask_time }}h
          </q-td>
        </template>
      </q-table>
    </div>
    <div v-if="card.subtasks === '' || card.subtasks.length === 0" class="text-overline text-center" style="font-size:13px">
      There are no tasks in this user story.
    </div>
    </q-card-section>
    <q-card-section>
      <q-input
          filled
          placeholder="Add comment only for rejected story"
          type="textarea"
          v-model="rejectedComment"
          class="q-ml-lg q-mr-lg"
          :rows="1"/>
    </q-card-section>
    <q-card-actions horizontal align="right">
      <q-btn flat label="Accept" color="teal" v-close-popup @click="acceptUserStory()"/>
      <q-btn flat label="Reject" color="red-4" v-close-popup @click="rejectUserStory()"/>
    </q-card-actions>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AcceptReject',
  props: {
    card: {
      type: Object
    },
    project: {
      type: Object
    }
  },
  data () {
    return {
      rejectedComment: '',
      columns: [
        { name: 'status', align: 'center', label: 'Status' },
        { name: 'name', required: true, label: 'Name', align: 'center', field: 'name' },
        { name: 'time', required: true, align: 'center', label: 'Time expected', field: 'time' }
      ]
    }
  },
  methods: {
    ...mapActions('card', [
      'updateCard'
    ]),
    acceptUserStory () {
      this.submitMessage = 'User story accepted.'
      this.card.card_round = 'DONE'
      this.card.comment = ''
      this.updateCard(this.card)
      console.log(this.card)
      this.$q.notify({
        color: 'green',
        textColor: 'white',
        icon: 'cloud_done',
        message: this.submitMessage,
        position: 'top-right',
        timeout: 1000
      })
    },
    rejectUserStory () {
      this.submitMessage = 'User story rejected.'
      this.card.card_round = 'PRODUCT BACKLOG'
      this.card.sprint_id = ''
      this.card.past_expected_time = this.card.expected_time
      this.card.expected_time = ''
      this.card.comment = this.rejectedComment
      console.log(this.card)
      this.updateCard(this.card)
      this.$q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'cloud_off',
        message: this.submitMessage,
        position: 'top-right',
        timeout: 1000
      })
    }
  }
}
</script>
