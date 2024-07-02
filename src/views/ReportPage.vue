<script setup lang="ts">
import Report from '../assets/icons/Report.png';
import PageInfo from '../components/dashboard/PageInfo.vue';
import ReportsComponent from '../components/dashboard/ReportsComponent.vue';

</script>

<template>
  <main>
    <PageInfo
      :src="Report"
      alt="ícone de perfil"
      title="Relatórios"
      description="Acompanhe de perto o desempenho do seu negócio"
    />
    <ReportsComponent />
  </main>
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
