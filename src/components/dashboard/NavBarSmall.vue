<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import { Auth } from '@/utils/auth';
import { swalSuccess } from '@/utils/swal';
import { computed } from 'vue';
import { useStoreActive } from '@/store/storeActive';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();
const color = useStoreActive();
const route = useRoute();
const auth = new Auth();
const navStyle = computed(() => {
  return {
    backgroundColor: color.storeActive.colorTheme || 'white'
  };
});
const logout = () => {
  auth.signOut(
    () => swalSuccess('Sessão encerrada com sucesso')
  );
};

const handleManager = () => {
  const storeActive = useStoreActive().storeActive;
  if (storeActive.active) {
    router.push('/dashboard/gerenciar-loja');
  } else {
    Swal.fire('É necessário ativar uma loja pra poder fazer o gerenciamento');
  }
};

</script>
<template>
  <nav class="nav-links"  :style="navStyle">
    <ul>
      <li class="links-button">
        <img
        class="image-dimension"
        src="../../assets/navBar/Home.png"
        alt="Ícone de home" 
        />
        <RouterLink
        class="links-style"
        to="/dashboard"
        >
        Início
      </RouterLink>
      </li>
      <li class="links-button" :class="{ 'active': $route.path === '/dashboard/pedidos' }">
        <img
        class="image-dimension"
        src="../../assets/navBar/Order.png"
        alt="ícone de pedidos"
        />
        <RouterLink
        class="links-style"
        to="/dashboard/pedidos"
        >
        Pedidos
      </RouterLink>
      </li>
      <li class="links-button">
        <img
        :class="{ 'active': $route.path === '/dashboard/gerenciar-loja' }"
        class="image-dimension"
        src="../../assets/navBar/Store.png"
        alt="ícone de loja"
         />
        <a
         class="links-style"
         @click.prevent="handleManager"
         >
         Gerenciar loja
        </a>
      </li>
      <li class="links-button">
        <img
          class="image-dimension"
          src="../../assets/navBar/Reports.png"
          alt="ícone de relatório"
        />
        <RouterLink
        class="links-style"
        to="/dashboard/relatorios"
        >
        Relatórios
      </RouterLink>
      </li>
      <li class="links-button">
        <img
          class="image-dimension"
          src="../../assets/navBar/Finance.png"
          alt="ícone de finanças"
        />
        <RouterLink
        class="links-style"
        to="/dashboard/finacas"
        >
        Finanças
      </RouterLink>
      </li>
      <li
      class="links-button"
      :class="{ 'active': route.path === '/dashboard/perfil' }">
        <img
          class="image-dimension"
          src="../../assets/navBar/Settings.png"
          alt="Ícone de configurações"
        />
        <RouterLink
        class="links-style"
        to="/dashboard/perfil"
        >
        Configurações
      </RouterLink>
      </li>
      <li class="links-button">
        <img
        class="image-dimension"
        src="../../assets/navBar/Logout.png"
        alt="Ícone de sair" 
        />
        <RouterLink 
        @click.prevent="logout"
         class="links-style"
         to="/"
         >
         Sair
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
.nav-links {
  display: flex;
  height: 100%;
  display: flex;
  width: 100%;
  background-color: #fff8f8;
}

.active {
  background-color: rgb(185, 250, 228);
}

ul {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

ul li {
  height: 14.2857%;
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  gap: 10px;
  padding: 20px;
  font-size: small;
}

img {
  color: black;
  image-resolution: inherit;
}

.image-dimension {
  height: 20px;
  width: 20px;
}

.links-style {
  text-decoration: none;
  color: black;
}

.links-button:hover {
  background-color: rgb(185, 250, 228);
  width: 100%;
  cursor: pointer;
}

.links-style:hover {
  color: red;
}

@media (max-width: 380px) {
  .image-dimension {
    width: 20px;
    height: 20px;
  }

  .nav-links {
    font-size: small;
  }
}
</style>
