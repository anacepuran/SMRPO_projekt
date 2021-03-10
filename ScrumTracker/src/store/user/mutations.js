export function SET_CURRENT_USER (state, loggedUser) {
  state.currentUser = loggedUser
  console.log('mutation')
  console.log(state.currentUser)
}
export function SET_LOGGED_OUT (state, fetchedUsers) {
  state.currentUser = null
}
export function SET_USERS (state, fetchedUsers) {
  state.users = fetchedUsers
}
export function PUSH_NEW_USER (state, newUser) {
  var pushUser = {
    _id: newUser._id,
    name: newUser.name,
    surname: newUser.surname,
    email: newUser.email,
    username: newUser.username,
    permissions: newUser.permissions,
    last_login: newUser.last_login
  }
  state.users[newUser._id] = pushUser
  if (state.currentUser._id === newUser._id) {
    state.currentUser = newUser
  }
}
export function DELETE_USER (state, userId) {
  delete state.users[userId]
}
