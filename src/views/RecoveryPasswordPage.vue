<script setup lang="ts">
import HeaderAccess from '../components/access/HeaderAccess.vue';
import ImageContainer from '../components/access/ImageContainer.vue';
import Hamburguer from '../assets/imageContainer/Hamburger.jpg'
</script>

<template>
  <div class="login-frame">
    <ImageContainer :src="Hamburguer" alt="Imagem de um hambúrguer com fritas" />
    <main>
      <HeaderAccess />
    </main>
  </div>
</template>