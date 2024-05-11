<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();

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
        to="/dashboard"
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
        to="/dashboard/pedidos"
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
         to="/dashboard/loja"
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
        to="/configuracoes"
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
        <RouterLink class="links-style" to="/">Sair</RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
.nav-links {
  display: flex;
  border: 1px solid black;
  height: 100%;
  display: flex;
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
