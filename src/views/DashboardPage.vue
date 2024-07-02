<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Home from '../assets/icons/Home.png';
import PageInfo from '@/components/dashboard/PageInfo.vue';
import HomeDashboard from '@/components/dashboard/HomeDashboard.vue';
import { AnalysisService } from '@/api/analysisService';
import { useStoreActive } from '@/store/storeActive';
import DashboardLayout from './DashboardLayout.vue';

const analysisService = new AnalysisService();
const storeActive = useStoreActive().storeActive;
const totalOrders = ref(0);
const pendingOrders = ref(0);
const totalRevenue = ref(0);

onMounted(() => {
  analysisService.getTotalOrders(storeActive.id, (data) => {
    totalOrders.value = data.result;
  });
  analysisService.getPendingOrders(storeActive.id, (data) => {
    pendingOrders.value = data.result;
  });
  analysisService.getTotalSales(storeActive.id, (data) => {
    totalRevenue.value = data.result;
  });
});

</script>

<template>
  <DashboardLayout>
    <main>
      <PageInfo
        :src="Home"
        alt="Home"
        title="Bem vindo ao Dashboard"
        description="Visão geral de sua loja"
      />
      <HomeDashboard
        :totalOrders="totalOrders"
        :pendingOrders="pendingOrders"
        :totalRevenue="totalRevenue"
      />
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
