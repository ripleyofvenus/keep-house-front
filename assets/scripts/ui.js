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
}

const changePasswordSuccess = () => {
  console.log('change password success')
}

const changePasswordFail = () => {
  console.log('change password failure')
}

// task events

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
  $('.table').append(showTasksHtml)
}

const getTasksError = () => {
  console.log('get tasks error')
}

const addHandlers = () => {
  $('.delete-task-btn').on('click', onDeleteTask)
}
const onDeleteTask = () => {
  const selectTaskId = $(this).parent().parent().attr('id')
  console.log(selectTaskId)
  taskApi.deleteTask(selectTaskId)
    .then(deleteTaskSuccess)
    .catch(deleteTaskError)
}

const deleteTaskSuccess = () => {
  console.log('task deleted')
  clearTable()
  taskApi.getSongs()
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
