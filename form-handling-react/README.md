# React Form Handling Demo

This project demonstrates two different approaches to form handling in React:

1. **Controlled Components** - Manual state management using React's `useState` hook
2. **Formik with Yup** - Form library with built-in state management and validation

## Features

### Controlled Components (`RegistrationForm.jsx`)
- Manual state management with `useState`
- Custom validation logic
- Real-time error clearing
- Mock API integration
- Responsive design

### Formik Integration (`formikForm.jsx`)
- Formik library for form state management
- Yup validation schema
- Built-in error handling
- Field-level validation
- Form submission handling

## Project Structure

```
src/
├── components/
│   ├── RegistrationForm.jsx      # Controlled components form
│   ├── RegistrationForm.css      # Styles for controlled form
│   ├── formikForm.jsx           # Formik-based form
│   └── FormikForm.css           # Styles for Formik form
├── App.jsx                      # Main application component
├── App.css                      # Application styles
├── main.jsx                     # Application entry point
└── index.css                    # Global styles
```

## Technologies Used

- **React 19.1.1** - UI library
- **Formik 2.4.6** - Form management library
- **Yup 1.7.0** - Schema validation library
- **Vite** - Build tool and development server

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Form Validation

### Controlled Components Validation
- Username: Required, minimum 3 characters
- Email: Required, valid email format
- Password: Required, minimum 6 characters

### Formik with Yup Validation
- Username: Required, 3-20 characters, alphanumeric + underscore only
- Email: Required, valid email format
- Password: Required, 6-50 characters, must contain uppercase, lowercase, and number
- Confirm Password: Must match password

## API Integration

Both forms include mock API integration that simulates user registration with a 90% success rate. The API calls are asynchronous and include proper error handling.

## Styling

The project includes modern, responsive CSS with:
- Gradient backgrounds
- Smooth animations and transitions
- Error state styling
- Loading states
- Mobile-responsive design

## Learning Objectives

This project demonstrates:
- React controlled components
- Form state management
- Validation techniques
- Error handling
- API integration
- Modern React patterns
- Formik library usage
- Yup validation schemas
