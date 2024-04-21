<script setup lang="ts">
import ImageContainer from '../components/access/ImageContainer.vue'
import HeaderAccess from '@/components/access/HeaderAccess.vue';
import FormLogin from '@/components/forms/FormLogin.vue';
import Vegetais from '../assets/imageContainer/Vegetables.png'
</script>

<template>
  <div class="login-frame">
    <ImageContainer :src="Vegetais"  alt="Imagem de uma cesta de vegetais" />
    <main>
      <HeaderAccess />
      <FormLogin />
    </main>
  </div>
</template>
