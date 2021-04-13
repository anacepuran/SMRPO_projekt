// USER LOGIN AND LOGOUT

export function Login ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    this.$axios.post('/users/authenticate', {
      username: payload.username,
      password: payload.password
    })
      .then(result => {
        console.log(result)
        commit('SET_CURRENT_USER', result.data)
        resolve()
      })
      .catch(error => {
        reject()
        throw new Error(`API ${error}`)
      })
  })
}
export function Logout ({ commit }) {
  commit('SET_LOGGED_OUT')
  this.$router.push({ path: '/' })
}

// USER METHODS

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
  this.$axios.post('users/add', {
    name: payload.name,
    surname: payload.surname,
    email: payload.email,
    username: payload.username,
    password: payload.password,
    permissions: payload.permissions,
    tasks: payload.tasks,
    last_login: 'User has not yet logged in.',
    this_login: 'User has not yet logged in.'
  })
    .then((res) => {
      commit('PUSH_NEW_USER', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export function updateUser ({ commit }, payload) {
  this.$axios.post('/users/update', {
    name: payload.name,
    surname: payload.surname,
    email: payload.email,
    username: payload.username,
    password: payload.password,
    permissions: payload.permissions,
    tasks: payload.tasks,
    last_login: payload.last_login,
    this_login: payload.this_login,
    _id: payload._id
  })
    .then((res) => {
      console.log(res.data)
      commit('PUSH_NEW_USER', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export function updateUserTasks ({ commit }, payload) {
  this.$axios.post('/users/updateTasks', {
    tasks: payload.tasks,
    _id: payload._id
  })
    .then((res) => {
      console.log(res.data)
      commit('PUSH_NEW_USER', res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export function deleteUser ({ commit }, id) {
  commit('DELETE_USER', id)
  this.$axios.delete('users/delete', { data: { _id: id } })
    .then(response => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}

export function updateCurrentUser ({ commit }, user) {
  console.log('update current user')
  commit('SET_CURRENT_USER', user)
}
