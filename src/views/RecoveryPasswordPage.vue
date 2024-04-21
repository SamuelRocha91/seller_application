<script setup lang="ts">
import HeaderAccess from '../components/access/HeaderAccess.vue';
import ImageContainer from '../components/access/ImageContainer.vue';
import Hamburguer from '../assets/imageContainer/Hamburger.jpg'
import FormRecoveryPassword from '../components/forms/FormRecoveryPassword.vue'
</script>

<template>
  <div class="login-frame">
    <ImageContainer :src="Hamburguer" alt="Imagem de um hambúrguer com fritas" />
    <main>
      <HeaderAccess />
      <FormRecoveryPassword />
    </main>
  </div>
</template>