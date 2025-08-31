import React, { useState } from 'react';
import './TodoList.css';
import AddTodoForm from './AddTodoForm.jsx';
import { initialTodos } from '../data.js';

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (todoText) => {
    const todo = {
      id: Date.now(),
      text: todoText,
      completed: false
    };
    setTodos([...todos, todo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list" data-testid="todo-list">
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo} />

      <ul className="todos" data-testid="todos">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`} data-testid={`todo-${todo.id}`}>
            <span 
              onClick={() => toggleTodo(todo.id)}
              className="todo-text"
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
              data-testid={`delete-${todo.id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
