'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }

    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button> 
                <button class="todo-complete"></button> 
            </div>
        `);

        (todo.completed) ? this.todoCompleted.append(li) :
                           this.todoList.append(li);
    }

    addTodo(e) {
        e.preventDefault();
        
        if (this.input.value === '') {
            alert('Попробуйте еще раз');
        } else if (this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(key) {
        this.todoData.delete(key);
        this.render();
    }

    completedItem(key) {
        let current;
        this.todoData.forEach((item,index) =>{
            if (item.key === key) {
                current = index;
                this.todoData.get(current).completed = !this.todoData.get(key).completed;
            }
        });
        this.render();
    }

    handler(event) {
        const target = event.target;  
        const currentKey = target.closest('li').key;
        if (target.classList.contains('todo-remove')) {
            this.deleteItem(currentKey);
        } else if (target.classList.contains('todo-complete')) {
            this.completedItem(currentKey);
        } 
    }

    init() { 
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.todoContainer.addEventListener('click', this.handler.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();