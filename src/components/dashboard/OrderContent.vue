<script setup lang="ts">
defineProps<{
  order: any,
  acceptOrder?: (id: number) => void,
  cancelOrder?: (id: number) => void,
  startPreparation?: (id: number) => void,
  readyForDelivery?: (id: number) => void,
}>();
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h1>Pedido {{ order.id }}</h1>
    </div>
    <div class="card-body">
      <p class="status-content">Status: {{ order.status }}</p>
      <div v-for="(data, index) in order.items" :key="index" class="order-item">
        <div class="product-info">
          <p>Produto: {{ data.product }}</p>
          <p>Quantidade: {{ data.amount }}</p>
          <p>Preço: R{{ data.price }}</p>
        </div>
        <hr class="divider">
      </div>
    </div>
    <div class="total-section">
      <p class="total" >Total: R{{ order.total }}</p>
    </div>
    <div v-if="order.status == 'payment_confirmed'" class="card-footer d-flex gap-3">
      <button v-if="acceptOrder" @click="acceptOrder(order.id)" class="btn btn-success me-2">Aceitar</button>
      <button v-if="cancelOrder" @click="cancelOrder(order.id)" class="btn btn-danger">Recusar</button>
    </div>
    <div v-if="order.status == 'accepted'" class="card-footer d-flex">
      <button v-if="startPreparation" @click="startPreparation(order.id)" class="btn btn-success me-2">Começar preparo</button>
      <button v-if="cancelOrder" @click="cancelOrder(order.id)" class="btn btn-danger">Cancelar</button>
    </div>
    <div v-if="order.status == 'in_progress'" class="card-footer d-flex">
      <button v-if="readyForDelivery" @click="readyForDelivery(order.id)" class="btn btn-success me-2">Pronto para entrega</button>
      <button v-if="cancelOrder" @click="cancelOrder(order.id)" class="btn btn-danger">Cancelar</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
}
.card-footer {
  background-color: #f8f8f8;
  border-top: 1px solid #ccc;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  gap: 10px;
}

.order-item {
  margin-bottom: 20px;
}

.product-info {
  margin-bottom: 10px;
}

.divider {
  border-top: 1px solid #ccc;
  margin-top: 10px;
  margin-bottom: 10px;
}

.total-section {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.total {
  color: green;
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
}

.status-content {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
