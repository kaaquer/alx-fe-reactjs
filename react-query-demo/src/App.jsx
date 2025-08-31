import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CacheDemo from './components/CacheDemo';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <CacheDemo />
      </div>
    </QueryClientProvider>
  );
}

export default App;
