import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FormikForm.css';

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be less than 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: Yup.string().required('Email is required')
    .email('Please enter a valid email address'),
  
  password: Yup.string().required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(50, 'Password must be less than 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  
  confirmPassword: Yup.string().required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      // Remove confirmPassword from the data sent to API
      const { confirmPassword, ...userData } = values;
      
      // Simulate API call
      const response = await mockUserRegistration(userData);
      
      setStatus({
        type: 'success',
        message: 'Registration successful! Welcome aboard!'
      });
      
      resetForm();
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Registration failed. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Mock API function
  const mockUserRegistration = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          console.log('User registered with Formik:', userData);
          resolve({ success: true, user: userData });
        } else {
          reject(new Error('Registration failed'));
        }
      }, 1000);
    });
  };

  return (
    <div className="formik-container">
      <h2>User Registration</h2>
      <p className="subtitle">Using Formik with Yup Validation</p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status, touched, errors }) => (
          <Form className="formik-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className={touched.username && errors.username ? 'error' : ''}
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={touched.email && errors.email ? 'error' : ''}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className={touched.password && errors.password ? 'error' : ''}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
              />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            {status && (
              <div className={`message ${status.type}`}>
                {status.message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
