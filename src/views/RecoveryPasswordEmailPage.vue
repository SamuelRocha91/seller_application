<script setup lang="ts">
import ImageContainer from '@/components/access/ImageContainer.vue'
import Bruschetta from '../assets/imageContainer/Bruschetta.jpg'
import HeaderAccess from '@/components/access/HeaderAccess.vue'
import FormRecoveryPasswordEmail from '@/components/forms/FormRecoveryPasswordEmail.vue'
</script>

<template>
  <div class="login-frame">
    <ImageContainer :src="Bruschetta" alt="pão, azeite e alho" />
    <main>
      <HeaderAccess />
      <FormRecoveryPasswordEmail />
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
