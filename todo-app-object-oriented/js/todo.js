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
        this.appendTodos();
    }

    render() {
        // todo list html template
        const htmlTemplate = /*html*/`
            <section class="todoListContainer">
                <ol class="todoList"></ol>
                <form action="#">
                    <input class="todoTextInput" placeholder="Type new todo">
                    <button type="button">Add</button>
                </form>
            </section>
        `;
        this.domElement.innerHTML = htmlTemplate; // add to DOM

        // attach on click event to add button
        this.domElement.querySelector("button").onclick = () => {
            const text = this.domElement.querySelector(".todoTextInput").value;
            this.add(text);
        }
    }

    appendTodos() {
        let todoList = "";

        for (const todo of this.todos) {
            todoList += /*html*/ `
            <li>${todo.text}</li>
            `;
        }
        this.domElement.querySelector(".todoList").innerHTML = todoList;
    }

    add(text) {
        const newTodo = {
            text: text
        }
        this.todos.push(newTodo);
        this.appendTodos();
    }
}

export default Todo;

