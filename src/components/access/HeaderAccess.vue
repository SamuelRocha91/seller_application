<script setup lang="ts"></script>
<template>
  <div>
    <div id="header">
      <img
      src="../../assets/Airplane.png"
      alt="imagem de um aviao"
      id="airplane"
      />
      <h1>Delivery</h1>
    </div>
    <div id="title">
      <h1>Portal do lojista</h1>
    </div>
  </div>
</template>

<style scoped>
#header {
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

#airplane {
  height: 6vh;
  max-width: 30%;
}

#header h1 {
  font-family: 'Ingrid Darling', cursive;
  font-size: 40px;
  color: #ff1818;
}

#title {
  display: flex;
  height: 10vh;
  font-family: 'Ingrid Darling', cursive;
  font-size: 40px;
  align-items: start;
  justify-content: center;
  padding: 5px;
}
</style>
