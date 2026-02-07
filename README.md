# Movie App

A modern, responsive **React + TypeScript** web application for discovering movies, TV shows, and people in the film industry.  
Built with a focus on **clean architecture, reusable components, accessibility, and real-world API integration**.

## Highlights

- Dynamic carousels for movies, TV shows, and people
- Detail pages with client-side routing
- Real-time data fetched from a production-grade REST API
- Reusable, type-safe components
- Accessibility-aware UI
- Responsive design for different screen sizes

## Tech Stack

- **React** + **TypeScript**  
- **React Router** (dynamic routing)  
- **Axios** (API communication)  
- **React Slick** (carousel/slider)  
- **Material UI (MUI)** (UI components)  
- **CSS** (custom layout and styling)  

## API & Data Source

This project uses the **The Movie Database (TMDB) API** to retrieve movie, TV show, and people data.

> This product uses the TMDB API but is **not endorsed or certified by TMDB**.

All data and images are provided by:  
**https://www.themoviedb.org/**  

TMDB attribution and usage comply with their API terms.

## Environment Setup

A TMDB API token is required to run the project.

Create a `.env` file in the root directory:

```env
REACT_APP_TMDB_API_TOKEN=your_api_token_here
```

## Running the Project

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

> **Note:** If you encounter dependency conflicts (especially with React, ESLint, or react-slick), you may need to run:  
> ```bash
> npm install --legacy-peer-deps
> ```  
> This forces npm to bypass strict peer dependency checks.

The app will be available at: **http://localhost:3000**
