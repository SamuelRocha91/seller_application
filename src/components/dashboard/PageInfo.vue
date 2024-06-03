<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  title: string
  description: string
  display?: boolean
  handleClick?: () => void
}>();
</script>
<template>
  <section class="info-page" >
    <div class="info-image">
      <div class="info-img">
          <img :src="src" :alt="alt">
      </div>
      <div class="info-text">
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
      </div>
    </div>
    <button 
    @click="handleClick"
     v-show="display || false"
      id="enter"
      >
      Adicionar produto
    </button>
  </section>
</template>

<style scoped>
#enter {
  color: #ff1818;
  border: 1px solid #ff1818;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  text-decoration: none;
}

#enter:hover {
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  transition: 3s;
}

.info-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-top: 15px;
}

.info-page {
  margin-top: 5px;
  background-color: white;  
  width: 72%;
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 5px;
}

.info-image {
  margin-top: 5px;
  width: 85%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  gap: 5px;
  padding: 5px;
  border-radius: 5px;
}
h1 {
  font-weight: bold;
  font-size: 20px;
}

</style>