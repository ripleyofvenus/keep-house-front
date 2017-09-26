'use strict'

const store = require('./store.js')
const taskApi = require('./tasklist/api')
const showTasksTemplate = require('./templates/tasks.handlebars')

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

const newTaskSuccess = () => {
  console.log('new task success')
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
  getTasksError
}
