<script setup lang="ts">
import { RouterLink } from 'vue-router'
import FormHome from '@/components/forms/FormHome.vue'
import { computed, onMounted, ref } from 'vue';
import AppleOne from '../assets/imageContainer/Apples.jpg'
import AppleTwo from '../assets/imageContainer/NewApples.jpg'
import AppleThree from '../assets/imageContainer/NewApple2.jpg'

const apples = [AppleOne, AppleTwo, AppleThree]
const count = ref(0);

const handleCount = () => {
  if (count.value >= apples.length - 1) {
    count.value = 0;
  } else {
    count.value += 1;
  }
}

onMounted(() => {
    setInterval(handleCount, 8000)
  }) 

 const backgroundImage = computed(() => ({
  backgroundImage: `url(${apples[count.value]})` 
}));
</script>

<template>
  <header>
    <div id="logo">
      <img src="../assets/Airplane.png" alt="imagem de um aviao" id="airplane" />
      <h1>Delivery</h1>
    </div>
    <div id="links-auth">
      <RouterLink to="/login" id="enter">Entrar</RouterLink>
      <button id="register"><a href="#name-total">Cadastrar</a></button>
    </div>
  </header>
  <main :style="backgroundImage">
    <div class="welcome-text">
      <h1>Quer rapidez na entrega?</h1>
      <p>
        Nosso delivery é o caminho certo para satisfazer seu desejo de forma rápida e eficiente!
      </p>
    </div>
    <FormHome />
  </main>
</template>

<style scoped>
header {
  height: 8vh;
  background-color: #fff8f8;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#airplane {
  height: 6vh;
  max-width: 30%;
}

#logo {
  display: flex;
  align-items: center;
  gap: 30px;
}

#logo h1 {
  font-family: 'Ingrid Darling', cursive;
  font-size: 40px;
  color: #ff1818;
}

#links-auth {
  display: flex;
  gap: 10px;
}

#enter {
  color: #ff1818;
  border: 1px solid #ff1818;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  text-decoration: none;
}

#register {
  background-color: #ff1818;
  border: 1px solid #ff1818;
  color: #fff8f8;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
}

#register:hover {
  cursor: pointer;
  filter: brightness(2);
}

#enter:hover {
  cursor: pointer;
  background-color: #fab0b0;
  transition: 1s;
}

a {
  text-decoration: none;
  color: white;
}

main {
  height: 92vh;
  width: 100%;
  background-size: cover;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: background-image 3s ease-in-out;
}

.welcome-text {
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: center;
  color: #fff8f8;
  gap: 10px;
}

.welcome-text h1 {
  font-size: 38px;
  font-weight: bold;
}

.welcome-text p {
  font-size: 28px;
  font-weight: bold;
  align-items: center;
}
@media (max-width: 650px) {
.welcome-text {
  width: 40%;
  color: #fff8f8;
  gap: 10px;
  padding: 15px;
}

.welcome-text h1 {
  font-size: 25px;
  font-weight: bold;
}

.welcome-text p {
  font-size: 20px;
  font-weight: bold;
  align-items: center;
}
}
@media (max-width: 500px) {
  #register {
    display: none;
  }
}

@media (max-width: 440px) {
  main {
    flex-direction: column;
    align-items: center;
    align-content: center;
    width: 100%;
  }
  .welcome-text{
    height: 40%;
    width: 100%;
    text-align: center;
  }
}


@media (max-width: 280px) {
  #logo h1 {
    font-size: 30px;
  }

  #links-auth {
    font-size: 20px;
  }
  #enter {
    height: 60%;
  }
  .welcome-text {
    display: none;
  }
}
</style>
