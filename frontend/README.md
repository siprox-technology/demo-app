# TYPO3 Vue.js Frontend

This is a Vue.js frontend application for a TYPO3 CMS website using the headless extension.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TYPO3 CMS with the headless extension installed and configured

## Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

## Development

To start the development server:

```bash
npm run serve
```

This will start a development server at http://localhost:8080 with hot-reload enabled.

The development server is configured to proxy API requests to your TYPO3 backend. Make sure your TYPO3 instance is running and accessible.

## Building for Production

To build the application for production:

```bash
npm run build
```

This will create a production-ready build in the `../public/vue-frontend` directory, which is configured to be served by TYPO3.

## Integration with TYPO3

The Vue.js application is configured to be served by TYPO3 using TypoScript. The following steps have been taken to integrate the Vue.js app with TYPO3:

1. The headless extension has been installed and configured in TYPO3.
2. The site configuration has been updated to enable headless mode.
3. A TypoScript template has been created to serve the Vue.js app on the frontend.
4. The Vue.js app is configured to fetch data from the TYPO3 headless API.

## Folder Structure

- `src/`: Source files for the Vue.js application
  - `components/`: Vue components
  - `views/`: Vue views/pages
  - `router/`: Vue Router configuration
- `public/`: Static assets

## API Endpoints

The Vue.js application uses the following API endpoints provided by the TYPO3 headless extension:

- `/api/pages/{pageId}`: Get page data
- `/api/pages/{pageId}/content`: Get content elements for a page

## Styling

The application includes basic styling for content elements, including:

- Text elements
- Text with media elements (with different media positions)
- Image elements

You can customize the styling by editing the CSS in the Vue components.