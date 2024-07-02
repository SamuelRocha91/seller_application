<script setup lang="ts">
import FormRegisterProduct from '@/components/forms/FormRegisterProduct.vue';
import DashboardLayout from './DashboardLayout.vue';
</script>

<template>
  <DashboardLayout>
    <main>
      <FormRegisterProduct />
    </main>
  </DashboardLayout>
 
</template>

<style scoped>
main {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: gray;
}
</style>
