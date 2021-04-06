<template>
  <div>
    <q-card square flat bordered class="cursor-move bg-white">
      <q-card-section class="row bg-secondary q-pa-s">
        <span class="text-white text-overline">{{card.card_name}}</span>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col">
              <div><span class="material-icons text-h6 text-secondary">description</span> {{ card.description }}</div>
          </div>
        </div>
        </q-card-section>

      </q-card>
  </div>
</template>

<script>
export default {
  name: 'CardSprint',
  props: {
    card: {
      type: Object
    }
  }
}
</script>
