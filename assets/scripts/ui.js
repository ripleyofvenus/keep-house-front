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
  $('.edit-task-btn').on('click', onEditTask)
}

const clearTable = function () {
  $('.table-body').html('')
}

const newTaskSuccess = () => {
  $('#tasklist').trigger('reset')
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
  $('.table-body').append(showTasksHtml)
  $('.delete-task-btn').on('click', onDeleteTask)
  $('.edit-task-btn').on('click', function (event) {
    // $('.delete-task-btn').hide()
  })
    .on('click', onEditTask)
}

const getTasksError = () => {
  console.log('get tasks error')
}

const onDeleteTask = (event) => {
  const selectTaskId = $(event.target).parent().parent().data('id')
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

const onEditTask = (event) => {
  const selectTaskId = $(event.target).parent().parent().data('id')
  console.log(selectTaskId)
  const taskField = $(event.target).parent().siblings()[0]
  const notesField = $(event.target).parent().siblings()[1]
  taskField.contentEditable = true
  notesField.contentEditable = true
  $(taskField).css('background-color', 'rgb(255,255,65)')
  $(notesField).css('background-color', 'rgb(255,255,65)')
  $(event.target).replaceWith('<button class="btn btn-info confirm-task-btn">Confirm</button>')
  // $('.confirm-task-btn').on('click', onConfirmTask)
  // console.log(event.target)
  // console.log('made it to edit task')
  $('.confirm-task-btn').on('click', function () {
    onConfirmTask(selectTaskId, taskField, notesField)
    console.log('confirm task button')
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
  console.log(data)
  taskApi.editTask(selectTaskId, data)
    .then(onEditTaskSuccess)
    .catch(onEditTaskFailure)
}

const onEditTaskSuccess = function () {
  console.log('task updated')
  clearTable()
  taskApi.getTasks()
    .then(getTasksSuccess)
    .catch(getTasksError)
}

const onEditTaskFailure = function () {
  console.log('task not updated')
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
