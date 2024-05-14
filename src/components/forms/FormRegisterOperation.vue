<script setup lang="ts">
import { week, hours } from '@/utils/data';
import TableOperation from '../dashboard/TableOperation.vue';
import { onMounted, ref } from 'vue';
import { createStorage } from '@/utils/storage';
import { type operation } from '../../types/OperationType';

const storage = createStorage(true);
const tableData = ref<Array<operation>>([]);
const open = defineModel('open');
const closed = defineModel('closed');
const dayOfWeek = defineModel('dayOfWeek');

onMounted(() => {
  const data = storage.get('operation') || '';
  tableData.value = data == '' ? [] : JSON.parse(data);
});

const saveOperation = () => {
  const data = storage.get('operation') || '';
  const parse = data == '' ? [] : JSON.parse(data);
  const arrayOperation = [
    ...parse,
    {
      open: open.value,
      closed: closed.value,
      day: dayOfWeek.value
    }
  ];
  storage.store('operation', JSON.stringify(arrayOperation));
  tableData.value = arrayOperation;
};

const deleteOPeration = (index: number) => {
  const data = storage.get('operation') || '';
  const parse = data == '' ? [] : JSON.parse(data);
  const dataFiltered = parse
    .filter((_array: Array<operation>, position: number) => index !== position);
  storage.store('operation', JSON.stringify(dataFiltered));
  tableData.value = dataFiltered;
};


</script>
<template>
  <div class="form-content">
    <form>
      <div class="container">
        <p>Dia</p>
        <select name="" id="" class="select-box" v-model="dayOfWeek">
          <option
          v-for="(day, index) in week"
          :key="index"
          :value="day"
          >
          {{ day }}
        </option>
        </select>
      </div>
      <div>
        <p>Hora de abertura</p>
        <select name="" id="" class="select-box" v-model="open">
          <option
          v-for="(hour, index) in hours"
          :key="index"
          :value="hour"
          >
          {{ hour }}
        </option>
        </select>
      </div>
      <div>
        <p>Hora de fechamento</p>
        <select name="" id="" class="select-box" v-model="closed">
          <option v-for="(hour, index) in hours"
          :key="index"
          :value="hour"
          >
          {{ hour }}
        </option>
        </select>
      </div>
      <button
      @click.prevent="saveOperation"
      class="save-form-btn"
      >
      Adicionar
    </button>
    </form>
    <TableOperation 
    :data="tableData" 
    :handleClick="deleteOPeration" 
    />
  </div>
</template>

<style scoped>
.form-content {
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  height: 62vh;
  width: 90%;
  padding: 10px;
}

.select-box {
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
}

form {
  display: flex;
  height: fit-content;
  gap: 20px;
  border: 1px solid black;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
}

.save-form-btn {
  color: #ffffff;
  background-color: #ff1818;
  font-size: 16px;
  width: 80px;
  height: 50px;
  border-radius: 5px;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>
