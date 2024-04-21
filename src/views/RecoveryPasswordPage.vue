<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import HeaderAccess from '../components/access/HeaderAccess.vue';
import ImageContainer from '../components/access/ImageContainer.vue';
import Hamburguer from '../assets/imageContainer/Hamburger.jpg'
import FormRecoveryPassword from '../components/forms/FormRecoveryPassword.vue'
const isEmailHasBeenSent = ref(false)
const sendEmail = () => {
  isEmailHasBeenSent.value = !isEmailHasBeenSent.value
}
</script>
<template>
    <template v-if="!isEmailHasBeenSent">
      <div class="login-frame">
        <ImageContainer :src="Hamburguer" alt="Imagem de um hambúrguer com fritas" />
        <main>
          <HeaderAccess />
          <FormRecoveryPassword  :send-email="sendEmail" />
        </main>
      </div>
    </template>
     <template v-else>
        <div class="login-frame">
          <ImageContainer :src="Hamburguer" alt="Imagem de um hamburguer com batata frita" />
          <main>
            <HeaderAccess />
            <div class="main-content">
              <img class="message-symbol" src="../assets/Message.png" alt="email" />
              <div class="wrapper-content">
                <div class="btn-text">
                  <div class="content-recovery">
                    <h2>Verifique seu email</h2>
                    <p>Verifique o endereço de email para ver instruções de como redefinir sua senha</p>
                  </div>
                  <button id="register-form-btn" @click="sendEmail">Reenviar email</button>
                </div>
                <RouterLink class="router" to="/">Fazer login</RouterLink>
              </div>
            </div>
          </main>
        </div>
      </template>
</template>