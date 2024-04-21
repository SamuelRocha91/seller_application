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
