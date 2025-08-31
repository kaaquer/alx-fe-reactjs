import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './components/TodoList.jsx';

describe('TodoList Component', () => {
  // Test 1: Initial Render Test
  test('renders TodoList component correctly', () => {
    render(<TodoList />);
    
    // Check if the title is rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if the input field is rendered
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    
    // Check if the Add Todo button is rendered
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  test('renders initial todos correctly', () => {
    render(<TodoList />);
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if delete buttons are present for each todo
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons).toHaveLength(3);
  });

  // Test 2: Adding Todos Test
  test('can add a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Type a new todo
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    
    // Submit the form
    fireEvent.click(addButton);
    
    // Check if the new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check if the input is cleared
    expect(input.value).toBe('');
  });

  test('does not add empty todos', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Try to add an empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Check that no new todo was added (should still have 3 initial todos)
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons).toHaveLength(3);
  });

  test('can add todo by pressing Enter', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    
    // Type a new todo and press Enter
    fireEvent.change(input, { target: { value: 'Enter Test Todo' } });
    fireEvent.submit(input.closest('form'));
    
    // Check if the new todo is added
    expect(screen.getByText('Enter Test Todo')).toBeInTheDocument();
  });

  // Test 3: Toggling Todos Test
  test('can toggle todo completion status', () => {
    render(<TodoList />);
    
    const firstTodo = screen.getByText('Learn React');
    const todoItem = firstTodo.closest('li');
    
    // Initially, the todo should not be completed
    expect(todoItem).not.toHaveClass('completed');
    
    // Click on the todo to toggle it
    fireEvent.click(firstTodo);
    
    // The todo should now be completed
    expect(todoItem).toHaveClass('completed');
    
    // Click again to uncomplete it
    fireEvent.click(firstTodo);
    
    // The todo should not be completed again
    expect(todoItem).not.toHaveClass('completed');
  });

  // Test 4: Deleting Todos Test
  test('can delete a todo', () => {
    render(<TodoList />);
    
    // Get all delete buttons
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons).toHaveLength(3);
    
    // Delete the first todo
    fireEvent.click(deleteButtons[0]);
    
    // Check that the todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check that there are now only 2 delete buttons
    const remainingDeleteButtons = screen.getAllByText('Delete');
    expect(remainingDeleteButtons).toHaveLength(2);
  });

  test('can delete multiple todos', () => {
    render(<TodoList />);
    
    // Get all delete buttons
    let deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons).toHaveLength(3);
    
    // Delete the first todo
    fireEvent.click(deleteButtons[0]);
    
    // Delete the second todo
    deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Check that both todos are removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
    
    // Check that only one todo remains
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    expect(screen.getAllByText('Delete')).toHaveLength(1);
  });

  // Test 5: Integration Tests
  test('can add, toggle, and delete todos in sequence', () => {
    render(<TodoList />);
    
    // Add a new todo
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'Integration Test Todo' } });
    fireEvent.click(addButton);
    
    // Verify the todo was added
    const newTodo = screen.getByText('Integration Test Todo');
    expect(newTodo).toBeInTheDocument();
    
    // Toggle the new todo
    fireEvent.click(newTodo);
    expect(newTodo.closest('li')).toHaveClass('completed');
    
    // Delete the new todo
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[deleteButtons.length - 1]); // Click the last delete button
    
    // Verify the todo was deleted
    expect(screen.queryByText('Integration Test Todo')).not.toBeInTheDocument();
  });

  test('maintains other todos when one is deleted', () => {
    render(<TodoList />);
    
    // Verify initial state
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Delete the middle todo
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[1]); // Delete "Build a Todo App"
    
    // Verify the deleted todo is gone
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
    
    // Verify other todos remain
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });
});
