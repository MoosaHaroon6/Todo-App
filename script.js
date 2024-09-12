const addInputContainer = document.querySelector('.input-container');
const addInput = document.querySelector('#add-item-input');
const editInputContainer = document.querySelector('.edit-input-container');
const editInput = document.querySelector('#edit-item-input');
const todosContainer = document.querySelector('.all-todos-container');
const todoArr = [];
let editIndex = null;

function addTodo() {
    const addInputValue = addInput.value;
    if (addInputValue.trim()) {
        todoArr.push(addInputValue);
        displayAllTodos();
        addInput.value = '';
    } else {
        displayError("Please Add Todo")
    }
}

function displayAllTodos() {
    todosContainer.innerHTML = '';
    todoArr.map((todo, index) => {
        return todosContainer.innerHTML += `
            <div class="todo-item">
                <p class="todos-para">${todo}</p>
                <div class="btn-container">
                    <button onclick="editTodo(${index})" class="edit-btn">
                        <img src="/images/edit-btn-img.png" alt="Edit">
                    </button>
                    <button onclick="deleteTodo(${index})" class="delete-btn">
                        <img src="/images/delete-btn-img.png" alt="Delete">
                    </button>
                </div>
            </div>
        `;
    });
}


function deleteTodo(index) {
    todoArr.splice(index, 1);
    displayAllTodos();
}

function editTodo(index) {
    if (isEditing) {
        displayError("Please Save Edited Todo!");
    } else {
        editIndex = index;
        editInput.value = todoArr[editIndex];
        toggleInputFields();
    }
}
function updateTodo() {
    if (editInput.value.trim()) {
        todoArr[editIndex] = editInput.value;
        toggleInputFields();
        displayAllTodos();
    }
}

let isEditing = false;

function toggleInputFields() {
    if (!isEditing) {
        addInputContainer.classList.add('hide');
        editInputContainer.classList.remove('hide');
    } else {
        addInputContainer.classList.remove('hide');
        editInputContainer.classList.add('hide');
    }
    isEditing = !isEditing;
}


let errorEl = document.querySelector('.error-para');

function displayError(message) {
    errorEl.innerHTML = message;
    setTimeout(function () {
        errorEl.innerHTML = "";
    }, 3000);
}