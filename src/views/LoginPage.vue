<script setup lang="ts">
import ImageContainer from '../components/access/ImageContainer.vue';
import HeaderAccess from '@/components/access/HeaderAccess.vue';
import FormLogin from '@/components/forms/FormLogin.vue';
import Vegetais from '../assets/imageContainer/Vegetables.png';
</script>

<template>
  <div class="login-frame">
    <ImageContainer :src="Vegetais" alt="Imagem de uma cesta de vegetais" />
    <main>
      <HeaderAccess />
      <FormLogin />
    </main>
  </div>
</template>

<style scoped>
.login-frame {
  display: flex;
  height: 100vh;
  box-sizing: border-box;
  border: 0px;
  margin: 0px;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 50vw;
  height: 100%;
  margin: auto;
}

@media (max-width: 768px) {
  main {
     width: 40%;
     text-align: center;
  }
}

@media (max-width: 640px) {
  main {
     width: 100%;
     text-align: center;
  }

}
</style>
