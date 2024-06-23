<script setup lang="ts">
import { onMounted, ref } from 'vue';
import NavBar from '../components/dashboard/NavBar.vue';
import NavBarSmall from '../components/dashboard/NavBarSmall.vue';
import HeaderDashboard from '../components/dashboard/HeaderDashboard.vue';
import History from '../assets/icons/History.png';
import PageInfo from '../components/dashboard/PageInfo.vue';
import HistoryOrder from '../components/dashboard/HistoryOrder.vue';
import OrderService from '../api/orderService';
import { useStoreActive } from '@/store/storeActive';
import debounce from 'lodash.debounce';

const category = defineModel('category', { default: '' });
const date = defineModel('date', { default: '' });
const BignavBar = ref(true);
const orders = ref<any[]>([]);
const store = useStoreActive().storeActive;

const filteredOrders = () => {
  getOrders(1, date.value, category.value.toLowerCase());
};

const debouncedSearch = debounce(filteredOrders, 300);

const getOrders = (page: number, date: string, category: string) => {
  OrderService.getOrders(store.id, (data: any) => {
    console.log(data);
    orders.value = data;
  }, page, date, category, );
};

const handleClick = () => {
  BignavBar.value = !BignavBar.value;
};

onMounted(() => {
  getOrders(1, '', '');
});
</script>

<template>
<div class="d-flex">
    <template v-if="BignavBar">
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
          :src="History"
          alt="Histórico de pedidos"
          title="Histórico de pedidos"
          description="Tenha acesso a todos os seus pedidos feitos na plataforma."
        />
        <HistoryOrder
        :orders="orders"
        :filteredOrders="debouncedSearch"
        v-model:category="category"
        v-model:date="date"
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