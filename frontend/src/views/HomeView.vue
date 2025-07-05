<template>
  <div class="home">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <h1>{{ page.title }}</h1>
      <div v-for="(content, index) in page.content" :key="index">
        <content-element :element="content" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ContentElement from '@/components/ContentElement.vue'

export default {
  name: 'HomeView',
  components: {
    ContentElement
  },
  data() {
    return {
      loading: true,
      error: null,
      page: {
        title: '',
        content: []
      }
    }
  },
  created() {
    this.fetchPageData()
  },
  methods: {
    async fetchPageData() {
      try {
        this.loading = true
        // Fetch the home page data from TYPO3 headless API
        // Using rootPageId 2 from the site configuration
        const response = await axios.get('/api/pages/2')
        this.page = response.data
        this.loading = false
      } catch (error) {
        console.error('Error fetching page data:', error)
        this.error = 'Failed to load page data'
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
