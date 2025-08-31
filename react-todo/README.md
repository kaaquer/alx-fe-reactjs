# React Todo List

A fully functional Todo List application built with React, featuring comprehensive testing with Jest and React Testing Library.

## Features

- ✅ Add new todos
- ✅ Toggle todo completion status
- ✅ Delete individual todos
- ✅ Clean and modern UI
- ✅ Comprehensive test coverage

## Component Structure

### TodoList Component
The main component that manages the todo list functionality:

- **State Management**: Uses React hooks (`useState`) to manage todos and form input
- **Initial State**: Comes with 3 demo todos: "Learn React", "Build a Todo App", "Write Tests"
- **Methods**:
  - `addTodo()`: Adds a new todo to the list
  - `toggleTodo()`: Toggles the completion status of a todo
  - `deleteTodo()`: Removes a todo from the list

## Testing

The project includes comprehensive tests covering all functionality:

### Test Categories

1. **Initial Render Tests**
   - Verifies component renders correctly
   - Checks initial todos are displayed
   - Ensures all UI elements are present

2. **Adding Todos Tests**
   - Tests adding new todos via button click
   - Tests adding todos via Enter key
   - Prevents adding empty todos

3. **Toggling Todos Tests**
   - Tests toggling todo completion status
   - Verifies visual feedback (strikethrough, color changes)

4. **Deleting Todos Tests**
   - Tests deleting individual todos
   - Tests deleting multiple todos
   - Ensures other todos remain intact

5. **Integration Tests**
   - Tests complete workflows (add → toggle → delete)
   - Verifies state consistency

### Running Tests

```bash
npm test
```

To run tests without watch mode:
```bash
npm test -- --watchAll=false
```

## Project Structure

```
react-todo/
├── src/
│   ├── components/
│   │   ├── TodoList.js          # Main TodoList component
│   │   └── TodoList.css         # Component styles
│   ├── __tests__/
│   │   └── TodoList.test.js     # Comprehensive test suite
│   ├── App.js                   # Main App component
│   └── index.js                 # Application entry point
├── package.json
└── README.md
```

## Technologies Used

- **React 19.1.1**: Modern React with hooks
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **CSS3**: Custom styling with modern design

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Usage

1. **Adding a Todo**: Type in the input field and click "Add Todo" or press Enter
2. **Completing a Todo**: Click on the todo text to toggle its completion status
3. **Deleting a Todo**: Click the "Delete" button next to any todo

## Test Results

All tests pass successfully:
- ✅ 11 tests passing
- ✅ 2 test suites passing
- ✅ 100% functionality covered

## Learning Objectives Achieved

- ✅ Creating React components with state management
- ✅ Implementing CRUD operations (Create, Read, Update, Delete)
- ✅ Writing comprehensive tests with Jest and React Testing Library
- ✅ Using modern React patterns (hooks, functional components)
- ✅ Building a complete, functional application
