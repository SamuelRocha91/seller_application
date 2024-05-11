<script setup lang="ts">
defineProps<{
  selected: boolean
  handleSelect: () => void
  buttonOne: string
  buttonTwo: string
}>();
</script>
<template>
  <nav class="link-form">
    <ul>
      <button
        @click="handleSelect"
         :class="[selected ? 'selected' : 'no-select' ]"
         >
         {{ buttonOne }}
        </button>
      <button
       @click="handleSelect"
        :class="[selected ? 'no-select' : 'selected' ]"
        >
        {{ buttonTwo }}
      </button>
    </ul>
  </nav>
</template>
<style scoped>
.link-form {
  background-color: white;  
  width: 90%;
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding: 5px;
}

ul {
  display: flex;
  gap: 40px;
  margin-left: 10px;
  text-decoration: none;
  padding: 10px;
}

button {
  background-color: white;
}

button:hover {
  cursor: pointer;
}

.selected {
  text-decoration: underline;
  color: black;
  transition: 0.3s;
}
.no-select {
  color: black;
  opacity: 0.6;
  transition: 0.3s;
}
</style>