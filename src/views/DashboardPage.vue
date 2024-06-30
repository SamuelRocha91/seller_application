<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Home from '../assets/icons/Home.png';
import PageInfo from '@/components/dashboard/PageInfo.vue';
import NavBar from '../components/dashboard/NavBar.vue';
import NavBarSmall from '../components/dashboard/NavBarSmall.vue';
import HeaderDashboard from '../components/dashboard/HeaderDashboard.vue';
import { useNavStore } from '@/store/navStore';
import HomeDashboard from '@/components/dashboard/HomeDashboard.vue';
import { AnalysisService } from '@/api/analysisService';
import { useStoreActive } from '@/store/storeActive';

const analysisService = new AnalysisService();
const storeActive = useStoreActive().storeActive;
const navStore = useNavStore();
const totalOrders = ref(0);
const pendingOrders = ref(0);
const totalRevenue = ref(0);
const handleClick = () => {
  navStore.setNav();
};
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
<div class="d-flex">
    <template v-if="navStore.navActive">
      <div class="header-nav bg-danger d-flex flex-column align-items-center">
        <div class="filter py-3">
          <img
            class="toggle"
            @click="handleClick"
            src="../assets/navBar/ToggleNav.png"
            alt="Botão para reduzir navbar"
          />
        </div>
        <NavBar />
      </div>
    </template>
    <template v-else>
      <div class="header-nav-small bg-danger d-flex flex-column align-items-center">
        <div class="filter-small py-3">
          <img
            @click="handleClick"
            src="../assets/navBar/ToggleNav.png"
            alt="Botão para aumentar navbar"
          />
        </div>
        <NavBarSmall />
      </div>
    </template>
    <div class="page-content flex-grow-1">
      <div class="header-content">
        <HeaderDashboard />
      </div>
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
    </div>
  </div>
</template>

<style scoped>
.header-nav, .header-nav-small {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  transition: width 0.3s ease;
}

.header-nav {
  width: 15vw;
}

.header-nav-small {
  width: 7vw;
}

.filter img, .filter-small img {
  height: auto;
  max-width: 100%;
}

.page-content {
  margin-left: 15vw;
  transition: margin-left 0.3s ease;
  background-color: gray;
  height: 100%;
}

.header-nav-small ~ .page-content {
  margin-left: 7vw;
}

.header-content {
  height: 17vh;
  background-color: white;
}

main {
  height: 83vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: gray;
}

@media (max-width: 860px) {
  .header-nav, .header-nav-small {
    width: 30vw;
  }
  .header-nav-small {
    width: 15vw;
  }
  .page-content {
    margin-left: 30vw;
  }
  .header-nav-small ~ .page-content {
    margin-left: 15vw;
  }
}

@media (max-width: 540px) {
  .header-nav, .header-nav-small {
    width: 40vw;
  }
  .header-nav-small {
    width: 20vw;
  }
  .page-content {
    margin-left: 40vw;
  }
  .header-nav-small ~ .page-content {
    margin-left: 20vw;
  }
}

@media (max-width: 460px) {
  .header-nav, .header-nav-small {
    width: 50vw;
  }
  .header-nav-small {
    width: 25vw;
  }
  .page-content {
    margin-left: 50vw;
  }
  .header-nav-small ~ .page-content {
    margin-left: 25vw;
  }
}
</style>
