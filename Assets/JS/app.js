const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");
const filterOption = document.querySelector(".filter__todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener("click", filterTodo);


function addTodo(event) {
    event.preventDefault();
    // Div for td
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo__item");
    todoDiv.appendChild(newTodo);
    //Add TD to localstorage
    saveLocalTodos(todoInput.value);
    //Check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("complete__button");
    todoDiv.appendChild(completedButton);
    //Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';
    deleteButton.classList.add("delete__button");
    todoDiv.appendChild(deleteButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear input

    todoInput.value = "";
}


function deleteCheck(e) {
    const item = e.target;

    //Delete for TD
    if (item.classList[0] === "delete__button") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }
    //Complete for TD
    if (item.classList[0] === "complete__button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

// Filter func
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        if (todo.classList !== undefined) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                default:
                    break;
            }
        }
        return;
    });
}

//Creating LocalStorage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos)); //saving items
}

//Showing items from storage
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo__item");
        todoDiv.appendChild(newTodo);
        //Check button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"> </i>';
        completedButton.classList.add("complete__button");
        todoDiv.appendChild(completedButton);
        //Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';
        deleteButton.classList.add("delete__button");
        todoDiv.appendChild(deleteButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });
}

// Remove items from local Storage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}