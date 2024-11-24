<template>
  <footer class="footer">
    <div class="footer-links">
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
//почекать поч футер такой гигантский и что можно с этим сделать(проблема решается тем что height: 100dvh;)
const telegramLink = import.meta.env.VITE_TELEGRAM_LINK;
const githubLink = import.meta.env.VITE_GITHUB_LINK;
</script>

<style>
.footer {
  border-top: 1px solid var(--color-blue-950);
}
.footer-links {
  width: 90%;
  margin: 0 auto;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
