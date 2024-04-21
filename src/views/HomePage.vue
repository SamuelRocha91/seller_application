<script setup lang="ts">
import { RouterLink } from 'vue-router'
import FormHome from '@/components/forms/FormHome.vue'
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
  <main>
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
  height: 7vh;
  max-width: 30%;
}

#logo {
  display: flex;
  align-items: center;
  gap: 30px;
}

#logo h1 {
  font-family: 'Ingrid Darling', cursive;
  font-size: 46px;
  color: #ff1818;
}

#links-auth {
  display: flex;
  gap: 10px;
}

#enter {
  color: #ff1818;
  border: 1px solid #ff1818;
  padding: 10px;
  font-size: 18px;
  text-decoration: none;
}

#register {
  background-color: #ff1818;
  border: 1px solid #ff1818;
  color: #fff8f8;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
}

#register:hover {
  cursor: pointer;
  filter: brightness(2);
}

#enter:hover {
  cursor: pointer;
  filter: brightness(3);
}

a {
  text-decoration: none;
  color: white;
}

main {
  height: 92vh;
  width: 100%;
  background-image: url('../assets/imageContainer/Apples.jpg');
  background-size: cover;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  font-size: 40px;
  font-weight: bold;
}

.welcome-text p {
  font-size: 30px;
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
