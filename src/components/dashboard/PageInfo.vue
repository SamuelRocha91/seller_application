<script setup lang="ts">
  defineProps<{
    src: string
    alt: string
    title: string
    description: string
  }>()
</script>
<template>
  <section class="info-page">
    <div class="info-img">
        <img :src="src" :alt="alt">
    </div>
    <div class="info-text">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
    </div>
  </section>
</template>

<style scoped>
.info-page {
  margin-top: 5px;
  background-color: white;  
  width: 90%;
  height: fit-content;
  border: 1px solid red;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding: 5px;
}

</style>