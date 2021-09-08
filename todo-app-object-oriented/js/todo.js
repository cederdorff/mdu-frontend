class Todo {
    constructor(domElement) {
        this.todos = [{
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
        this.domElement = domElement;
        this.render();

    }

    render() {
        let todoList = "";

        for (const todo of this.todos) {
            todoList += /*html*/ `
            <li>${todo.text}</li>
            `;
        }
        const htmlTemplate = /*html*/`
            <ol id="todoList">${todoList}</ol>
            <form>
                <input id="newTodoText" placeholder="Type new todo">
                <button type="button" onclick="addTodo()">Add</button>
            </form>
        `;
        this.domElement.insertAdjacentHTML("beforeend", htmlTemplate);
    }

    add(text) {
        const newTodo = {
            text: text
        }
        this.todos.push(newTodo);
        this.append();
    }
}

export default Todo;