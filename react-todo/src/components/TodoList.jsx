import React, { useState } from 'react';
import './TodoList.css';
import AddTodoForm from './AddTodoForm.jsx';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: false }
  ]);

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
    <div className="todo-list">
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo} />

      <ul className="todos">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span 
              onClick={() => toggleTodo(todo.id)}
              className="todo-text"
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
