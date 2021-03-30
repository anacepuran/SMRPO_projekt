<template>
  <div>
    <div v-for="(card, index) in allCards" v-bind:key="index" >
      <q-card square flat bordered class="box-shadow cursor-move bg-white q-mt-xs list-group-item">
        <q-card-section class="row bg-secondary" >
          <span class="text-white text-h6 q-ma-xxs">{{card.card_name}}</span>
          <q-space/>
          <span class="text-white text-capitalize q-ml-xxs right">({{ card.priority }})</span>
        </q-card-section>
        <q-card-section class="q-pt-sm">
            <div class="row items-center no-wrap">
            <div class="col">
                <div><span class="material-icons text-h5 text-secondary">description</span> {{ card.description }}</div>
            </div>
            </div>
            <div class="row items-center no-wrap">
                <div class="col">
                <div class="text-overline text-secondary">
                    VALUE:
                    <span class="text-weight-bolder text-h6 text-black">{{ card.value }}</span>
                </div>
                </div>
            </div>
            <div class="row items-center no-wrap">
                <div class="col">
                <div class="text-overline text-secondary">ACCEPTANCE TESTS:</div>
                <div v-for="(test, index) in card.acceptance_test" v-bind:key="index"><span class="material-icons text-h6">tag</span>{{test}}</div>
                </div>
            </div>
            </q-card-section>
          </q-card>
      </div>
  </div>
</template>

<script>

export default {
  name: 'ShowCards',
  props: {
    allCards: {
      type: Array
    }
  },
  mounted () {
    console.log(this.allCards)
  }
}
</script>
