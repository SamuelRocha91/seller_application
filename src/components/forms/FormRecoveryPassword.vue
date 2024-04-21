<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  sendEmail?: () => void
}>()
const email = defineModel('email', { default: '' })
const emailError = ref('')
function validateEmailOnBlur() {
  const re = /\S+@\S+\.\S+/
  re.test(email.value)
    ? (emailError.value = '')
    : (emailError.value = 'Por favor, insira um email válido')
}
</script>

<template>
  <div class="form-container">
    <form>
      <label for="email" class="label-register">
        <p>Digite seu email</p>
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="email@example.com"
         @blur="validateEmailOnBlur"
        />
        <div class="div-error">
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
      </label>
      <button @click="sendEmail" id="register-form-btn">Recuperar senha</button>
      <div class="links-redirect">
        <p>
          Ainda não tem cadastro?
          <RouterLink class="router" to="/">Cadastre sua loja</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>
