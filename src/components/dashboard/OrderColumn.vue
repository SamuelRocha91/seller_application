<script setup lang="ts">
import FiltersComponent from './FiltersComponent.vue';
defineProps<{
  orders: any,
  handleSelect: (id: number) => void,
}>();


const getOrderStatusClass = (status: string) => {
  switch (status) {
  case 'payment_confirmed':
    return 'list-group-item-success';
  case 'accepted':
    return 'list-group-item-primary';
  case 'in_progress':
    return 'list-group-item-warning';
  case 'ready_for_delivery':
    return 'list-group-item-info';
  case 'in_delivery':
    return 'list-group-item-secondary';
  default:
    return '';
  }
};

</script>
<template>
 <div class="card">
    <div class="card-body">
      <FiltersComponent />
    </div>
    <div class="card-body">
      <div class="list-group gap-2">
        <div 
          v-for="(data, index) in orders" 
          class="list-group-item" 
          :key="index" 
          :class="getOrderStatusClass(data.status)"
          @click="handleSelect(data.id)"
        >
          <h5 class="mb-1">Número do pedido: ####{{ data.id }}</h5>
          <h5 class="mb-1">Horário: {{ data.hour }}</h5>
          <h5 class="mb-1">Dia: {{ data.date }}</h5>
          <p class="mb-1">Status: {{ data.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  height: 100%;
  box-shadow: 1px 1px 1px rgb(0, 0, 0);
}
.list-group-item-success {
  background-color: #d4edda;
  color: #155724;
}
.list-group-item-primary {
  background-color: #cce5ff;
  color: #004085;
}
.list-group-item-warning {
  background-color: #fff3cd;
  color: #856404;
}
.list-group-item-info {
  background-color: #d1ecf1;
  color: #0c5460;
}
.list-group-item-secondary {
  background-color: #e2e3e5;
  color: #383d41;
}

.list-group-item:hover {
  cursor: pointer;
}
</style>