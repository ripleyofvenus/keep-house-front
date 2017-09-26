'use strict'

const store = require('./store.js')
const taskApi = require('./tasklist/api')
const showTasksTemplate = require('./templates/tasks.handlebars')
const config = require('./config')

// Auth Ui

const signUpSuccess = (data) => {
  console.log('sign up success')
  $('#sign-up').trigger('reset')
}

const signUpFailure = () => {
  console.log('sign up failure')
}

const signInSuccess = (data) => {
  console.log('sign in success')
  store.userData = data.user
  $('#sign-in').trigger('reset')
  taskApi.getTasks()
    .then(getTasksSuccess)
    .catch(getTasksError)
}

const signInFailure = () => {
  console.log('sign in failure')
}

const signOutSuccess = (data) => {
  console.log('sign out success')
  store.userData = null
  clearTable()
}

const changePasswordSuccess = () => {
  console.log('change password success')
}

const changePasswordFail = () => {
  console.log('change password failure')
}

// task events
const addHandlers = () => {
  $('.delete-task-btn').on('click', onDeleteTask)
}

const clearTable = function () {
  $('.table-body').html('')
}

const newTaskSuccess = () => {
  clearTable()
  taskApi.getTasks()
    .then(getTasksSuccess)
    .catch(getTasksError)
}

const newTaskError = () => {
  console.log('new task fail')
}

const getTasksSuccess = (data) => {
  console.log('get tasks success')
  const showTasksHtml = showTasksTemplate({ tasks: data.tasks })
  console.log(showTasksHtml)
  $('.table-body').append(showTasksHtml)
  $('.delete-task-btn').on('click', onDeleteTask)
}

const getTasksError = () => {
  console.log('get tasks error')
}

const onDeleteTask = (event) => {
  const selectTaskId = $(event.target).parent().parent().data('id')
  console.log(selectTaskId)
  taskApi.deleteTask(selectTaskId)
    .then(deleteTaskSuccess)
    .catch(deleteTaskError)
}

const deleteTaskSuccess = () => {
  console.log('task deleted')
  clearTable()
  taskApi.getTasks()
    .then(getTasksSuccess)
    .catch(getTasksError)
}

const deleteTaskError = () => {
  console.log('task not deleted')
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
  deleteTaskError
}
