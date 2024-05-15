<script setup lang="ts">
import { type entity } from '../../types/entityType';

const { data, handleClick, handleEdit, handleStatus } = defineProps<{
  data?: Array<entity>
  handleClick: (index: number) => void
  handleEdit: (index: number) => void
  handleStatus: (index: number) => void
  title: string
  tableOne: string
  tableTwo: string
  tableThree: string
}>();

</script>
<template>
  <table>
    <caption>
      {{ title }}
    </caption>
    <thead>
      <tr>
        <th scope="col">{{ tableOne }}</th>
        <th scope="col">{{ tableTwo }}</th>
        <th scope="col">{{ tableThree }}</th>
        <th scope="col">Ações</th>
        <th scope="col">Ativar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entity, index) in data" :key="index">
        <td scope="row"  class="image-container"><img :src="entity.src" 
          alt="logo da loja" class="uploadedImage "></td>
        <td scope="row" >{{ entity.name }}</td>
        <td scope="row" >{{ entity.price }}</td>
        <td scope="row" class="btns-crud">
          <button 
          class="btn-edit" 
          @click.prevent="handleEdit(entity.id)"
          >
          Editar
          </button>
          <button 
          class="btn-delete" 
          @click.prevent="handleClick(entity.id)"
          >
          Deletar
          </button>
        </td>
        <td scope="row" >
          <input 
          type="checkbox"
          :id="'toggle-' + index"
          class="toggle-checkbox"
          :checked="entity.active"
          @change="handleStatus(entity.id)" 
          title="Clique para ativar/desativar"
          /> 
          <label 
          title="Clique para ativar/desativar"
          :for="'toggle-' + index"
           class="toggle-label">
          </label>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  table-layout: fixed;
}

caption {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
}

thead th {
  background-color: #f2f2f2;
  color: #333;
  padding: 10px;
  text-align: left;
}

tbody {
  width: 100%;
}

tbody tr {
  border-bottom: 1px solid #d1cfcf;
  height: 60px; 
  width: 100%;
}

tbody tr:last-child td {
  border-bottom: none;
}

td {
  padding: 10px;
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

.store-status {
  color: #088d14;
  font-weight: bold;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}

.uploadedImage {
  max-width: 60px;
  max-height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.btns-crud {
  display: flex;
  height: 100%;
  gap: 10px;
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