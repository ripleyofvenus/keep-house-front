'use strict'
const config = require('./../config')
const store = require('./../store')

const signUp = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data: data
  })
}

const signOut = function () {
  console.log('sign out ajax')
  console.log(store.userData.id)
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.userData.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.userData.token
    }
  })
}

const changePassword = function (data) {
  console.log('change password')
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.userData.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.userData.token
    },
    data: data
  })
}
module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword
}
