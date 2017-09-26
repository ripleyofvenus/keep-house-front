'include strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('../ui')
// const store = require('../store')
// const list = require('./list')

const onNewTask = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // const userId = store.userData.id
  console.log('you clicked add button')
  api.newTask(data)
    .then(ui.newTaskSuccess)
    .catch(ui.newTaskError)
}

const onGetTasks = () => {
  event.preventDefault()
  console.log('onGetTask')
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
