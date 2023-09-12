<template>
  <div class="app">
    <nav>
      <router-link class="link" :to="`/authors`">Authors</router-link>
      <router-link class="link" :to="`/posts`">Posts</router-link>
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<script></script>

<style scoped>
nav {
  display: flex;
  column-gap: 15px;
}

.link {
  text-decoration: none;
  font-size: 1.6rem;
}
.link:hover {
  opacity: 0.8;
}
.app {
  padding-top: 30px;
}
</style>
