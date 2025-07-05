<template>
  <div class="content-element" :class="element.type">
    <!-- Text element -->
    <div v-if="element.type === 'text'" class="text-element">
      <div v-html="element.bodytext"></div>
    </div>

    <!-- Text with media element -->
    <div v-else-if="element.type === 'textmedia'" class="textmedia-element">
      <div class="media-container" :class="mediaPositionClass">
        <div v-for="(file, fileIndex) in element.media" :key="fileIndex" class="media-item">
          <img v-if="isImage(file)" :src="file.publicUrl" :alt="file.alternative || ''" :title="file.title || ''" />
          <video v-else-if="isVideo(file)" controls>
            <source :src="file.publicUrl" :type="file.mimeType">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div class="text-container" v-html="element.bodytext"></div>
    </div>

    <!-- Image element -->
    <div v-else-if="element.type === 'image'" class="image-element">
      <div class="image-container">
        <div v-for="(file, fileIndex) in element.media" :key="fileIndex" class="image-item">
          <img :src="file.publicUrl" :alt="file.alternative || ''" :title="file.title || ''" />
        </div>
      </div>
    </div>

    <!-- Default fallback for other element types -->
    <div v-else class="unknown-element">
      <p>Unsupported content element type: {{ element.type }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentElement',
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  computed: {
    mediaPositionClass() {
      // TYPO3 uses values like 0 (above), 8 (below), 17 (left), 18 (right)
      const position = this.element.imageorient || 0;
      
      if (position === 0) return 'media-above';
      if (position === 8) return 'media-below';
      if (position === 17) return 'media-left';
      if (position === 18) return 'media-right';
      
      return 'media-above'; // Default
    }
  },
  methods: {
    isImage(file) {
      return file.mimeType && file.mimeType.startsWith('image/');
    },
    isVideo(file) {
      return file.mimeType && file.mimeType.startsWith('video/');
    }
  }
}
</script>

<style scoped>
.content-element {
  margin-bottom: 2rem;
}

.text-element, .textmedia-element, .image-element {
  width: 100%;
}

.media-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.media-item, .image-item {
  max-width: 100%;
}

.media-item img, .image-item img, .media-item video {
  max-width: 100%;
  height: auto;
}

/* Media positioning styles */
.media-above {
  order: -1;
}

.media-below {
  order: 1;
}

.media-left {
  float: left;
  margin-right: 1rem;
  max-width: 50%;
}

.media-right {
  float: right;
  margin-left: 1rem;
  max-width: 50%;
}

.textmedia-element {
  display: flex;
  flex-direction: column;
}

.textmedia-element.media-left, .textmedia-element.media-right {
  flex-direction: row;
  align-items: flex-start;
}

.text-container {
  flex: 1;
}
</style>