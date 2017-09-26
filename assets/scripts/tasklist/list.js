// 'use strict'
// const api = require('./tasklist/api')
// // Create an "x" button and append it to each list item
// const userTaskListX = document.tasklist.getElementsByTagName('li')
// let i
// for (i = 0; i < userTaskListX.length; i++) {
//   const span = document.createElement('span')
//   const txt = document.createTextNode('\u00D7')
//   span.className = 'close'
//   span.appendChild(txt)
//   userTaskListX[i].appendChild(span)
// }
//
// // Click on "x" button to delete the current list item
// const close = document.tasklist.getElementsByClassName('close')
// let j
// for (j = 0; j < close.length; j++) {
//   const taskId = $(this).parent().parent().data('id')
//   console.log(taskId)
//   close[j].onclick = function (data) {
//     const content = this.parentElement
//     content.style.display = 'none'
//     api.deleteTask(data, taskId)
//   }
// }
//
// // Add a "checked" symbol when clicking on a list item
// const checked = document.tasklist.querySelector('ul')
// checked.addEventListener('click', function (event) {
//   if (event.target.tagName === 'li') {
//     event.target.classList.toggle('checked')
//   }
// }, false)
//
// // Create a new list item when clicking on the "Add" button
// const newTaskItem = () => {
//   const li = document.taskUL.createElement('li')
//   let inputValue = document.taskUL.getElementById('').value
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";
//
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);
//
//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }
