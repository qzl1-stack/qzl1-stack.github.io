<template>
  <div class="app_shell">
    <SiteHeader />
    <main class="page_main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '../components/SiteHeader.vue'
</script>

<style scoped>
.app_shell {
  min-height: 100vh;
  background: var(--bg);
}

.page_main {
  padding-top: var(--header_h);
}
</style>
