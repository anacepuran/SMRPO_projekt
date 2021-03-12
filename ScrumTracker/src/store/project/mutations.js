export function SET_PROJECTS (state, fetchedProjects) {
  state.projects = fetchedProjects
}
export function PUSH_NEW_PROJECT (state, newProject) {
  var pushProject = {
    _id: newProject._id,
    name: newProject.name,
    users: newProject.users,
    deadline: newProject.deadline
  }
  state.projects[newProject._id] = pushProject
}
export function DELETE_PROJECT (state, projectId) {
  delete state.projects[projectId]
}
