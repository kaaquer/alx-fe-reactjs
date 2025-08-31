import { Link } from 'react-router-dom';

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React Router",
      excerpt: "Learn the basics of React Router and how to implement client-side routing in your React applications.",
      author: "John Doe",
      date: "2024-01-15",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Advanced Routing Patterns",
      excerpt: "Explore advanced routing techniques including nested routes, protected routes, and dynamic routing.",
      author: "Jane Smith",
      date: "2024-01-20",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Building a Complete React App",
      excerpt: "A comprehensive guide to building a full-featured React application with modern best practices.",
      author: "Mike Johnson",
      date: "2024-01-25",
      readTime: "12 min read"
    },
    {
      id: 4,
      title: "State Management in React",
      excerpt: "Understanding different state management solutions and when to use each one in your React projects.",
      author: "Sarah Wilson",
      date: "2024-01-30",
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "Performance Optimization Tips",
      excerpt: "Learn how to optimize your React applications for better performance and user experience.",
      author: "David Brown",
      date: "2024-02-05",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="blog">
      <h2>Blog Posts</h2>
      <p>This page demonstrates dynamic routing. Click on any post to see how dynamic routes work with variable URLs.</p>
      
      <div className="blog-posts">
        {blogPosts.map(post => (
          <article key={post.id} className="blog-post-card">
            <div className="post-header">
              <h3>{post.title}</h3>
              <div className="post-meta">
                <span className="author">By {post.author}</span>
                <span className="date">{new Date(post.date).toLocaleDateString()}</span>
                <span className="read-time">{post.readTime}</span>
              </div>
            </div>
            <p className="post-excerpt">{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="read-more">
              Read Full Post →
            </Link>
          </article>
        ))}
      </div>

      <div className="routing-info">
        <h3>Dynamic Routing Demo</h3>
        <p>
          Notice how each blog post has a unique URL like <code>/blog/1</code>, <code>/blog/2</code>, etc. 
          This is achieved using dynamic routing with the <code>:postId</code> parameter in the route definition.
        </p>
        <p>
          Try manually typing different URLs like <code>/blog/3</code> or <code>/blog/999</code> to see how 
          the dynamic routing handles different post IDs.
        </p>
      </div>
    </div>
  );
};

export default Blog;
