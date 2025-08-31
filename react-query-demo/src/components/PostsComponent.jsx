import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css';

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
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
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  if (isLoading) {
    return (
      <div className="posts-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="posts-container">
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
    <div className="posts-container">
      <div className="header">
        <h1>Posts from JSONPlaceholder API</h1>
        <div className="controls">
          <button onClick={togglePosts} className="toggle-btn">
            {showPosts ? 'Hide Posts' : 'Show Posts'}
          </button>
          <button 
            onClick={() => refetch()} 
            className="refresh-btn"
            disabled={isFetching}
          >
            {isFetching ? 'Refreshing...' : 'Refresh Posts'}
          </button>
          <button 
            onClick={() => refetch()} 
            className="refetch-btn"
            disabled={isFetching}
          >
            {isFetching ? 'Fetching...' : 'Refetch Data'}
          </button>
          <div className="status">
            {isFetching && <span className="fetching">Fetching...</span>}
            <span className="count">Total Posts: {posts?.length || 0}</span>
          </div>
        </div>
      </div>

      {showPosts && (
        <div className="posts-grid">
          {posts?.map((post) => (
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

              <div className="info-panel">
          <h3>React Query Features Demonstrated:</h3>
          <ul>
            <li>✅ <strong>Data Fetching:</strong> Automatic API calls with loading states</li>
            <li>✅ <strong>Caching:</strong> Data is cached for 5 minutes (staleTime)</li>
            <li>✅ <strong>Background Updates:</strong> Data refreshes in background</li>
            <li>✅ <strong>Error Handling:</strong> Graceful error display with retry</li>
            <li>✅ <strong>Manual Refetch:</strong> Multiple buttons to refetch data</li>
            <li>✅ <strong>Loading States:</strong> Different states for initial load vs refetch</li>
            <li>✅ <strong>Component Toggle:</strong> Hide/Show posts to test caching</li>
            <li>✅ <strong>Window Focus Refetch:</strong> Data refetches when window gains focus</li>
            <li>✅ <strong>Keep Previous Data:</strong> Previous data shown while fetching new data</li>
          </ul>
          <p className="cache-info">
            <strong>Cache Test:</strong> Try hiding posts, then showing them again - they should load instantly from cache!
          </p>
        </div>
    </div>
  );
};

export default PostsComponent;
