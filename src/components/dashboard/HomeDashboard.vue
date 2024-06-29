<script setup lang="ts"></script>
<template>
 <div class="container">
    <div class="mini-container" >
        <h1>Total de pedidos</h1>
        <p class="text-success">10</p>
        <button class="btn btn-primary">Ver histórico de vendas</button>
    </div>
    <div class="mini-container">
        <h1>Pedidos pendentes</h1>
        <p class="text-warning">10</p>
        <button class="btn btn-primary">Ver pedidos</button>
    </div>
    <div class="mini-container">
        <h1>Arrecadação total</h1>
        <p class="text-success">10</p>
        <button class="btn btn-primary">Ver estatísticas</button>
    </div>
 </div>
</template>
<style>
.container {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    margin-bottom: 50px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 40vh;
    align-items: center;
}

.mini-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #ccc;
    padding-right: 20px;
}

.mini-container:last-child {
    border-right: none;
    padding-right: 0;
}

h1 {
    font-size: 2.0rem;
    margin-bottom: 10px;
}

p {
    font-size: 1.5rem;
    margin-bottom: 10px;
}


</style>