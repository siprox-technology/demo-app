# TYPO3 Headless with Vue.js Frontend

This project demonstrates how to use TYPO3 CMS with the headless extension as a backend and Vue.js as a frontend.

## Project Structure

- `public/` - TYPO3 CMS public directory
- `vendor/` - Composer dependencies, including the TYPO3 headless extension
- `frontend/` - Vue.js frontend application

## Prerequisites

- PHP 8.2 or later
- Composer
- Node.js (v16 or later)
- npm or yarn
- DDEV (for local development)

## Backend Setup (TYPO3 Headless)

The project uses TYPO3 CMS with the [headless extension](https://github.com/TYPO3-Initiatives/headless) to provide a JSON API for the frontend.

### Local Development with DDEV

1. Start the DDEV environment:

```bash
ddev start
```

2. Access the TYPO3 backend at `https://demoapp.de.test/typo3`

### Content Setup

1. Create pages and content elements in the TYPO3 backend
2. The headless extension will automatically expose these as JSON via its API

## Frontend Setup (Vue.js)

The frontend is a Vue.js application that consumes the TYPO3 headless API.

1. Install dependencies:

```bash
cd frontend
npm install
# or
yarn install
```

2. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173 by default.

## API Endpoints

The TYPO3 headless extension provides the following API endpoints:

- `/api/page/{pageId}` - Get page data by ID
- `/api/page/slug/{slug}` - Get page data by slug
- `/api/menu/{pageId}` - Get menu data for a page

## Deployment

### Backend Deployment

Deploy the TYPO3 CMS instance as you would normally deploy a TYPO3 project.

### Frontend Deployment

1. Build the frontend application:

```bash
cd frontend
npm run build
# or
yarn build
```

2. Deploy the contents of the `frontend/dist` directory to your web server or CDN.

## Further Documentation

- [TYPO3 Headless Extension Documentation](https://github.com/TYPO3-Initiatives/headless)
- [Vue.js Frontend Documentation](./frontend/README.md)