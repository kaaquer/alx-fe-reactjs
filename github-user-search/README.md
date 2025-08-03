# GitHub User Search Application

A modern React application that allows users to search for GitHub profiles using the GitHub API. Built with Vite, React, and Axios.

## Features

- 🔍 Search GitHub users by username
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with smooth animations
- 🔗 Direct links to GitHub profiles
- 📊 Display user statistics (repos, followers, following)
- ⚡ Fast and efficient API calls

## Technologies Used

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with flexbox and grid
- **GitHub API** - RESTful API for GitHub data

## Project Structure

```
github-user-search/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── SearchBar.css
│   │   ├── UserCard.jsx
│   │   └── UserCard.css
│   ├── services/
│   │   └── githubApi.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── .env
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd github-user-search
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables (optional):
   Create a `.env` file in the root directory:
   ```
   VITE_APP_GITHUB_API_KEY=your_github_token_here
   VITE_APP_GITHUB_API_URL=https://api.github.com
   ```

   **Note:** The GitHub API key is optional. The app works without it, but you'll have lower rate limits.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a GitHub username in the search bar
2. Click "Search" or press Enter
3. View the search results with user information
4. Click "View Profile on GitHub" to visit the user's GitHub profile

## API Configuration

The application uses the GitHub REST API v3. You can configure the API settings in the `.env` file:

- `VITE_APP_GITHUB_API_KEY`: Your GitHub personal access token (optional)
- `VITE_APP_GITHUB_API_URL`: GitHub API base URL (defaults to https://api.github.com)

### Rate Limits

- **Without API key**: 60 requests per hour
- **With API key**: 5000 requests per hour

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- GitHub API for providing the data
- React team for the amazing framework
- Vite team for the fast build tool
