import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      onAddTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form" data-testid="add-todo-form">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
        data-testid="todo-input"
      />
      <button type="submit" className="add-button" data-testid="add-button">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;
