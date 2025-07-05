<template>
  <div class="app">
    <header class="bg-primary text-white py-3 mb-4">
      <div class="container">
        <h1 class="display-5 fw-bold">TYPO3 Headless Vue.js Frontend</h1>
        <NavigationMenu />
      </div>
    </header>
    <main class="container mb-5">
      <router-view />
    </main>
    <footer class="bg-light py-3 mt-5">
      <div class="container text-center">
        <p class="text-muted mb-0">&copy; {{ new Date().getFullYear() }} TYPO3 Headless Vue.js Demo</p>
      </div>
    </footer>
  </div>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue';

export default {
  components: {
    NavigationMenu
  }
};
</script>

<style>
body {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header h1 {
  margin-bottom: 0.5rem;
}

main {
  flex: 1;
  padding: 2rem 0;
}

footer {
  margin-top: auto;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
}

/* Custom scrollbar for modern browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #0d6efd;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0a58ca;
}
</style>
