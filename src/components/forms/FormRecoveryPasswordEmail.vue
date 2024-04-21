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
<template>
  <div class="form-container">
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
  </div>
</template>
<style scoped>
form {
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 30px;
  height: 100%;
  gap: 10px;
  width: 100%;
}

.label-register {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: start;
}

.label-register input {
  border: 1px solid #dedede;
  padding: 13px;
  width: 100%;
  height: 35px;
}

#register-form-btn {
  color: #ffffff;
  background-color: #ff1818;
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;
}

#register-form-btn:hover {
  filter: brightness(2);
}

.checkbox-label {
  display: flex;
  gap: 5px;
  justify-content: end;
  display: flex;
}

.links-redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.router {
  color: #ff1818;
}

.checkbox-label p {
  font-size: 15px;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 50%;
  width: 60%;
  margin: auto;
  box-sizing: border-box;
}

.div-error {
  height: 10px;
  display: flex;
  align-items: center;
}

.error {
  color: #ff1818;
  font-size: smaller;
  transition: max-height 0.2s ease; /* Adicione uma transição suave para a altura */
}

@media (max-width: 1024px) {
  .form-container {
     width: 80%;
     text-align: center;
  }

  form {
    width: 100%;
    text-align: center;
  }
}


@media (max-width: 820px) {
  .form-container {
     width: 100%;
     text-align: center;
  }

  form {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .form-container {
     width: 100%;
     text-align: center;
  }

  form {
    width: 100%;
    text-align: center;
  }
}


@media (max-width: 640px) {
  .form-container {
     width: 100%;
     text-align: center;
  }

  form {
    width: 100%;
    text-align: center;
  }
}

</style>
