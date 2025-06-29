
# NewsHub - Personalized News Aggregator

A modern, responsive news aggregator built with React, TypeScript, and Tailwind CSS. Stay informed with the latest news from trusted sources worldwide with personalized feeds and advanced filtering capabilities.

## 🚀 Features

- **Article Search & Filtering**: Search articles by keyword and filter by date, category, and source
- **Personalized News Feed**: Customize your feed by selecting preferred sources and categories
- **Mobile-Responsive Design**: Optimized for all devices with a clean, modern interface
- **Multiple News Sources**: Integrates with various news APIs for comprehensive coverage
- **Real-time Updates**: Fresh content with loading states and smooth transitions
- **Advanced Filtering**: Sort by date, popularity, or relevancy

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React icons
- **State Management**: React Hooks
- **Data Fetching**: Custom hooks with React Query integration
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd newshub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🐳 Docker Setup

### Building the Docker Image

```bash
docker build -t newshub .
```

### Running with Docker

```bash
docker run -p 8080:8080 newshub
```

### Using Docker Compose

```bash
docker-compose up -d
```

## 🔧 Configuration

The application currently uses mock data for demonstration purposes. To integrate with real news APIs:

1. Obtain API keys from your chosen news sources (NewsAPI, The Guardian, NYTimes, etc.)
2. Update the `useNewsAPI` hook in `src/hooks/useNewsAPI.ts`
3. Replace mock data with actual API calls
4. Configure environment variables for API keys

### Supported News Sources

- NewsAPI.org
- The Guardian API
- New York Times API
- BBC News API
- OpenNews API
- NewsCred API

## 📱 Features Overview

### Search & Filtering
- Real-time search across all articles
- Filter by date range (24h, week, month)
- Sort by latest, popularity, or relevancy
- Source-specific filtering

### Personalization
- Select preferred news sources
- Choose favorite categories
- Customizable feed based on preferences
- Save settings for future sessions

### User Experience
- Clean, intuitive interface
- Responsive grid layout
- Smooth animations and transitions
- Loading states and error handling
- External link handling

## 🏗 Architecture

The application follows React best practices and SOLID principles:

- **Components**: Modular, reusable UI components
- **Hooks**: Custom hooks for data fetching and state management
- **Types**: TypeScript interfaces for type safety
- **Utils**: Utility functions and helpers

### Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

### ScreenShots
![image](https://github.com/user-attachments/assets/fd1ee846-5ad8-4188-b9a2-182f9f4bd9e4)

![image](https://github.com/user-attachments/assets/6632a06c-e26b-4f0f-a167-82266590d612)

![image](https://github.com/user-attachments/assets/a1001090-238b-4e41-8a71-b9688f656f23)

![image](https://github.com/user-attachments/assets/54547962-ab6e-4ba6-b083-056f46dd0d18)




## 🚀 Deployment

The application can be deployed to various platforms:

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop build folder or connect via Git
- **Docker**: Use the provided Dockerfile for containerized deployment

## 🔮 Future Enhancements

- Real-time notifications for breaking news
- Social sharing capabilities
- Bookmarking and reading lists
- Dark mode support
- Offline reading capability
- Advanced analytics and reading habits

## 📄 License

This project is created as a technical challenge and is available for educational purposes.

---

Built React, TypeScript, and modern web technologies.
```
