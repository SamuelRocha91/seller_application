<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  sendEmail?: () => void
}>()

const password = defineModel<string>('password', { default: '' })
const password_confirmation = defineModel<string>('password_confirmation')

const passwordConfirmationError = ref('')
const passwordError = ref('')

function validatepasswordOnBlur() {
  password.value.length < 6
    ? (passwordError.value = 'A senha deve ter no mínimo 6 caracteres')
    : (passwordError.value = '')
}

function validatepasswordConfirmationOnBlur() {
  password_confirmation.value === password.value
    ? (passwordConfirmationError.value = '')
    : (passwordConfirmationError.value = 'Senhas não coincidem')
}
</script>
<template v-else-if="$route.path == '/recuperar-senha-link'">
  <form>
    <label for="password" class="label-register">
      <p>Nova senha</p>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="*********"
        v-model="password"
        @blur="validatepasswordOnBlur"
      />
      <div class="div-error">
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>
    </label>
    <label for="passwordRepeat" class="label-register">
      <p>Repetição de senha</p>
      <input
        type="password"
        name="passwordRepeat"
        id="passwordRepeat"
        placeholder="*********"
        v-model="password_confirmation"
        @blur="validatepasswordConfirmationOnBlur"
      />
      <div class="div-error">
        <span v-if="passwordConfirmationError" class="error">{{ passwordConfirmationError }}</span>
      </div>
    </label>
    <button id="register-form-btn">Mudar senha</button>
  </form>
</template>
