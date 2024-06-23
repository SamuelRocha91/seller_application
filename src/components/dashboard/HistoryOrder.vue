<script setup lang="ts">
defineProps<{
  orders: any
  filteredOrders: () => void
  selectOrder: (id: number) => void
}>();

const date = defineModel('date', { default: '' });
const category = defineModel('category', { default: '' });

</script>
<template>
  <div class="order-page">
    <div class="filters">
        <select 
          name="status"
          id="status" 
          v-model="category"
          @change="filteredOrders"
        >
          <option hidden>Busca por status</option>
          <option value="in_delivery">Em entrega</option>
          <option value="delivered">Finalizado</option>
          <option value="canceled">Cancelado</option>
        </select>
        <input type="date" @change="filteredOrders" v-model="date">
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Número do pedido</th>
            <th scope="col">Valor</th>
            <th scope="col">Status</th>
            <th scope="col">Data</th>
          </tr>
        </thead>
        <tbody v-if="orders" >
          <tr v-for="order in orders" :key="order.id" @click="selectOrder(order.id)">
            <td scope="row">{{ `###${order.id}` }}</td>
            <td scope="row">{{ `R$${order.total_value}0` }}</td>
            <td scope="row">{{ order.state }}</td>
            <td scope="row">{{ order.created_at.split('T')[0] }}</td>
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

.filters select {
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: rgb(206, 201, 201);
}

.filters input {
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: rgb(206, 201, 201);
  padding: 5px
}

table {
  width: 100%;
  margin-bottom: 20px;
}

caption {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  caption-side: top;
}

th {
  background-color: #d2d7dd;
  border: 1px solid #ccc;
  padding: 10px;
}
td {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>