import { useParams, Link, Navigate } from 'react-router-dom';

const BlogPost = () => {
  const { postId } = useParams();

  // Sample blog posts data (in a real app, this would come from an API)
  const blogPosts = {
    1: {
      id: 1,
      title: "Getting Started with React Router",
      content: `
        <p>React Router is a powerful library for handling routing in React applications. It allows you to create single-page applications with multiple views and navigation between them.</p>
        
        <h3>Key Concepts</h3>
        <ul>
          <li><strong>BrowserRouter:</strong> The main router component that uses HTML5 history API</li>
          <li><strong>Routes:</strong> Container for all route definitions</li>
          <li><strong>Route:</strong> Individual route definition with path and component</li>
          <li><strong>Link:</strong> Navigation component that doesn't cause page reloads</li>
        </ul>

        <h3>Basic Setup</h3>
        <p>To get started with React Router, you need to install it and wrap your app with BrowserRouter:</p>
        <pre><code>npm install react-router-dom</code></pre>

        <p>Then in your main App component:</p>
        <pre><code>
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    &lt;Router&gt;
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/Router&gt;
  );
}
        </code></pre>
      `,
      author: "John Doe",
      date: "2024-01-15",
      readTime: "5 min read"
    },
    2: {
      id: 2,
      title: "Advanced Routing Patterns",
      content: `
        <p>Once you've mastered the basics of React Router, you can explore more advanced patterns that make your applications more powerful and maintainable.</p>
        
        <h3>Nested Routes</h3>
        <p>Nested routes allow you to create hierarchical navigation structures. This is perfect for dashboards, user profiles, or any application with sub-sections.</p>
        
        <h3>Protected Routes</h3>
        <p>Protected routes ensure that only authenticated users can access certain parts of your application. This is crucial for security and user experience.</p>
        
        <h3>Dynamic Routes</h3>
        <p>Dynamic routes use parameters to handle variable URLs, making your application flexible and scalable.</p>
      `,
      author: "Jane Smith",
      date: "2024-01-20",
      readTime: "8 min read"
    },
    3: {
      id: 3,
      title: "Building a Complete React App",
      content: `
        <p>Building a complete React application involves more than just components and routing. You need to consider state management, data fetching, and user experience.</p>
        
        <h3>Architecture Best Practices</h3>
        <ul>
          <li>Organize your code into logical folders</li>
          <li>Use consistent naming conventions</li>
          <li>Implement proper error handling</li>
          <li>Optimize for performance</li>
        </ul>
      `,
      author: "Mike Johnson",
      date: "2024-01-25",
      readTime: "12 min read"
    },
    4: {
      id: 4,
      title: "State Management in React",
      content: `
        <p>State management is a crucial aspect of React development. Understanding when and how to manage state effectively can make or break your application.</p>
        
        <h3>Different Approaches</h3>
        <ul>
          <li><strong>Local State:</strong> Using useState for component-level state</li>
          <li><strong>Context API:</strong> For sharing state across components</li>
          <li><strong>Redux:</strong> For complex state management</li>
          <li><strong>Zustand:</strong> Lightweight state management</li>
        </ul>
      `,
      author: "Sarah Wilson",
      date: "2024-01-30",
      readTime: "10 min read"
    },
    5: {
      id: 5,
      title: "Performance Optimization Tips",
      content: `
        <p>Performance optimization is essential for providing a great user experience. Here are some key strategies for optimizing React applications.</p>
        
        <h3>Optimization Techniques</h3>
        <ul>
          <li>Use React.memo for component memoization</li>
          <li>Implement code splitting with React.lazy</li>
          <li>Optimize bundle size</li>
          <li>Use proper key props in lists</li>
        </ul>
      `,
      author: "David Brown",
      date: "2024-02-05",
      readTime: "7 min read"
    }
  };

  const post = blogPosts[postId];

  // If post doesn't exist, redirect to 404
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="blog-post">
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="author">By {post.author}</span>
          <span className="date">{new Date(post.date).toLocaleDateString()}</span>
          <span className="read-time">{post.readTime}</span>
        </div>
      </div>

      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="post-footer">
        <Link to="/blog" className="back-to-blog">
          ← Back to Blog
        </Link>
        
        <div className="routing-demo">
          <h4>Dynamic Routing Demo</h4>
          <p>Current Post ID: <strong>{postId}</strong></p>
          <p>Try changing the URL to see different posts:</p>
          <div className="demo-links">
            {[1, 2, 3, 4, 5].map(id => (
              <Link 
                key={id} 
                to={`/blog/${id}`} 
                className={id === parseInt(postId) ? 'active' : ''}
              >
                Post {id}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
