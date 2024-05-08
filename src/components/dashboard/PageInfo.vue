<script setup lang="ts">
  defineProps<{
    src: string
    alt: string
    title: string
    description: string
  }>()
</script>
<template>
  <section>
    <div>
        <img :src="src" :alt="alt">
    </div>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
    </div>
  </section>
</template>