'use strict'
const config = require('../config')
const store = require('../store')

const newTask = function (data) {
  const token = store.userData.token
  return $.ajax({
    url: config.apiOrigin + '/tasks',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const getTasks = function () {
  const order = $('.order-by').val()
  const token = store.userData.token
  const data = {
    order: order
  }
  return $.ajax({
    url: config.apiOrigin + '/tasks',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const deleteTask = function (id) {
  const token = store.userData.token
  return $.ajax({
    url: config.apiOrigin + '/tasks/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const editTask = function (selectTaskId, data) {
  return $.ajax({
    url: config.apiOrigin + '/tasks/' + selectTaskId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.userData.token
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
