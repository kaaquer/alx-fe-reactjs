# React Query Demo

This project demonstrates advanced data handling in React using **React Query (TanStack Query)** to fetch, cache, and manage data from the JSONPlaceholder API efficiently.

## 🚀 Features

### Core React Query Features
- ✅ **Data Fetching**: Automatic API calls with loading states
- ✅ **Caching**: Intelligent data caching with configurable stale time
- ✅ **Background Updates**: Seamless data refresh in the background
- ✅ **Error Handling**: Graceful error display with retry functionality
- ✅ **Manual Refetch**: On-demand data refresh with user interaction
- ✅ **Loading States**: Different states for initial load vs refetch
- ✅ **Network Optimization**: Reduced API calls through smart caching

### User Interface
- 🎨 **Modern Design**: Beautiful, responsive UI with gradient backgrounds
- 📱 **Mobile Responsive**: Optimized for all device sizes
- ⚡ **Smooth Animations**: Loading spinners and hover effects
- 🎯 **User Feedback**: Clear status indicators and error messages

## 🛠️ Technologies Used

- **React 19.1.1** - UI library
- **@tanstack/react-query** - Data fetching and caching library
- **Vite** - Build tool and development server
- **JSONPlaceholder API** - Free REST API for testing

## 📁 Project Structure

```
src/
├── components/
│   ├── PostsComponent.jsx      # Main component with React Query
│   └── PostsComponent.css      # Component styles
├── App.jsx                     # Main app with QueryClient setup
├── App.css                     # Application styles
├── main.jsx                    # Application entry point
└── index.css                   # Global styles
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser and navigate to `http://localhost:5173`**

## 🔧 React Query Configuration

### QueryClient Setup
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,                    // Retry failed requests 3 times
      refetchOnWindowFocus: false, // Don't refetch on window focus
    },
  },
});
```

### Query Configuration
```javascript
const {
  data: posts,
  isLoading,
  error,
  refetch,
  isFetching
} = useQuery({
  queryKey: ['posts'],           // Unique cache key
  queryFn: fetchPosts,           // Data fetching function
  staleTime: 5 * 60 * 1000,      // Data considered fresh for 5 minutes
  cacheTime: 10 * 60 * 1000,     // Cache kept for 10 minutes
});
```

## 🎯 Key Features Demonstrated

### 1. **Smart Caching**
- Data is cached for 5 minutes (staleTime)
- Cache persists for 10 minutes (cacheTime)
- Navigate away and back to see instant loading from cache

### 2. **Loading States**
- **Initial Loading**: Full-page spinner when first fetching data
- **Background Fetching**: Subtle "Fetching..." indicator during refetch
- **Disabled States**: Button disabled during fetch operations

### 3. **Error Handling**
- Graceful error display with retry functionality
- Network error detection and user-friendly messages
- Automatic retry on failed requests (3 attempts)

### 4. **Manual Data Refresh**
- "Refresh Posts" button for on-demand data fetching
- Visual feedback during refresh operations
- Maintains UI responsiveness during background updates

## 🔍 Testing React Query Features

### 1. **Caching Test**
1. Load the page and wait for posts to appear
2. Navigate away (close tab or go to another page)
3. Return to the page - posts should load instantly from cache

### 2. **Background Updates**
1. Open browser DevTools → Network tab
2. Click "Refresh Posts" button
3. Notice the background fetch while UI remains responsive

### 3. **Error Handling**
1. Temporarily disconnect internet
2. Click "Refresh Posts" - see error handling in action
3. Reconnect and click "Try Again" to retry

## 📊 API Integration

### JSONPlaceholder API
- **Endpoint**: `https://jsonplaceholder.typicode.com/posts`
- **Method**: GET
- **Response**: Array of post objects with `id`, `title`, `body`, and `userId`

### Data Structure
```javascript
{
  id: number,
  title: string,
  body: string,
  userId: number
}
```

## 🎨 UI Components

### Posts Grid
- Responsive grid layout (auto-fill with 350px minimum)
- Hover effects with smooth transitions
- Truncated text with ellipsis for long content

### Loading States
- Centered spinner with smooth animation
- Clear loading messages
- Different states for initial vs background loading

### Error States
- Red-themed error containers
- Clear error messages
- Retry button with hover effects

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Browser DevTools
- **React Developer Tools**: Inspect React Query cache
- **Network Tab**: Monitor API calls and caching behavior
- **Console**: View React Query logs and debugging info

## 📚 Learning Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)

## 🎯 Learning Objectives

This project demonstrates:
- React Query setup and configuration
- Data fetching with loading and error states
- Intelligent caching strategies
- Background data updates
- Manual data refresh
- Error handling and retry logic
- Modern React patterns and best practices
