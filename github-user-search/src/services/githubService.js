import axios from 'axios';

// GitHub API configuration
const GITHUB_API_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// Create axios instance with default configuration
const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(API_KEY && { 'Authorization': `token ${API_KEY}` })
  }
});

// GitHub API service functions
export const githubService = {
  // Search for GitHub users
  searchUsers: async (query) => {
    try {
      const response = await githubApi.get(`/search/users?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  // Get user details by username
  getUserDetails: async (username) => {
    try {
      const response = await githubApi.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  },

  // Get user repositories
  getUserRepositories: async (username) => {
    try {
      const response = await githubApi.get(`/users/${username}/repos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user repositories:', error);
      throw error;
    }
  },

  // Fetch user data - required function for the system
  fetchUserData: async (username) => {
    try {
      const response = await githubApi.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  // Test API connection
  testApiConnection: async () => {
    try {
      const response = await githubApi.get('/rate_limit');
      return response.data;
    } catch (error) {
      console.error('Error testing API connection:', error);
      throw error;
    }
  }
};

export default githubService; 