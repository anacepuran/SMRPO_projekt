export function fetchUsers ({ commit }) {
  this.$axios.get('users/get')
    .then((res) => {
      commit('SET_USERS', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
export function postUser ({ commit }, payload) {
  console.log(payload)
  this.$axios.post('users/add', {
    username: payload.username,
    password: payload.password
  })
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
export function deleteUser ({ commit }, id) {
  this.$axios.delete('users/delete', { data: { _id: id } })
    .then(response => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}
