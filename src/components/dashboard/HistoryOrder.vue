<script setup lang="ts">
import { ref } from 'vue';

const orders = ref<any[]>([]);

</script>
<template>
  <div class="order-page">
    <div class="filters">
        <select name="status" id="status">
            <option hidden>Busca por status</option>
            <option value="in_delivery">Em entrega</option>
            <option value="delivered">Finalizado</option>
            <option value="canceled">Cancelado</option>
        </select>
        <input type="date">
    </div>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Número do pedido</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody v-if="orders" >
                <tr v-for="order in orders" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ order.price }}</td>
                  <td>{{ order.state }}</td>
                  <td>{{ order.date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>
<style scoped>
.order-page {
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 60vh;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 61vw;
  gap: 20px;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  height: 20px;
}
</style>