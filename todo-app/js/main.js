"use strict";

let _todos = [{
    text: "Buy a Mac"
  },
  {
    text: "Learn JavaScript"
  },
  {
    text: "Learn Vue.js "
  },
  {
    text: "Build awesome web apps"
  }
];

function addTodo() {
  let newTodoInput = document.querySelector("#newTodoText");

  let newTodo = {
    text: newTodoInput.value
  };

  _todos.push(newTodo);

  appendTodos(_todos);
}

function appendTodos() {
  let htmlTemplate = "";

  for (const todo of _todos) {
    htmlTemplate += /*html*/ `
      <li>${todo.text}</li>
    `;
  }

  document.querySelector("#todoList").innerHTML = htmlTemplate;
}

appendTodos();