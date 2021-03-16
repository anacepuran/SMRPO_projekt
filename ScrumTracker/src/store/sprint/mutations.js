export function SET_SPRINT (state, fetchedProjects) {
  state.sprints = fetchedProjects
}
export function PUSH_NEW_SPRINT (state, newProject) {
  var pushProject = {
    name: newProject.name,
    project_id: newProject.id,
    start_date: newProject.startdate,
    end_date: newProject.enddate,
    expected_time: newProject.expectedtime
  }
  state.sprints[newProject._id] = pushProject
}
export function DELETE_SPRINT (state, projectId) {
  delete state.sprints[projectId]
}
