<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import HeaderAccess from '../components/access/HeaderAccess.vue';
import ImageContainer from '../components/access/ImageContainer.vue';
import Hamburguer from '../assets/imageContainer/Hamburger.jpg';
import FormRecoveryPassword from '../components/forms/FormRecoveryPassword.vue';
const isEmailHasBeenSent = ref(false);
const sendEmail = () => {
  isEmailHasBeenSent.value = !isEmailHasBeenSent.value;
};
</script>
<template>
    <template v-if="!isEmailHasBeenSent">
      <div class="login-frame">
        <ImageContainer
        :src="Hamburguer"
        alt="Imagem de um hambúrguer com fritas"
         />
        <main>
          <HeaderAccess />
          <FormRecoveryPassword  :send-email="sendEmail" />
        </main>
      </div>
    </template>
     <template v-else>
        <div class="login-frame">
          <ImageContainer
          :src="Hamburguer"
          alt="Imagem de um hamburguer com batata frita" />
          <main>
            <HeaderAccess />
            <div class="main-content">
              <img
              class="message-symbol"
              src="../assets//Message.png"
              alt="email" 
              />
              <div class="wrapper-content">
                <div class="btn-text">
                  <div class="content-recovery">
                    <h2>Verifique seu email</h2>
                    <p>
                      Verifique o endereço de email para 
                      ver instruções de como redefinir sua senha
                    </p>
                  </div>
                  <button
                  id="register-form-btn"
                  @click="sendEmail"
                  >
                  Reenviar email
                </button>
                </div>
                <RouterLink class="router" to="/">Fazer login</RouterLink>
              </div>
            </div>
          </main>
        </div>
      </template>
</template>
<style scoped>
.login-frame {
  display: flex;
  height: 100vh;
  box-sizing: border-box;
  border: 0px;
  margin: 0px;
}

main {
 display: flex;
  flex-direction: column;
  width: 50vw;
  height: 100%;
  gap: 50px;
}

#register-form-btn {
  color: #ffffff;
  background-color: #ff1818;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
}

#register-form-btn:hover {
  filter: brightness(2);
}

.checkbox-label {
  display: flex;
  gap: 5px;
  justify-content: end;
}

.links-redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 12px;

}

.router {
  color: #ff1818;
  font-size: 12px;
}

.checkbox-label p {
  font-size: 15px;
}

.message-symbol {
  height: 20%;
  width: 30%;
}

.main-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin: auto;
  width: 60%;
  
}

.main-content #register-form-btn {
  width: 90%;
}

.content-recovery {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65%;
  text-align: center;
  gap: 15px;
}

.content-recovery h2 {
  font-size: 24px;
}

.content-recovery p {
  font-size: 20px;
}

.btn-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

}

.wrapper-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
@media (max-width: 1024px) {
  main {
     width: 50%;
     text-align: center;
  }
  .content-recovery h2 {
    font-size: 25px;
  }

.content-recovery p {
  font-size: 20px;
}
}

@media (max-width: 768px) {
  main {
     width: 100%;
     text-align: center;
  }
}

@media (max-width: 640px) {
  main {
     width: 100%;
     text-align: center;
  }
}

@media (max-width: 280px) {
  .main-content {
     width: 100%;
     text-align: center;
  }
}
</style>