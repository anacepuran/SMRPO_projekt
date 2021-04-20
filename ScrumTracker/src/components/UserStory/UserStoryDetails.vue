<template>
  <div>
    <q-card-section class="q-pt-sm q-mt-md q-mb-md">
      <div class="row">
        <div class="col text-body1">
          {{ card.description }}
        </div>
        <q-space/>
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col"  v-if="card.past_expected_time !== ''">
          <div class="text-grey">
            <span class="material-icons text-h4 text-secondary">history</span>
            <span class="text-weight-bolder text-h6 text-black"> {{ card.past_expected_time }}</span>
            <span v-if="card.past_expected_time > 1" class="text-p text-black"> points</span>
            <span v-if="card.past_expected_time == 1" class="text-p text-black"> point</span>
          </div>
        </div>
        <div class="col"  v-if="card.expected_time !== ''">
          <div>
            <span class="material-icons text-h4 text-secondary">schedule</span>
            <span class="text-weight-bolder text-h6 text-black"> {{ card.expected_time }}</span>
            <span v-if="card.expected_time > 1" class="text-p text-black"> points</span>
            <span v-if="card.expected_time == 1" class="text-p text-black"> point</span>
          </div>
        </div>
        <div class="col">
          <div class="text-overline text-secondary">
            VALUE:<span class="text-weight-bolder text-h6 text-black">{{ card.value }}</span>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <div class="row items-center no-wrap" v-if="card.acceptance_test === ''  || card.acceptance_test.length !== 0">
        <div class="col">
          <div class="text-overline text-secondary">ACCEPTANCE TESTS:</div>
            <div v-for="(test, index) in card.acceptance_test" v-bind:key="index"><span class="material-icons text-h6">tag</span>{{test}}</div>
        </div>
      </div>
    </q-card-section>
    <q-separator/>
    <div class="row items-center no-wrap q-ma-md" v-if="card.comment !== ''">
      <div class="col text-overline">
        <span class="text-black">PROJECT OWNER'S COMMENT: </span>
        <span class="text-caption">{{ card.comment }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserStoryDetails',
  props: {
    card: {
      type: Object
    },
    project: {
      type: Object
    }
  }
}
</script>
