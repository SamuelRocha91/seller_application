<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import { swalSuccess } from '@/utils/swal';
import { Auth } from '@/utils/auth';
import { useStoreActive } from '@/store/storeActive';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const color = useStoreActive();
const navStyle = computed(() => {
  return {
    backgroundColor: color.storeActive.colorTheme || 'white'
 || 'white'
  };
});
const router = useRouter();
const route = useRoute();
const auth = new Auth();
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

const handleOrder = () => {
  if (useStoreActive().storeActive.active) {
    router.push('/dashboard/pedidos');
  } else {
    Swal.fire('É necessário ativar uma loja pra poder ver os pedidos');
  }
};

const handleReports = () => {
  if (useStoreActive().storeActive.active) {
    router.push('/dashboard/relatorios');
  } else {
    Swal.fire('É necessário ativar uma loja pra poder ver os relatórios');
  }
};

const handleHistory = () => {
  if (useStoreActive().storeActive.active) {
    router.push('/dashboard/historico');
  } else {
    Swal.fire('É necessário ativar uma loja pra poder ver o histórico de vendas');
  }
};

const handleHome = () => {
  if (useStoreActive().storeActive.active) {
    router.push('/dashboard/home');
  } else {
    Swal.fire('É necessário ativar uma loja pra poder ver o dashboard');
  }
};
</script>
<template>
  <nav class="nav-links"
   :style="navStyle">
    <ul>
      <li 
        class="links-button"
        :class="{ 'active': route.path === '/dashboard/home' }"
      >
        <img
        class="image-dimension"
        src="../../assets/navBar/Home.png"
        alt="Ícone de home"
        />
        <a
        class="links-style"
        @click.prevent="handleHome"
        >
        Início
        </a>
      </li>
      <li class="links-button" :class="{ 'active': $route.path === '/dashboard/pedidos' }">
        <img
        class="image-dimension"
        src="../../assets/navBar/Order.png"
        alt="ícone de pedidos"
        />
        <a
        class="links-style" 
        @click.prevent="handleOrder"

        >
        Pedidos
        </a>
      </li>
      <li class="links-button" 
          :class="{ 'active': $route.path === '/dashboard/gerenciar-loja' }"
        >
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
      <li 
        class="links-button"
        :class="{ 'active': route.path === '/dashboard/relatorios' }"
      >
        <img
        class="image-dimension"
        src="../../assets/navBar/Reports.png" 
        alt="ícone de relatório"
        />
        <a
        class="links-style"
        @click.prevent="handleReports"
        >
        Relatórios
      </a>
      </li>
      <li 
        class="links-button" 
        :class="{ 'active': route.path === '/dashboard/historico' }"
      >
        <img
        class="image-dimension"
        src="../../assets/navBar/Finance.png"
        alt="ícone de finanças"
        />
        <a
        class="links-style"
        @click="handleHistory"
        >
        Histórico de vendas
      </a>
      </li>
      <li
      class="links-button"
      :class="{ 'active': route.path === '/dashboard/perfil' }"
      >
        <img 
        :class="{ 'active': $route.path === '/dashboard/perfil' }"
        class="image-dimension"
        src="../../assets/navBar/Settings.png"
        alt="Ícone de configurações">
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
        >
        <RouterLink class="links-style"  to="/" @click.prevent="logout">
          Sair
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
.nav-links {
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #FFF8F8;
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
  align-items: center;
  align-content: center;
  gap: 10px;
  padding: 20px;

}

img {
  color: black;
  image-resolution: inherit;
}

.image-dimension {
  height: 40px;
  width: 40px;
}

.links-style {
  text-decoration: none;
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  align-items: center
}

.links-button:hover {
  background-color: rgb(185, 250, 228);
  width: 100%;
}

.links-style:hover {
  color: red;
  cursor: pointer;
  background-color: rgb(185, 250, 228);
}
@media (max-width: 540px) {
    .image-dimension {
    width: 20px;
    height: 20px;
  }

}

@media (max-width: 460px) {
  .image-dimension {
    width: 20px;
    height: 20px;
  }
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
