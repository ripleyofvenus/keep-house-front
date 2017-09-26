'use strict'
const config = require('../config')
const store = require('../store')

const newTask = function (data) {
  console.log('new task api')
  return $.ajax({
    url: config.apiOrigin + '/tasks',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getTasks = function () {
  console.log('get tasks api')
  return $.ajax({
    url: config.apiOrigin + '/tasks',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteTask = function (data, taskId) {
  console.log('delete task api')
  return $.ajax({
    url: config.apiOrigin + '/tasks/' + taskId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const editTask = function (data, taskId) {
  console.log('edit task api')
  return $.ajax({
    url: config.apiOrigin + '/tasks/' + taskId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
module.exports = {
  newTask,
  getTasks,
  deleteTask,
  editTask
}
