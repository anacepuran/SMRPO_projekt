<template>
  <div>
    {{ card.subtasks }}
  </div>
</template>

<script>
export default {
  name: 'UserStoryTasks',
  props: {
    card: {
      type: Object
    }
  }
}
</script>
