# TYPO3 Headless Vue.js Frontend

This is a Vue.js frontend application that consumes content from a TYPO3 headless CMS.

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- TYPO3 CMS with the headless extension installed and configured

## Setup

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

## Project Structure

- `src/` - Source files
  - `App.vue` - Main application component
  - `main.js` - Application entry point
  - `pages/` - Page components
    - `HomePage.vue` - Home page component that displays content from TYPO3
  - `services/` - Service modules
    - `api.js` - API service for communicating with TYPO3 headless API

## Configuration

The application is configured to proxy API requests to the TYPO3 headless API. The proxy configuration is in `vite.config.js`.

By default, it proxies requests to `http://demoapp.de.test`, which is the domain configured in the DDEV setup. If your TYPO3 instance is running on a different domain, update the `target` in the proxy configuration.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory. You can serve these files using any static file server.

## Integration with TYPO3

This frontend application expects the TYPO3 headless API to provide page data in a specific format. The application fetches page data from the `/api/page/{pageId}` endpoint and expects the response to include:

- `title` - The page title
- `content` - An array of content elements, each with:
  - `type` - The content element type (e.g., 'text', 'textmedia')
  - `content` - The HTML content
  - `media` - For 'textmedia' elements, an array of media files with:
    - `publicUrl` - The URL to the media file
    - `properties` - Properties of the media file, including:
      - `mime_type` - The MIME type of the file
      - `title` - The title of the file
      - `alternative` - Alternative text for the file (for images)

## Customization

You can customize the application by:

1. Modifying the components in the `src/` directory
2. Adding new routes in `src/main.js`
3. Creating new components for different content element types
4. Styling the application using CSS in the component files