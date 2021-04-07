<template>
  <q-page class="q-ma-lg window-width">
    <div class="q-pa-md">
      <q-table
        class="q-pa-lg"
        title="Tasks"
        :data="allTasks"
        :columns="columns"
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :loading="loading">
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Tasks',
  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },
      allTasks: {},
      loading: false
    }
  },
  mounted () {
    this.allTasks = this.tasksToArray()
  }
}
</script>
