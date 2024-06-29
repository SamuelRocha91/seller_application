<script setup lang="ts">
import Home from '../assets/icons/Home.png';
import PageInfo from '@/components/dashboard/PageInfo.vue';
</script>
<template>
    <div class="dashboard">
        <PageInfo
        :src="Home"
        alt="Home"
        title="Bem vindo ao Dashboard"
        description="Visão geral de sua loja"
        />
    </div>
</template>