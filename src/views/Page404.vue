<template>
  <div class="app">
    <div>
      <h1>404 Page not found</h1>
      <p class="message">Oops! I may have chewed up this page</p>
      <router-link :to="`/`" class="link">
        Click here to return home
      </router-link>
    </div>

    <img src="../../public/dog404.png" alt="" />
  </div>
</template>

<script></script>

<style scoped>
.message {
  font-size: 2rem;
}

.link {
  font-size: 1.2rem;
}
</style>
