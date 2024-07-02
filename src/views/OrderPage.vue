<script setup lang="ts">
import { ref } from 'vue';
import OrderColumn from '../components/dashboard/OrderColumn.vue';
import OrderContent from '../components/dashboard/OrderContent.vue';
import { onMounted } from 'vue';
import orderService from '@/api/orderService';
import { useStoreActive } from '@/store/storeActive';
import ChatComponent from '@/components/dashboard/ChatComponent.vue';

const hasNewOrder = ref(false);
const isLoading = ref(false);
const newOrder = ref([]);
const orderSelected = ref<any>(null);
const storeActive = useStoreActive().storeActive;


const selectOrder = (id: number) => {
  orderService.getOrderById(id, (data: any) => {
    orderSelected.value = data;
  });
};

const acceptOrder = (id: number) => {
  orderService.acceptOrder(storeActive.id, id, () => {
    newOrder.value.map((order: any) => {
      if (order.id === id) {
        order.status = 'accepted';
      }
    });
    orderSelected.value = null;
  });
};

const cancelOrder = (id: number) => {
  orderService.cancelOrder(storeActive.id, id, () => {
    newOrder.value = newOrder.value.filter((order: any) => order.id !== id);
    orderSelected.value = null;
  });
};

const startPreparation = (id: number) => {
  orderService.startPreparation(storeActive.id, id, () => {
    newOrder.value.map((order: any) => {
      if (order.id === id) {
        order.status = 'in_progress';
      }
    });
    orderSelected.value = null;
  });
};

const readyForDelivery = (id: number) => {
  orderService.readyForDelivery(storeActive.id, id, () => {
    newOrder.value.map((order: any) => {
      if (order.id === id) {
        order.status = 'ready_for_delivery';
      }
    });
    orderSelected.value = null;
  });
};

onMounted(() => {
  isLoading.value = true;
  orderService.connectToOrderStream(storeActive.id, (data: any) => {
    let parsedData = JSON.parse(data);
    if (parsedData.orders && Array.isArray(parsedData.orders)) {
      newOrder.value = parsedData.orders.map((order: any) => ({
        id: order.id,
        hour: order.created_at.split('T')[1].split('.')[0],
        date: order.created_at.split('T')[0],
        status: order.state,
      }));
      isLoading.value = false;
      hasNewOrder.value = true;
    } else {
      hasNewOrder.value = false;
      isLoading.value = false;
    }
  }, () => {
    isLoading.value = false;
  });
});
</script>

<template>
  <main class="p-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 w-100 details-order" style="max-height: 85vh; overflow-y: auto;">
          <OrderColumn v-if="hasNewOrder" :orders="newOrder" :handleSelect="selectOrder"/>
        </div>
        <div class="col-md-8 w-100 details-order">
          <OrderContent
            v-if="orderSelected"
            :order="orderSelected"
            :acceptOrder="acceptOrder"
            :cancelOrder="cancelOrder"
            :startPreparation="startPreparation"
            :readyForDelivery="readyForDelivery"
          />
          <ChatComponent class="chat-component" v-if="orderSelected" :orderId="orderSelected.id"/>
          <div v-else class="d-flex align-items-center justify-content-center not-content">
            <h2>Você ainda não selecionou nenhum pedido</h2>
          </div>
        </div>
      </div>
    </div>
  </main>    
</template>

<style scoped>

main {
  height: 100vh;
  background-color: gray;
  background-color: gray;
}

.chat-component {
  position: fixed;
  bottom: 0;
  background-color: rgb(216, 197, 197);
  max-width: 20%;
  box-shadow: 0px 0px 10px 0px #000000;
}

</style>
