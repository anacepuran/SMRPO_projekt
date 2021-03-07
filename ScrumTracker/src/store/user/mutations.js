export function SET_CURRENT_USER (state, loggedUser) {
  state.currentUser = loggedUser
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
    username: newUser.username,
    permissions: newUser.permissions
  }
  console.log(pushUser)
  state.users[newUser._id] = pushUser
}
export function DELETE_USER (state, userId) {
  delete state.users[userId]
}
