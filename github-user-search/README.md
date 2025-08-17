# GitHub User Search Application

A modern React application that allows users to search for GitHub profiles using the GitHub API. Built with Vite, React, Tailwind CSS, and Axios.

## 🌟 Features

- 🔍 **Advanced Search** - Search GitHub users with multiple criteria
- 📍 **Location Filter** - Find users by specific location
- 📊 **Repository Filters** - Filter by min/max repository count
- 👥 **Followers Filter** - Search users with minimum followers
- 🏢 **User Type Selection** - Search for users or organizations
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Pagination** - Load more results seamlessly
- 🎨 **Modern UI** - Beautiful, GitHub-inspired interface
- 🔒 **Error Handling** - Graceful error management
- 🚀 **Performance Optimized** - Fast loading and smooth interactions

## 🛠️ Technologies Used

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **GitHub API** - RESTful API for GitHub data

## 📦 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd github-user-search
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional):**
   Create a `.env` file in the root directory:
   ```
   VITE_APP_GITHUB_API_KEY=your_github_token_here
   VITE_APP_GITHUB_API_URL=https://api.github.com
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🚀 Deployment to Vercel

### Step 1: Prepare for Deployment

The application is already optimized for production with:
- ✅ Console logs removed
- ✅ Error handling improved
- ✅ Image optimization (lazy loading)
- ✅ Environment variables properly configured
- ✅ .env files in .gitignore

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. **Create a Vercel account:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Import your project:**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project

3. **Configure build settings:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Set environment variables (if needed):**
   - Go to Project Settings → Environment Variables
   - Add `VITE_APP_GITHUB_API_KEY` if you have a GitHub token
   - Add `VITE_APP_GITHUB_API_URL` (optional, defaults to https://api.github.com)

5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your application

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Confirm build settings
   - Set environment variables if needed

### Step 3: Verify Deployment

1. **Check the deployment:**
   - Visit your Vercel URL
   - Test all search functionalities
   - Verify responsive design on mobile

2. **Monitor performance:**
   - Check Vercel Analytics
   - Monitor API rate limits
   - Test error scenarios

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_APP_GITHUB_API_KEY` | GitHub Personal Access Token | No | None |
| `VITE_APP_GITHUB_API_URL` | GitHub API Base URL | No | `https://api.github.com` |

### GitHub API Rate Limits

- **Without API key:** 60 requests per hour
- **With API key:** 5000 requests per hour

## 📱 Usage

### Basic Search
1. Enter a GitHub username in the search bar
2. Click "Search" or press Enter
3. View the search results

### Advanced Search
1. Click "Show Advanced Search"
2. Fill in additional criteria:
   - **Location:** Filter by user location
   - **Type:** Search for users or organizations
   - **Min/Max Repositories:** Filter by repository count
   - **Min Followers:** Filter by follower count
3. Click "Search" to see filtered results

### Viewing Results
- Click on any user card to open their GitHub profile
- Use "Load More" to see additional results
- View user statistics (repos, followers, following)

## 🏗️ Project Structure

```
github-user-search/
├── src/
│   ├── components/
│   │   ├── Search.jsx          # Main search component
│   │   ├── Search.css          # Search component styles
│   │   ├── UserCard.jsx        # User display component
│   │   ├── UserCard.css        # User card styles
│   │   ├── ApiTest.jsx         # API connection test
│   │   └── ApiTest.css         # API test styles
│   ├── services/
│   │   └── githubService.js    # GitHub API service
│   ├── App.jsx                 # Main application
│   ├── App.css                 # Application styles
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles + Tailwind
├── public/                     # Static assets
├── .env                        # Environment variables
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies and scripts
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Basic search functionality
- [ ] Advanced search filters
- [ ] Pagination (Load More)
- [ ] Error handling
- [ ] Responsive design
- [ ] API rate limiting
- [ ] User profile links
- [ ] Clear search functionality

### Performance Testing

- [ ] Page load time < 3 seconds
- [ ] Search results load < 2 seconds
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

## 🐛 Troubleshooting

### Common Issues

1. **API Rate Limit Exceeded:**
   - Wait for rate limit reset
   - Add GitHub API key for higher limits

2. **Build Failures:**
   - Check Node.js version (16+)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

3. **Environment Variables:**
   - Ensure variables start with `VITE_APP_`
   - Redeploy after adding new variables

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🙏 Acknowledgments

- GitHub API for providing the data
- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first styling
- Vercel for seamless deployment

---

**Live Demo:** [Your Vercel URL here]
**Repository:** [Your GitHub repository URL]
