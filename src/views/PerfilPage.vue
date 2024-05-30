<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '../components/dashboard/NavBar.vue';
import NavBarSmall from '../components/dashboard/NavBarSmall.vue';
import HeaderDashboard from '../components/dashboard/HeaderDashboard.vue';
import PageInfo from '@/components/dashboard/PageInfo.vue';
import UserCircle from '../assets/icons/UserCircle.png';
import MenuPage from '@/components/dashboard/MenuPage.vue';
import FormRegisterStore from '@/components/forms/FormRegisterStore.vue';
import FormRegisterOperation
  from '@/components/forms/FormRegisterOperation.vue';
import { useStoreActive } from '@/store/storeActive';

const BignavBar = ref(true);
const storeActive = useStoreActive();
const selected = ref(true);

const handleSelect = (id: number) => {

  if (id == 2 && storeActive.storeActive.active) {
    selected.value = false;
  } else if (id == 1) {
    selected.value = true;
  }
};

const handleClick = () => {
  BignavBar.value = !BignavBar.value;
};
</script>

<template>
  <div class="perfil-frame">
    <template v-if="BignavBar">
      <div class="header-nav">
        <div class="nav-links">
          <div class="filter">
            <img
              class="toogle"
              @click="handleClick"
              src="../assets/navBar/ToggleNav.png"
              alt="Botão para reduzir navbar"
            />
          </div>
          <NavBar />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="header-nav-small">
        <div class="nav-links-phone">
          <div class="filter-small">
            <img
              @click="handleClick"
              src="../assets/navBar/ToggleNav.png"
              alt="Botão para aumentar navbar"
            />
          </div>
          <NavBarSmall />
        </div>
      </div>
    </template>
    <div class="page-content">
      <div class="header-content">
        <HeaderDashboard />
      </div>
      <main>
        <PageInfo
          :src="UserCircle"
          alt="ícone de perfil"
          title="Perfil"
          description="Gerencie aqui as informações de sua loja
          e permissões de acesso"
        />
        <FormRegisterStore v-show="selected"/>
        <FormRegisterOperation v-show="!selected"/>
      </main>
    </div>
  </div>
</template>

<style scoped>
.perfil-frame {
  display: flex;
}

.header-nav {
  width: 20vw;
  height: 100vh;
  display: flex;
}

.header-nav-small {
  width: 6vw;
  height: 100vh;
  display: flex;
}
.nav-links {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.filter {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20%;
  background-color: #ff1818;
  justify-content: center;
  padding: 10px;
}

.filter img {
  height: 7vh;
  width: 8vh;
}

.filter img:hover {
  cursor: pointer;
}

.nav-links-phone {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.filter-small {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20%;
  background-color: #ff1818;
  justify-content: center;
  padding: 5px;
}

.filter-small img {
  height: 4vh;
  width: 4vh;
}

.filter-small img:hover {
  cursor: pointer;
}

.page-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.header-content {
  display: flex;
  height: 17%;
  width: 100%;
}
main {
  background-color: gray;
  display: flex;
  height: 83.4vh;
  width: 100%;
  align-items: center;
  gap: 8px;
  flex-direction: column;
}

@media (max-width: 860px) {
  .header-nav {
    width: 30vw;
    height: 100vh;
    display: flex;
  }

  .filter .toogle {
    height: 60px;
    width: 80px;
  }

  .header-nav-small {
    width: 15vw;
  }
}

@media (max-width: 540px) {
  .header-nav {
    width: 30vw;
    height: 100vh;
    display: flex;
  }

  .filter .toogle {
    height: 60px;
    width: 80px;
  }

  .header-nav {
    font-size: small;
  }
}

@media (max-width: 460px) {
  .header-nav {
    width: 38vw;
    height: 100vh;
    display: flex;
  }

  .filter .toogle {
    height: 60px;
    width: 80px;
  }

  .header-nav-small {
    width: 23vw;
  }

  .filter .toogle {
    height: 50px;
    width: 60px;
  }
}
</style>
