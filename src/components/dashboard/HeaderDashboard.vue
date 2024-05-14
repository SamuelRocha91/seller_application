<script setup lang="ts">
import { onMounted } from 'vue';
import { Auth } from '../../utils/auth';
import { useStoreActive } from '@/store/storeActive';
import { StoreService } from '@/utils/storeService';

const auth = new Auth();
const user = auth.currentUser();
const store = useStoreActive();
const storeService = new StoreService();

onMounted(() => {
  const storage = storeService.getFallback('stores') || '';
  const storageParse = storage !== '' ? JSON.parse(storage) : null;
  if (storageParse !== null) {
    const active = storageParse.find((field: any) => field.active == true);
    const objectActive = {
      ...active
    };
    store.setStore(objectActive);
  }
});

</script>
<template>
  <header>
    <h1 
    v-if="user && !store.storeActive.active"
    >
    Seja bem vindo(a), {{ user.email || '' }}
    </h1>
    <div v-else>
      <img :src="store.storeActive.src" alt="logo da loja">
      <h1>{{ store.storeActive.name }}</h1>
    </div>
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