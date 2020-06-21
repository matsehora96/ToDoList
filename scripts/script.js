'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    dataLocalStorage = JSON.parse(localStorage.getItem('data'));

const todoData = [];

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';
        if (item.completed == true && item.value !== undefined) {
            todoCompleted.append(li);
        } else if (item.completed == false && item.value !== undefined) {
            todoList.append(li);
        }

        localStorage.setItem('data', JSON.stringify(todoData))

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(){
            delete item.value;
            delete item.completed;
            li.parentNode.removeChild(li);
            render();
        });
    });
};

const getItemLocalStorage = function() {
    if (localStorage.getItem('data')) {
        for (let i = 0; i < Object.keys(dataLocalStorage).length; i++) {
            const objDataLocalStorage = {
                value: dataLocalStorage[i].value,
                completed: dataLocalStorage[i].completed
            }
            todoData.push(objDataLocalStorage);
        }
    } else {
        localStorage.setItem('data', JSON.stringify(todoData));
    }
}

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if (headerInput.value !== '') {
        const newToDo = {
            value: headerInput.value,
            completed: false
        }
        todoData.push(newToDo);
        headerInput.value = '';
        render();    
    }
});

getItemLocalStorage();
render();
