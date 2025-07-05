import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// API service methods
export default {
  /**
   * Get page data by ID
   * @param {number} pageId - The ID of the page to fetch
   * @returns {Promise} - Promise with page data
   */
  getPage(pageId) {
    return api.get(`/page/${pageId}`);
  },

  /**
   * Get page data by slug
   * @param {string} slug - The slug of the page to fetch
   * @returns {Promise} - Promise with page data
   */
  getPageBySlug(slug) {
    return api.get(`/page/slug/${slug}`);
  },

  /**
   * Get menu data
   * @param {number} pageId - The ID of the page to get menu for
   * @returns {Promise} - Promise with menu data
   */
  getMenu(pageId) {
    return api.get(`/menu/${pageId}`);
  }
};