<script setup lang="ts">
import { Auth } from '../../utils/auth';
const auth = new Auth();
const user = auth.currentUser()
</script>
<template>
  <header>
    <h1 v-if="user">Seja bem vindo, {{ user.email || '' }}</h1>
  </header>
</template>
<style scoped>
  header {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100%;
    width: 100%;
  }
</style>