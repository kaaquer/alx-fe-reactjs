# React Router Advanced

A comprehensive React application demonstrating advanced routing techniques using React Router v6. This project showcases nested routes, protected routes, dynamic routing, and modern React patterns.

## Features

### 🔐 Protected Routes
- Authentication-based route protection
- Automatic redirection to login for unauthenticated users
- Simulated authentication system for demonstration

### 📁 Nested Routes
- Hierarchical navigation structure in the Profile section
- Sub-routes for Profile Details and Settings
- Active route highlighting and navigation

### 🔗 Dynamic Routing
- Variable URL parameters for blog posts (`/blog/:postId`)
- Dynamic content rendering based on route parameters
- 404 handling for invalid routes

### 🎨 Modern UI/UX
- Responsive design with mobile-first approach
- Beautiful gradient backgrounds and smooth animations
- Interactive components with hover effects
- Clean and intuitive navigation

## Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Navigation header with auth status
│   ├── Home.jsx                # Landing page with feature overview
│   ├── Login.jsx               # Authentication form
│   ├── ProtectedRoute.jsx      # Route protection component
│   ├── Profile.jsx             # Main profile with nested routes
│   ├── ProfileDetails.jsx      # Profile details sub-route
│   ├── ProfileSettings.jsx     # Profile settings sub-route
│   ├── Blog.jsx                # Blog listing page
│   ├── BlogPost.jsx            # Individual blog post (dynamic route)
│   └── NotFound.jsx            # 404 error page
├── App.jsx                     # Main app with routing setup
├── App.css                     # Comprehensive styling
└── main.jsx                    # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-router-advanced
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### 1. Authentication Demo
- Click "Login" in the navigation
- Enter any email and password (demo accepts all credentials)
- You'll be redirected to the Profile page after successful login

### 2. Protected Routes
- Try accessing `/profile` without logging in
- You'll be automatically redirected to the login page
- After login, you can access all protected routes

### 3. Nested Routes
- Navigate to Profile after logging in
- Use the sidebar navigation to switch between:
  - Profile Overview (default)
  - Profile Details
  - Profile Settings

### 4. Dynamic Routing
- Visit the Blog page to see all available posts
- Click on any post to see dynamic routing in action
- Try manually typing URLs like `/blog/1`, `/blog/2`, etc.
- Test invalid routes like `/blog/999` to see 404 handling

### 5. Navigation Features
- Use the header navigation to move between pages
- Notice the active state highlighting
- Test the logout functionality
- Try direct URL navigation

## Routing Implementation

### Main Router Setup
```jsx
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login onLogin={handleLogin} />} />
    <Route 
      path="/profile/*" 
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Profile user={user} />
        </ProtectedRoute>
      } 
    />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:postId" element={<BlogPost />} />
    <Route path="/404" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
</Router>
```

### Protected Route Component
```jsx
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
```

### Nested Routes in Profile
```jsx
<Routes>
  <Route path="/" element={<ProfileOverview user={user} />} />
  <Route path="/details" element={<ProfileDetails user={user} />} />
  <Route path="/settings" element={<ProfileSettings user={user} />} />
  <Route path="*" element={<Navigate to="/profile" replace />} />
</Routes>
```

### Dynamic Route with Parameters
```jsx
const BlogPost = () => {
  const { postId } = useParams();
  // Use postId to fetch and display specific blog post
};
```

## Key Concepts Demonstrated

### 1. Route Protection
- Authentication state management
- Conditional rendering based on auth status
- Automatic redirection for unauthorized access

### 2. Nested Routing
- Hierarchical route structure
- Shared layout with sub-navigation
- Active route state management

### 3. Dynamic Routing
- URL parameter extraction with `useParams`
- Dynamic content rendering
- Error handling for invalid routes

### 4. Navigation Patterns
- Programmatic navigation with `useNavigate`
- Link components for declarative navigation
- Active link highlighting

### 5. State Management
- React hooks for local state
- Props drilling for simple state sharing
- Authentication state persistence

## Styling Features

- **Responsive Design**: Mobile-first approach with breakpoints
- **Modern UI**: Gradient backgrounds, shadows, and smooth transitions
- **Interactive Elements**: Hover effects and animations
- **Accessibility**: Proper contrast ratios and focus states
- **Component Isolation**: Scoped styles for each component

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Structure

The application follows React best practices:
- Functional components with hooks
- Proper separation of concerns
- Reusable components
- Clean and readable code structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- React Router team for the excellent routing library
- Vite for the fast build tool
- React community for best practices and patterns
