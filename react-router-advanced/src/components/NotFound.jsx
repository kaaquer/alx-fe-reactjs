import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="error-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        
        <div className="error-actions">
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
          <Link to="/blog" className="btn-secondary">
            Browse Blog
          </Link>
        </div>

        <div className="helpful-links">
          <h3>Helpful Links:</h3>
          <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/blog">Blog Posts</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="routing-info">
          <h3>Routing Information</h3>
          <p>This 404 page is reached when users navigate to routes that don't exist. In our routing setup, we use:</p>
          <pre><code>&lt;Route path="*" element={&lt;Navigate to="/404" replace /&gt;} /&gt;</code></pre>
          <p>This catches all unmatched routes and redirects them to this 404 page.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
