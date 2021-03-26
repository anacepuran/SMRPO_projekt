export function fetchSprint ({ commit }) {
  this.$axios.get('sprints/get')
    .then((res) => {
      commit('SET_SPRINT', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
export function postSprint ({ commit }, payload) {
  console.log(payload)
  this.$axios.post('sprints/add', {
    name: payload.name,
    project_id: payload.project_id,
    start_date: payload.startdate,
    end_date: payload.enddate,
    expected_time: payload.expectedtime
  })
    .then((res) => {
      commit('PUSH_NEW_SPRINT', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export function updateSprint ({ commit }, payload) {
  this.$axios.put('sprints/update', {
    name: payload.name,
    users: payload.users,
    deadline: payload.deadline,
    _id: payload._id
  })
    .then((res) => {
      commit('PUSH_NEW_SPRINT', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
export function deleteSprint ({ commit }, id) {
  commit('DELETE_SPRINT', id)
  this.$axios.delete('sprints/delete', { data: { _id: id } })
    .then(response => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}
