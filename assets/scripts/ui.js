'use strict'

const store = require('./store.js')
const taskApi = require('./tasklist/api')
const showTasksTemplate = require('./templates/tasks.handlebars')

// Auth Ui

const signUpSuccess = (data) => {
  $('#alert-div').html('<p>sign up success<p>')
  $('#alert-div').show()
  $('#alert-div').removeClass('hidden')
  $('#alert-div').addClass('alert-success')
  $('#alert-div').removeClass('alert-danger')
  $('#alert-div').delay(2000).fadeOut('2000')
  $('#sign-up').trigger('reset')
}

const signUpFailure = () => {
  $('#alert-div').html('<p>Something went wrong... try again?<p>')
  $('#alert-div').show()
  $('#alert-div').removeClass('hidden')
  $('#alert-div').addClass('alert-danger')
  $('#alert-div').removeClass('alert-success')
  $('#alert-div').delay(2000).fadeOut('2000')
  $('#sign-up').trigger('reset')
}

const signInSuccess = (data) => {
  store.userData = data.user
  $('#app-alert-div').html('<p>sign in success<p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-success')
  $('#app-alert-div').removeClass('alert-danger')
  $('#app-alert-div').delay(2000).fadeOut('2000')
  $('#sign-in').trigger('reset')
  $('.landing-page').hide()
  $('.app-page').show()
  taskApi.getTasks()
    .then(getTasksSuccess)
    .catch(getTasksError)
}

const signInFailure = () => {
  $('#alert-div').html('<p>Something went wrong... try again?<p>')
  $('#alert-div').show()
  $('#alert-div').removeClass('hidden')
  $('#alert-div').addClass('alert-danger')
  $('#alert-div').removeClass('alert-success')
  $('#alert-div').delay(2000).fadeOut('2000')
  $('#sign-in').trigger('reset')
}

const signOutSuccess = (data) => {
  store.userData = null
  $('#alert-div').html('<p>Signed Out<p>')
  $('#alert-div').show()
  $('#alert-div').removeClass('hidden')
  $('#alert-div').addClass('alert-success')
  $('#alert-div').removeClass('alert-danger')
  $('#alert-div').delay(2000).fadeOut('2000')
  $('#tasklist').trigger('reset')
  clearTable()
  $('.landing-page').show()
  $('.app-page').hide()
}

const changePasswordSuccess = () => {
  $('#app-alert-div').html('<p>Password Updated<p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-success')
  $('#app-alert-div').removeClass('alert-danger')
  $('#app-alert-div').delay(2000).fadeOut('2000')
  $('#change-password').trigger('reset')
}

const changePasswordFail = () => {
  $('#app-alert-div').html('<p>Something went wrong... try again?<p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
  $('#change-password').trigger('reset')
}

// task events
const addHandlers = () => {
  $('.delete-task-btn').on('click', onDeleteTask)
  $('.edit-task-btn').on('click', onEditTask)
}

const clearTable = function () {
  $('.table-body').html('')
}

const newTaskSuccess = () => {
  $('#app-alert-div').html('<p>Locked and Loaded<p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-success')
  $('#app-alert-div').removeClass('alert-danger')
  $('#app-alert-div').delay(2000).fadeOut('2000')
  $('#tasklist').trigger('reset')
  clearTable()
  taskApi.getTasks()
    .then(getTasksSuccess)
    .catch(getTasksError)
}

const newTaskError = () => {
  $('#app-alert-div').html('<p>Did Not Create Task<p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
}

const getTasksSuccess = (data) => {
  const showTasksHtml = showTasksTemplate({ tasks: data.tasks })
  $('.table-body').append(showTasksHtml)
  $('.delete-task-btn').on('click', onDeleteTask)
  $('.edit-task-btn').on('click', function (event) {
  })
    .on('click', onEditTask)
}

const getTasksError = () => {
  $('#app-alert-div').html('<p>Something went wrong... did not retrieve tasks<p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
}

const onDeleteTask = (event) => {
  const selectTaskId = $(event.target).parent().parent().data('id')
  taskApi.deleteTask(selectTaskId)
    .then(deleteTaskSuccess)
    .catch(deleteTaskError)
}

const deleteTaskSuccess = () => {
  $('#app-alert-div').html('<p>Task Deleted<p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-success')
  $('#app-alert-div').removeClass('alert-danger')
  $('#app-alert-div').delay(2000).fadeOut('2000')
  clearTable()
  taskApi.getTasks()
    .then(getTasksSuccess)
    .catch(getTasksError)
}

const deleteTaskError = () => {
  $('#app-alert-div').html('<p>Something went wrong... did not delete tasks<p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
}

const onEditTask = (event) => {
  const selectTaskId = $(event.target).parent().parent().data('id')
  const taskField = $(event.target).parent().siblings()[0]
  const notesField = $(event.target).parent().siblings()[1]
  taskField.contentEditable = true
  notesField.contentEditable = true
  $(taskField).css('background-color', 'rgb(255,255,65)')
  $(notesField).css('background-color', 'rgb(255,255,65)')
  $(event.target).replaceWith('<button class="btn btn-info confirm-task-btn">Confirm</button>')
  $('.confirm-task-btn').on('click', function () {
    onConfirmTask(selectTaskId, taskField, notesField)
  })
}

const onConfirmTask = function (selectTaskId, taskField, notesField) {
  const newTask = $(taskField).html()
  const newNote = $(notesField).html()
  const data =
  {
    task: {
      task: newTask,
      notes: newNote
    }
  }
  taskApi.editTask(selectTaskId, data)
    .then(onEditTaskSuccess)
    .catch(onEditTaskFailure)
}

const onEditTaskSuccess = function () {
  clearTable()
  $('#app-alert-div').html('<p>Task Updated<p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-success')
  $('#app-alert-div').removeClass('alert-danger')
  $('#app-alert-div').delay(2000).fadeOut('2000')
  taskApi.getTasks()
    .then(getTasksSuccess)
    .catch(getTasksError)
}

const onEditTaskFailure = function () {
  $('#app-alert-div').html('<p>Something went wrong... task not updated<p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  changePasswordSuccess,
  changePasswordFail,
  newTaskSuccess,
  newTaskError,
  getTasksSuccess,
  getTasksError,
  addHandlers,
  onDeleteTask,
  deleteTaskSuccess,
  deleteTaskError,
  onEditTaskSuccess,
  onEditTaskFailure
}
