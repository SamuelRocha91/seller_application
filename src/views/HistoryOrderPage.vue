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
import OrderContent from '@/components/dashboard/OrderContent.vue';

const category = defineModel('category', { default: '' });
const date = defineModel('date', { default: '' });
const BignavBar = ref(true);
const orders = ref<any[]>([]);
const store = useStoreActive().storeActive;
const current = ref(0);
const next = ref(0);
const orderDetails = ref(false);
const orderSelected = ref(null);
const previous = ref(0);
const pages = ref(0);

const filteredOrders = () => {
  getOrders(1, date.value, category.value.toLowerCase());
};

const debouncedSearch = debounce(filteredOrders, 300);

const getOrders = (page: number, date: string, category: string) => {
  OrderService.getOrders(store.id, (data: any) => {
    console.log(data);
    orders.value = data.result.orders;
    next.value = data.result.pagination.next || 1;
    pages.value = data.result.pagination.pages;
    current.value = data.result.pagination.current || 1;
    previous.value = data.result.pagination.previous || 1;
  }, page, date, category, );
};

const handlePage = (page: number) => {
  if (page > 0 && page <= pages.value) {
    getOrders(page, date.value, category.value.toLowerCase());
  }
};

const handleClick = () => {
  BignavBar.value = !BignavBar.value;
};

const selectOrder = (id: number) => {
  OrderService.getOrderById(id, (data: any) => {
    orderSelected.value = data;
  });
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
        v-if="!orderDetails"
        :orders="orders"
        :filteredOrders="debouncedSearch"
        :selectOrder="selectOrder"
        v-model:category="category"
        v-model:date="date"
        />
        <OrderContent 
        v-else
        order="orderSelected"
        />
        <nav>
        <ul class="pagination justify-content-end">
          <li class="page-item" :class="{ disabled: current === 1 }">
            <a class="page-link" href="#" @click.prevent="handlePage(previous)">
              Anterior
            </a>
          </li>
          <li class="page-item" v-for="page in pages" :key="page" :class="{ active: current === page }">
            <a class="page-link" href="#" @click.prevent="handlePage(page)">
              {{ page }}
            </a>
          </li>
          <li class="page-item" :class="{ disabled: current === pages }">
             <a class="page-link" href="#" @click.prevent="handlePage(next)">
               Próxima
             </a>
          </li>
        </ul>
      </nav>
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