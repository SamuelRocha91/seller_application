<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useRouter, useRoute } from 'vue-router';
import { swalSuccess } from '@/utils/swal';
import { Auth } from '@/utils/auth';


const route = useRoute();
const router = useRouter();
const auth = new Auth();

const logout = () => {
  auth.signOut(
    () => swalSuccess('Sessão encerrada com sucesso')
  );
  router.push('/');
};

</script>
<template>
  <nav class="nav-links">
    <ul>
      <li class="links-button">
        <img
        class="image-dimension"
        src="../../assets/navBar/Home.png"
        alt="Ícone de home"
        />
        <RouterLink
        class="links-style"
        to="/dashboard/perfil"
        >
        Início
        </RouterLink>
      </li>
      <li class="links-button">
        <img
        class="image-dimension"
        src="../../assets/navBar/Order.png"
        alt="ícone de pedidos"
        />
        <RouterLink
        class="links-style" 
        to="/dashboard/perfil"
        >
        Pedidos
        </RouterLink>
      </li>
      <li class="links-button">
        <img
        class="image-dimension"
        src="../../assets/navBar/Store.png"
        alt="ícone de loja"
        />
        <RouterLink
        class="links-style"
        to="/dashboard/perfil"
        >
        Gerenciar loja
      </RouterLink>
      </li>
      <li class="links-button">
        <img
        class="image-dimension"
        src="../../assets/navBar/Reports.png" 
        alt="ícone de relatório"
        />
        <RouterLink
        class="links-style"
        to="/dashboard/perfil"
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
        to="/dashboard/perfil"
        >
        Finanças
      </RouterLink>
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
        <button class="links-style"  @click.prevent="logout">
          Sair
        </button>
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
