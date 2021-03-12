export function fetchProjects ({ commit }) {
  this.$axios.get('projects/get')
    .then((res) => {
      commit('SET_PROJECTS', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
export function postProject ({ commit }, payload) {
  this.$axios.post('projects/add', {
    name: payload.name,
    users: payload.users,
    deadline: payload.deadline
  })
    .then((res) => {
      commit('PUSH_NEW_PROJECT', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
export function updateProject ({ commit }, payload) {
  this.$axios.put('projects/update', {
    name: payload.name,
    users: payload.users,
    deadline: payload.deadline,
    _id: payload._id
  })
    .then((res) => {
      commit('PUSH_NEW_PROJECT', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
export function deleteProject ({ commit }, id) {
  commit('DELETE_PROJECT', id)
  this.$axios.delete('projects/delete', { data: { _id: id } })
    .then(response => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}
