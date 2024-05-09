<script setup lang="ts">
import { type operation } from '../../types/OperationType'


const { data, handleClick } = defineProps<{
  data: Array<operation>
  handleClick: (index: number) => void
}>()

</script>
<template>
  <table>
    <caption>
      Agenda semanal de funcionamento do estabelecimento
    </caption>
    <thead>
      <tr>
        <th scope="col">Dia</th>
        <th scope="col">Horário de abertura</th>
        <th scope="col">Horário de fechamento</th>
        <th scope="col">Excluir agenda</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(operation, index) in data" :key="index">
        <td>{{ operation.day }}</td>
        <td>{{ operation.open }}</td>
        <td>{{ operation.closed }}</td>
        <td class="btn-delete"><button @click.prevent="handleClick(index)">X</button></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
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

tbody td {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

tbody tr:last-child td {
  border-bottom: none;
}

button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}


button:hover {
  background-color: #c82333;
}

</style>
