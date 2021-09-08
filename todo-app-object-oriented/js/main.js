import Todo from "./todo.js";

const list = document.querySelector("#app");
const todoList = new Todo(list);

window.addTodo = () => {
    const text = document.querySelector("#newTodoText").value
    todoList.add(text);
}