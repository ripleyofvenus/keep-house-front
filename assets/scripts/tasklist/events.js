'include strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('../ui')
// const list = require('./list')
// const store = require('../store')

const onNewTask = function (event) {
  console.log('WHAT')
  event.preventDefault()
  const data = getFormFields(this)
  console.log('you clicked add button')
  console.log(data)
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
  $('#tasklist').on('submit', onNewTask)
}

module.exports = {
  addHandlers,
  onGetTasks
}
