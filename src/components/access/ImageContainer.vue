<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()
</script>
<template>
  <section class="picture-login">
    <div id="logo">
      <img :src="src" id="food" :alt="alt" />
    </div>
  </section>
</template>

<style scoped>
.picture-login {
  display: flex;
  width: 50vw;
  height: 100vh;
}

#logo {
  width: 100%;
  height: 100%;
  display: flex;
}

#food {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

@media (max-width: 640px) {
  .picture-login {
    display: none;
  }
}
</style>
