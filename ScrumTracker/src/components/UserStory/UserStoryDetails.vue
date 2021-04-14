<template>
  <div>
    {{ card.card_name }}
  </div>
</template>

<script>
export default {
  name: 'UserStoryDetails',
  props: {
    card: {
      type: Object
    }
  }
}
</script>
