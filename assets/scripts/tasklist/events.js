'include strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('../ui')

const onNewTask = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.newTask(data)
    .then(ui.newTaskSuccess)
    .catch(ui.newTaskError)
}

const onGetTasks = () => {
  event.preventDefault()
  api.getTasks()
    .then(ui.getTasksSuccess)
    .catch(ui.getTasksError)
}

const addHandlers = () => {
  $('.add-task').on('submit', onNewTask)
}

module.exports = {
  addHandlers,
  onGetTasks
}
