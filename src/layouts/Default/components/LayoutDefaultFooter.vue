<template>
  <footer class="footer">
    <div class="footer-links _container">
      <a target="_blank" :href="telegramLink">
        <img src="@/assets/icons/telegramLogo.svg" width="24" height="24" alt="Telegram Logo" />
      </a>
      <a target="_blank" :href="githubLink">
        <img src="@/assets/icons/githubLogo.svg" width="24" height="24" alt="Github Logo" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const telegramLink = import.meta.env.VITE_TELEGRAM_LINK;
const githubLink = import.meta.env.VITE_GITHUB_LINK;
</script>

<style>
.footer {
  border-top: 1px solid var(--color-blue-200);
  background-color: var(--color-white);
}

.footer-links {
  padding: 0.5rem 0;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
