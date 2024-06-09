<script setup lang="ts">
defineProps<{
  order: any,
}>();
</script>
<template>
  <div class="card" >
    <div class="card-header">
      <h1>Pedido {{ order.id }}</h1>
    </div>
    <div class="card-body">
      <p>Status: {{ order.status }}</p>
      <div v-for="(data, index) in order.items" :key="index">
        <p>Produto: {{ data.product }}</p>
        <p>Quantidade: {{ data.amount }}</p>
        <p>Preço:{{ data.price }}</p>
      </div>
    </div>
    <div>
      <p>Total: {{ order.total }}</p>
    </div>
    <div v-if="order.status == 'payment_confirmed'" class="card-footer d-flex justify-content-end">
      <button class="btn btn-success me-2">Aceitar</button>
      <button class="btn btn-danger">Recusar</button>
    </div>
    <div v-if="order.status == 'accepted'" class="card-footer d-flex justify-content-end">
      <button class="btn btn-success me-2">Começar preparo</button>
      <button class="btn btn-danger">Cancelar</button>
    </div>
     <div v-if="order.status == 'in_progress'" class="card-footer d-flex justify-content-end">
      <button class="btn btn-success me-2">Pronto para entrega</button>
      <button class="btn btn-danger">Cancelar</button>
    </div>
  </div>
</template>
