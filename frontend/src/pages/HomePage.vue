<template>
  <div class="home-page">
    <div v-if="loading" class="d-flex justify-content-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      Error loading content: {{ error }}
    </div>
    <div v-else>
      <h2 class="display-6 fw-bold mb-4 border-bottom pb-2">
        <i class="bi bi-file-earmark-text me-2"></i>{{ pageData.title }}
      </h2>

      <div v-for="(content, index) in pageData.content" :key="index" class="mb-5">
        <!-- Text content -->
        <div v-if="content.type === 'text'" class="content-element text-content card">
          <div class="card-header bg-light">
            <i class="bi bi-text-paragraph me-2"></i>Text Content
          </div>
          <div class="card-body" v-html="content.content"></div>
        </div>

        <!-- Media content -->
        <div v-else-if="content.type === 'textmedia'" class="content-element media-content card">
          <div class="card-header bg-light">
            <i class="bi bi-images me-2"></i>Media Content
          </div>
          <div class="card-body" v-html="content.content"></div>
          <div class="media-gallery p-3" v-if="content.media && content.media.length > 0">
            <div class="row g-4">
              <div 
                v-for="(file, fileIndex) in content.media" 
                :key="fileIndex" 
                class="col-lg-4 col-md-6 col-sm-12 media-item"
              >
                <div class="card h-100">
                  <img 
                    v-if="file.properties.mime_type.includes('image')" 
                    :src="file.publicUrl" 
                    :alt="file.properties.alternative || file.properties.title || ''" 
                    :title="file.properties.title || ''"
                    class="card-img-top"
                  />
                  <video 
                    v-else-if="file.properties.mime_type.includes('video')" 
                    controls
                    :src="file.publicUrl"
                    :title="file.properties.title || ''"
                    class="card-img-top"
                  ></video>
                  <div class="card-body" v-if="file.properties.title">
                    <h5 class="card-title">{{ file.properties.title }}</h5>
                    <p class="card-text" v-if="file.properties.description">{{ file.properties.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api';

export default {
  data() {
    return {
      pageData: null,
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchPageData();
  },
  methods: {
    async fetchPageData() {
      try {
        this.loading = true;
        // Fetch the page with ID 1 (or replace with the actual page ID)
        const response = await apiService.getPage(1);
        this.pageData = response.data;
        this.loading = false;
      } catch (err) {
        this.error = err.message || 'Failed to load page data';
        this.loading = false;
        console.error('Error fetching page data:', err);
      }
    }
  }
};
</script>

<style>
/* Custom styles to enhance Bootstrap components */
.home-page {
  margin-bottom: 30px;
}

.content-element {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: all 0.3s ease;
}

.content-element:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 1.5rem;
}

/* Style for content from TYPO3 */
.card-body h1, .card-body h2, .card-body h3, .card-body h4, .card-body h5, .card-body h6 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.2;
}

.card-body p {
  margin-bottom: 1rem;
}

.card-body a {
  color: #0d6efd;
  text-decoration: none;
}

.card-body a:hover {
  color: #0a58ca;
  text-decoration: underline;
}

.card-body ul, .card-body ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.media-gallery .card {
  overflow: hidden;
  transition: transform 0.3s ease;
}

.media-gallery .card:hover {
  transform: translateY(-5px);
}

.media-gallery .card-img-top {
  height: 200px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .media-gallery .card-img-top {
    height: 180px;
  }
}
</style>
