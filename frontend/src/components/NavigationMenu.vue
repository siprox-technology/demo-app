<template>
  <nav class="navigation-menu mt-3">
    <div v-if="loading" class="text-white">Loading menu...</div>
    <div v-else-if="error" class="alert alert-danger">Error loading menu: {{ error }}</div>
    <div v-else class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid px-0">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li v-for="item in menuItems" :key="item.uid" class="nav-item" :class="{ 'dropdown': item.children && item.children.length > 0 }">
              <router-link v-if="item.link && (!item.children || item.children.length === 0)" :to="formatLink(item.link)" class="nav-link" :class="{ active: item.active }">
                {{ item.title }}
              </router-link>
              <a v-else-if="item.children && item.children.length > 0" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ item.title }}
              </a>
              <span v-else class="nav-link disabled">{{ item.title }}</span>

              <!-- Dropdown menu for child items -->
              <ul v-if="item.children && item.children.length > 0" class="dropdown-menu">
                <li v-for="child in item.children" :key="child.uid">
                  <router-link v-if="child.link" :to="formatLink(child.link)" class="dropdown-item" :class="{ active: child.active }">
                    {{ child.title }}
                  </router-link>
                  <span v-else class="dropdown-item disabled">{{ child.title }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import apiService from '../services/api';

export default {
  props: {
    rootPageId: {
      type: Number,
      default: 1 // Default to the root page ID
    }
  },
  data() {
    return {
      menuItems: [],
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchMenu();
  },
  methods: {
    async fetchMenu() {
      try {
        this.loading = true;
        // Instead of using the menu endpoint which is returning 404,
        // we'll use the page endpoint and extract navigation data from there
        const response = await apiService.getPage(this.rootPageId);

        // Check if the page data contains navigation information
        if (response.data && response.data.navigation) {
          this.menuItems = response.data.navigation;
        } else {
          // Fallback: create a simple menu with just the current page
          this.menuItems = [{
            uid: response.data.id,
            title: response.data.title,
            link: '/',
            active: true,
            children: []
          }];
        }

        this.loading = false;
      } catch (err) {
        this.error = err.message || 'Failed to load menu';
        this.loading = false;
        console.error('Error fetching menu:', err);
      }
    },
    formatLink(link) {
      // Convert TYPO3 links to Vue Router paths
      // Remove domain and any query parameters
      if (!link) return '/';

      // Extract path from URL
      try {
        const url = new URL(link);
        return url.pathname;
      } catch (e) {
        // If link is not a valid URL, return it as is
        return link;
      }
    }
  }
};
</script>

<style>
/* Custom styles to enhance Bootstrap navbar */
.dropdown-menu {
  border-radius: 0;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border: none;
}

.dropdown-item.active, 
.dropdown-item:active {
  background-color: #0d6efd;
}

.nav-link {
  font-weight: 500;
}

.nav-link.active {
  font-weight: 700;
}

/* Keep some spacing for mobile */
@media (max-width: 992px) {
  .navbar-nav .nav-item {
    margin-bottom: 5px;
  }

  .dropdown-menu {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    box-shadow: none;
  }

  .dropdown-item {
    color: white;
  }
}
</style>
