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
  // Search for GitHub users with advanced parameters
  searchUsers: async (query, page = 1, perPage = 30) => {
    try {
      const params = {
        q: query,
        page: page,
        per_page: perPage,
        sort: 'followers', // Sort by followers by default
        order: 'desc'
      };

      const response = await githubApi.get('/search/users', { params });
      
      // Check rate limiting
      const rateLimit = response.headers['x-ratelimit-remaining'];
      if (rateLimit && parseInt(rateLimit) < 10) {
        console.warn(`API rate limit warning: ${rateLimit} requests remaining`);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      
      // Handle specific error cases
      if (error.response?.status === 403) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.response?.status === 422) {
        throw new Error('Invalid search query. Please check your search parameters.');
      } else if (error.response?.status === 404) {
        throw new Error('Search endpoint not found.');
      }
      
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
      
      if (error.response?.status === 404) {
        throw new Error('User not found.');
      }
      
      throw error;
    }
  },

  // Get user repositories
  getUserRepositories: async (username, page = 1, perPage = 30) => {
    try {
      const params = {
        page: page,
        per_page: perPage,
        sort: 'updated',
        direction: 'desc'
      };

      const response = await githubApi.get(`/users/${username}/repos`, { params });
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

  // Get user's followers
  getUserFollowers: async (username, page = 1, perPage = 30) => {
    try {
      const params = {
        page: page,
        per_page: perPage
      };

      const response = await githubApi.get(`/users/${username}/followers`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching user followers:', error);
      throw error;
    }
  },

  // Get user's following
  getUserFollowing: async (username, page = 1, perPage = 30) => {
    try {
      const params = {
        page: page,
        per_page: perPage
      };

      const response = await githubApi.get(`/users/${username}/following`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching user following:', error);
      throw error;
    }
  },

  // Search repositories
  searchRepositories: async (query, page = 1, perPage = 30) => {
    try {
      const params = {
        q: query,
        page: page,
        per_page: perPage,
        sort: 'stars',
        order: 'desc'
      };

      const response = await githubApi.get('/search/repositories', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching repositories:', error);
      throw error;
    }
  },

  // Get rate limit information
  getRateLimit: async () => {
    try {
      const response = await githubApi.get('/rate_limit');
      return response.data;
    } catch (error) {
      console.error('Error fetching rate limit:', error);
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
  },

  // Build advanced search query
  buildAdvancedQuery: (params) => {
    let query = params.query || '';
    
    // Add location filter
    if (params.location) {
      query += ` location:"${params.location}"`;
    }
    
    // Add repository count filters
    if (params.minRepos) {
      query += ` repos:>=${params.minRepos}`;
    }
    
    if (params.maxRepos) {
      query += ` repos:<=${params.maxRepos}`;
    }
    
    // Add followers filter
    if (params.followers) {
      query += ` followers:>=${params.followers}`;
    }
    
    // Add type filter
    if (params.type && params.type !== 'user') {
      query += ` type:${params.type}`;
    }
    
    // Add language filter
    if (params.language) {
      query += ` language:"${params.language}"`;
    }
    
    // Add created date filter
    if (params.createdAfter) {
      query += ` created:>=${params.createdAfter}`;
    }
    
    return query.trim();
  }
};

export default githubService; 