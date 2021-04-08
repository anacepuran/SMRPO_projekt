export function SET_SPRINT (state, fetchedProjects) {
  state.sprints = fetchedProjects
}
export function PUSH_NEW_SPRINT (state, newSprint) {
  var pushSprint = {
    name: newSprint.name,
    project_id: newSprint.project_id,
    start_date: newSprint.start_date,
    end_date: newSprint.end_date,
    expected_time: newSprint.expected_time,
    _id: newSprint._id
  }
  state.sprints[newSprint._id] = pushSprint
}
export function DELETE_SPRINT (state, projectId) {
  delete state.sprints[projectId]
}
