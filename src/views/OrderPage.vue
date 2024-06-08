<script setup lang="ts">
import { ref } from 'vue';

import NavBar from '../components/dashboard/NavBar.vue';
import OrderColumn from '../components/dashboard/OrderColumn.vue';
import OrderContent from '../components/dashboard/OrderContent.vue';
import NavBarSmall from '../components/dashboard/NavBarSmall.vue'; 
import HeaderDashboard from '../components/dashboard/HeaderDashboard.vue';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { onMounted } from 'vue';

const BignavBar = ref(true);
const hasNewOrder = ref(false);
const newOrder = ref([]);

const handleClick = () => {
  BignavBar.value = !BignavBar.value;
};


onMounted(() => {
  const token = localStorage.getItem('token');
  const X_API_KEY = import.meta.env.VITE_X_API_KEY;
  fetchEventSource('http://localhost:3000/stores/1/orders/new', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-API-KEY': X_API_KEY,
    },
    async onopen(response) {
      if(response.ok) {
        console.log('Conexão estabelecida');
      } else {
        console.log('Erro ao estabelecer conexão');
      }
    },
    onmessage(msg) {
      if (msg.event === 'new orders') {
        let data = JSON.parse(msg.data);
        console.log(data.orders);
        if (data.orders && Array.isArray(data.orders)) {
          console.log('dentro');
          newOrder.value = data.orders.map((order: any) => ({
            id: order.id,
            hour: order.created_at.split('T')[1].split('.')[0],
            date: order.created_at.split('T')[0],
            status: order.state,
          }));
          console.log(newOrder.value);
        };
        hasNewOrder.value = true;
      } else {
        console.log('fora');
        hasNewOrder.value = false;
      }
    }
  });
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
      <main class="p-3">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4 w-100 details-order">
              <OrderColumn v-if="hasNewOrder" :orders="newOrder"/>
            </div>
            <div class="col-md-8 w-100 details-order">
              <OrderContent />
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
