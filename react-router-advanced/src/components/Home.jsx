import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to React Router Advanced</h1>
      <p>This application demonstrates advanced routing techniques in React:</p>
      
      <div className="features">
        <div className="feature-card">
          <h3>🔐 Protected Routes</h3>
          <p>Try accessing the Profile page without logging in - you'll be redirected to login!</p>
          <Link to="/profile" className="feature-link">Try Protected Route</Link>
        </div>

        <div className="feature-card">
          <h3>📁 Nested Routes</h3>
          <p>The Profile page contains nested routes for different sections.</p>
          <Link to="/profile" className="feature-link">View Nested Routes</Link>
        </div>

        <div className="feature-card">
          <h3>🔗 Dynamic Routes</h3>
          <p>Blog posts use dynamic routing with variable URLs.</p>
          <Link to="/blog" className="feature-link">Explore Dynamic Routes</Link>
        </div>

        <div className="feature-card">
          <h3>🚪 Authentication</h3>
          <p>Login to access protected features and see the full routing experience.</p>
          <Link to="/login" className="feature-link">Login Now</Link>
        </div>
      </div>

      <div className="demo-instructions">
        <h2>Demo Instructions:</h2>
        <ol>
          <li>Click "Login" to authenticate (use any credentials)</li>
          <li>Navigate to Profile to see nested routes</li>
          <li>Visit Blog to see dynamic routing in action</li>
          <li>Try accessing Profile without login to see protected routes</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
