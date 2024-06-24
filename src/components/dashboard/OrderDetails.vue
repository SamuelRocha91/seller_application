<script setup lang="ts">
defineProps<{
  order: any,
  turnToHistory: () => void
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
          <p>Preço: {{ data.price.replace('$', 'R$') }}</p>
        </div>
        <hr class="divider">
      </div>
    </div>
    <div class="total-section">
      <p class="total" >Total: R${{ order.total.replace('$', '') }}</p>
      <button @click="turnToHistory" class="btn btn-primary">Voltar pro histórico</button>
    </div>
  </div>
</template>

<style scoped>
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
  display: flex;
  justify-content: space-between;
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

.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 61vw;
  gap: 20px;
}
</style>
