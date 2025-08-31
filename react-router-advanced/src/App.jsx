import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import useAuth from './hooks/useAuth';

// Components
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

function App() {
  const { isAuthenticated, user, login, logout } = useAuth();

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} onLogout={logout} user={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route 
              path="/profile/*" 
              element={
                <ProtectedRoute>
                  <Profile user={user} />
                </ProtectedRoute>
              } 
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route 
              path="/protected-blog/:id" 
              element={
                <ProtectedRoute>
                  <BlogPost />
                </ProtectedRoute>
              } 
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
