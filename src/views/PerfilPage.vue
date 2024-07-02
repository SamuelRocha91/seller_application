<script setup lang="ts">
import PageInfo from '@/components/dashboard/PageInfo.vue';
import UserCircle from '../assets/icons/UserCircle.png';
import FormRegisterStore from '@/components/forms/FormRegisterStore.vue';
import DashboardLayout from './DashboardLayout.vue';

</script>

<template>
  <DashboardLayout>
    <main>
      <PageInfo
        :src="UserCircle"
        alt="ícone de perfil"
        title="Perfil"
        description="Gerencie aqui as informações de sua loja
        e permissões de acesso"
      />
      <FormRegisterStore />
    </main>
  </DashboardLayout>
</template>

<style scoped>

main {
  height: 83vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: gray;
}

</style>
