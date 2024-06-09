<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '../components/dashboard/NavBar.vue';
import OrderColumn from '../components/dashboard/OrderColumn.vue';
import OrderContent from '../components/dashboard/OrderContent.vue';
import NavBarSmall from '../components/dashboard/NavBarSmall.vue'; 
import HeaderDashboard from '../components/dashboard/HeaderDashboard.vue';
import { onMounted } from 'vue';
import orderService from '@/api/orderService';
import { useStoreActive } from '@/store/storeActive';

const BignavBar = ref(true);
const hasNewOrder = ref(false);
const newOrder = ref([]);
const orderSelected = ref(null);
const storeActive = useStoreActive().storeActive;

const handleClick = () => {
  BignavBar.value = !BignavBar.value;
};

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
  orderService.connectToOrderStream(storeActive.id, (data: any) => {
    let parsedData = JSON.parse(data);
    if (parsedData.orders && Array.isArray(parsedData.orders)) {
      newOrder.value = parsedData.orders.map((order: any) => ({
        id: order.id,
        hour: order.created_at.split('T')[1].split('.')[0],
        date: order.created_at.split('T')[0],
        status: order.state,
      }));
      hasNewOrder.value = true;
    } else {
      hasNewOrder.value = false;
    }
  });
});
</script>

<template>
  <div class="d-flex color-back">
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
            <div v-else class="d-flex align-items-center justify-content-center not-content">
              <h2>Você ainda não selecionou nenhum pedido</h2>
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.details-order {
  background-color: gray;
}
.color-back {
  background-color: gray;
  height: 100vh;
}
.header-nav, .header-nav-small {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  transition: width 0.5s ease;
}

.header-nav {
  width: 15vw;
}

.header-nav-small {
  width: 7vw;
}

.not-content {
 background-color: white;
 height: 500px;
}

.filter img, .filter-small img {
  height: auto;
  max-width: 100%;
}

.page-content {
  margin-left: 15vw;
  transition: margin-left 0.3s ease;
  background-color: gray;
}

.header-nav-small ~ .page-content {
  margin-left: 7vw;
}

.header-content {
  height: 17%;
  background-color: white;
}

main {
  height: 100vh;
  background-color: gray;
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
