import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState('controlled');

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Form Handling Demo</h1>
        <p>Compare Controlled Components vs Formik</p>
      </header>

      <div className="form-selector">
        <button 
          className={`selector-btn ${activeForm === 'controlled' ? 'active' : ''}`}
          onClick={() => setActiveForm('controlled')}
        >
          Controlled Components
        </button>
        <button 
          className={`selector-btn ${activeForm === 'formik' ? 'active' : ''}`}
          onClick={() => setActiveForm('formik')}
        >
          Formik with Yup
        </button>
      </div>

      <main className="form-container">
        {activeForm === 'controlled' ? (
          <RegistrationForm />
        ) : (
          <FormikForm />
        )}
      </main>

      <footer className="app-footer">
        <p>This demo showcases two different approaches to form handling in React:</p>
        <ul>
          <li><strong>Controlled Components:</strong> Manual state management with useState and custom validation</li>
          <li><strong>Formik:</strong> Form library with built-in state management and Yup validation</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
