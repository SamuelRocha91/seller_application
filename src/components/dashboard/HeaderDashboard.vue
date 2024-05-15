<script setup lang="ts">
import { onMounted } from 'vue';
import { Auth } from '../../utils/auth';
import { useStoreActive } from '@/store/storeActive';
import { StoreService } from '@/api/storeService';

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
    <div class="header-container" v-else>
      <div class="header-wrapper">
        <div class="store-perfil">
          <div class="image-container " >
            <img class="store-image"
            :src="store.storeActive.src" alt="logo da loja" />
          </div>
          <h1>{{ store.storeActive.name }}</h1>
        </div>
        <a href="">Fechar agora</a>
      </div>
      <div class="store-status">
        <img src="../../assets/icons/Subtract.png" alt="ícone de abertura">
        <div>
          <h2>Loja aberta</h2>
          <p>Dentro do horário</p>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100%;
    width: 100%;
  }

.header-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    border: 1px solid black;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}

 .header-container h1 {
  font-size: 35px;
  font-weight: bold;
}

.store-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.store-status {
  width: 20%;
}

.store-perfil {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.store-status {
  border-left: 1px solid rgb(212, 198, 198);
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 25px;
}

.header-container a {
    font-size: 25px;
    color: #FF1818;
}

.store-status h2 {
  color: #3CB85F;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-left: 90px;
}
</style>@/api/storeService