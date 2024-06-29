<script setup lang="ts">
import { type entity } from '@/types/storeType';

const { data, handleClick, handleEdit, handleStatus } = defineProps<{
  data?: Array<entity>
  handleClick: (index: number) => void
  handleEdit: (index: number) => void
  handleStatus: (index: number) => void
  title: string
  tableOne: string
  tableTwo: string
  tableThree: string
  tableFour: string
  handleActive?: (id: number) => void
  handleInventory?: (id: number) => void
  handleStock?: (event: Event, id: number) => void
}>();
</script>
<template>
  <div class="container">
    <table class="table table-bordered">
      <caption>
        {{ title }}
      </caption>
      <thead class="thead-light">
        <tr>
          <th scope="col">{{ tableOne }}</th>
          <th scope="col">{{ tableTwo }}</th>
          <th scope="col">{{ tableThree }}</th>
          <th scope="col">Ações</th>
          <th scope="col" v-if="!handleActive">Gerenciamento de estoque</th>
          <th scope="col">{{ tableFour }}</th>
          <th v-if="handleActive" scope="col">Estado da loja</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entity, index) in data" :key="index">
          <td scope="row" class="image-container">
            <img :src="entity.src" alt="logo" class="uploadedImage">
          </td>
          <td scope="row">{{ entity.name }}</td>
          <td scope="row">{{ entity.category || entity.price }}</td>
          <td scope="row" class="btns-crud">
           <div class="d-flex justify-content-center w-100 gap-2">
              <button class="btn btn-edit mr-1" @click.prevent="handleEdit(entity.id)">Editar</button>
              <button class="btn btn-delete" @click.prevent="handleClick(entity.id)">Deletar</button>
          </div>
          </td>
          <td v-if="!handleActive" scope="row">
            <button v-if="!entity.is_inventory_product && handleInventory" class="btn btn-primary" @click.prevent="handleInventory(entity.id)">Ativar Gerenciamento</button>
            <button v-else-if="entity.is_inventory_product && handleInventory" class="btn btn-danger" @click.prevent="handleInventory(entity.id)">Desativar Gerenciamento</button>
          </td>
          <td scope="row">
            <div v-if="handleActive || !entity.is_inventory_product">
              <input type="checkbox" :id="'toggle-' + index" class="toggle-checkbox" :checked="entity.active" @change="handleStatus(entity.id)" title="Clique para ativar/desativar"/>
              <label title="Clique para ativar/desativar" :for="'toggle-' + index" class="toggle-label"></label>
            </div>
            <div v-else>
              <input v-if="handleStock" type="number" :value="entity.quantity_in_stock || 0" @blur="(event) => handleStock?.(event, entity.id)" min="0">
            </div>
          </td>
          <td v-if="handleActive">
            <button v-if="entity.isOpen" class="btn btn-primary" @click.prevent="handleActive(entity.id)">Fechar loja</button>
            <button v-else class="btn btn-success" @click.prevent="handleActive(entity.id)">Abrir loja</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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

.image-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ccc;
}

.uploadedImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btns-crud {
  display: flex;
  gap: 10px;
}

.btn-delete,
.btn-edit,
.btn-ativar {
  background-color: transparent;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-edit {
  background-color: #007bff;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-ativar {
  background-color: #1ba344;
}

.btn-ativar:hover {
  background-color: #058810;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

.toggle-checkbox {
  display: none;
}

.toggle-label {
  display: inline-block;
  width: 60px;
  height: 30px;
  background-color: #ccc;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
}

.toggle-label::after {
  content: '';
  display: block;
  width: 26px;
  height: 26px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: 0.3s;
}

.toggle-checkbox:not(:checked) + .toggle-label::after {
  transform: translateX(0);
}

.toggle-checkbox:checked + .toggle-label::after {
  transform: translateX(30px);
  background-color: #058810;
}
</style>