<script setup lang="ts">
import OrderListComponent from './OrderListComponent.vue';
import FiltersComponent from './FiltersComponent.vue';
</script>
<template>
  <div class="card">
    <div class="card-body">
      <FiltersComponent />
    </div>
    <div class="card-body">
      <OrderListComponent />
    </div>
  </div>
</template>
