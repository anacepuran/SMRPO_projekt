export function fetchApi ({ commit }) {
  this.$axios.get('api')
    .then((res) => {
      commit('SET_RESULT', res.data)
    })
}
