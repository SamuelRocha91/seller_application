<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../../utils/auth'

defineProps<{
  sendEmail?: () => void
}>()

const router = useRouter()
const email = defineModel<string>('email', { default: '' })
const password = defineModel<string>('password', { default: '' })
const awaiting = ref(false)
const remember = defineModel<boolean>('remember', { default: true })
const emailError = ref('')

const passwordError = ref('')

function validatepasswordOnBlur() {
  password.value.length < 6
    ? (passwordError.value = 'A senha deve ter no mínimo 6 caracteres')
    : (passwordError.value = '')
}

function onSubmit() {
  const auth = new Auth(remember.value)
  awaiting.value = true
  auth.signIn(
    email.value || '',
    password.value || '',
    () => {
      awaiting.value = false
      router.push('/dashboard/perfil')
    },
    () => {
      awaiting.value = false
      console.log('não foi dessa vez!')
    }
  )
}

function validateEmailOnBlur() {
  const re = /\S+@\S+\.\S+/
  re.test(email.value)
    ? (emailError.value = '')
    : (emailError.value = 'Por favor, insira um email válido')
}
</script>
<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <label for="email" class="label-register">
        <p>Email</p>
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
      <label for="password" class="label-register">
        <p>Senha</p>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="********"
          @blur="validatepasswordOnBlur"
        />
        <div class="div-error">
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
      </label>
      <label for="remember-password" class="checkbox-label">
        <input v-model="remember" type="checkbox" id="remember-password" />
        <p>Lembrar senha</p>
      </label>
      <button id="register-form-btn">Login</button>
      <div class="links-redirect">
        <p>
          Ainda não tem cadastro? <RouterLink class="router" to="/">Cadastre sua loja</RouterLink>
        </p>
        <RouterLink class="router" to="/recuperar-senha">Esqueceu a senha?</RouterLink>
      </div>
    </form>
  </div>
</template>
