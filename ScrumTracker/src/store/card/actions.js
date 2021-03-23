export function fetchCard ({ commit }) {
  this.$axios.get('cards/get')
    .then((res) => {
      commit('SET_CARD', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
export function postCard ({ commit }, payload) {
  this.$axios.post('cards/add', {
    card_name: payload.card_name,
    description: payload.description,
    acceptance_test: payload.acceptance_test,
    priority: payload.priority,
    subtasks: payload.subtasks,
    value: payload.value
  })
    .then((res) => {
      commit('PUSH_NEW_CARD', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export function updateCard ({ commit }, payload) {
  this.$axios.put('cards/update', {
    card_name: payload.card_name,
    description: payload.description,
    acceptance_test: payload.acceptance_test,
    priority: payload.priority,
    subtasks: payload.subtasks,
    value: payload.value
  })
    .then((res) => {
      commit('PUSH_NEW_CARD', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
export function deleteCard ({ commit }, id) {
  commit('DELETE_CARD', id)
  this.$axios.delete('cards/delete', { data: { _id: id } })
    .then(response => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}