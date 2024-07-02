<script setup lang="ts">
import { onMounted, ref } from 'vue';
import History from '../assets/icons/History.png';
import PageInfo from '../components/dashboard/PageInfo.vue';
import HistoryOrder from '../components/dashboard/HistoryOrder.vue';
import OrderService from '../api/orderService';
import { useStoreActive } from '@/store/storeActive';
import debounce from 'lodash.debounce';
import OrderDetails from '@/components/dashboard/OrderDetails.vue';
import DashboardLayout from './DashboardLayout.vue';

const category = defineModel('category', { default: '' });
const date = defineModel('date', { default: '' });
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

const selectOrder = (id: number) => {
  OrderService.getOrderById(id, (data: any) => {
    console.log(data);
    orderSelected.value = data;
    orderDetails.value = true;
  });
};

const turnToHistory = () => {
  orderDetails.value = false;
};
onMounted(() => {
  getOrders(1, '', '');
});
</script>

<template>
  <DashboardLayout>
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
      <OrderDetails
        v-else
        :order="orderSelected"
        :turnToHistory="turnToHistory"
      />
      <nav v-if="!orderDetails">
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