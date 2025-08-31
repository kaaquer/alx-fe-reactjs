import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './CacheDemo.css';

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const CacheDemo = () => {
  const [showPosts, setShowPosts] = useState(true);

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  if (isLoading) {
    return (
      <div className="cache-demo">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="cache-demo">
        <div className="error">
          <h3>Error loading posts</h3>
          <p>{error.message}</p>
          <button onClick={() => refetch()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cache-demo">
      <div className="header">
        <h1>React Query Caching Demo</h1>
        <div className="controls">
          <button onClick={togglePosts} className="toggle-btn">
            {showPosts ? 'Hide Posts' : 'Show Posts'}
          </button>
          <button 
            onClick={() => refetch()} 
            className="refresh-btn"
            disabled={isFetching}
          >
            {isFetching ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <div className="status">
            {isFetching && <span className="fetching">Fetching...</span>}
            <span className="count">Total Posts: {posts?.length || 0}</span>
          </div>
        </div>
      </div>

      {showPosts && (
        <div className="posts-grid">
          {posts?.slice(0, 6).map((post) => (
            <div key={post.id} className="post-card">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
              <div className="post-meta">
                <span className="post-id">ID: {post.id}</span>
                <span className="user-id">User ID: {post.userId}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cache-info">
        <h3>React Query Caching Demonstration:</h3>
        <ul>
          <li>✅ <strong>Data Fetching:</strong> Initial API call with loading state</li>
          <li>✅ <strong>Caching:</strong> Data cached for 5 minutes (staleTime)</li>
          <li>✅ <strong>Background Updates:</strong> Data refreshes in background</li>
          <li>✅ <strong>Error Handling:</strong> Graceful error display with retry</li>
          <li>✅ <strong>Manual Refetch:</strong> Click "Refresh Data" to refetch</li>
          <li>✅ <strong>Component Toggle:</strong> Hide/Show posts to test caching</li>
        </ul>
        <p className="cache-tip">
          <strong>Cache Test:</strong> Try hiding posts, then showing them again - they should load instantly from cache!
        </p>
      </div>
    </div>
  );
};

export default CacheDemo;
