<script setup lang="ts"></script>

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

</style>
