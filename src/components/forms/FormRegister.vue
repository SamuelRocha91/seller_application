<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';
import { Auth } from '../../utils/auth';
import { createStorage } from '../../utils/storage';
import { swalWithRedirect } from '@/utils/swal';

defineProps<{
  sendEmail?: () => void
}>();

const email = defineModel<string>('email', { default: '' });
const password = defineModel<string>('password', { default: '' });
const password_confirmation = defineModel<string>('password_confirmation');
const awaiting = ref(false);
const remember = defineModel<boolean>('remember', { default: true });

const passwordConfirmationError = ref('');
const passwordError = ref('');

const validatepasswordOnBlur = () => {
  password.value.length < 6
    ? (passwordError.value = 'A senha deve ter no mínimo 6 caracteres')
    : (passwordError.value = '');
};

const validatepasswordConfirmationOnBlur = () => {
  password_confirmation.value === password.value
    ? (passwordConfirmationError.value = '')
    : (passwordConfirmationError.value = 'Senhas não coincidem');
};

const onSubmit = () => {
  const auth = new Auth(remember.value);
  awaiting.value = true;
  auth.signUp(
    email.value || '',
    password.value || '',
    password_confirmation.value || '',
    () => {
      awaiting.value = false;
      swalWithRedirect();
    },
    () => {
      awaiting.value = false;
    });
};

onMounted(() => {
  const storage = createStorage(false);
  email.value = JSON.parse(storage.get('email') || '');
});
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <label for="password" class="label-register">
        <p>Senha</p>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          @blur="validatepasswordOnBlur"
        />
        <div class="div-error">
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
      </label>
      <label for="password_confirmation" class="label-register">
        <p>Confirme sua senha</p>
        <input
          v-model="password_confirmation"
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          placeholder="*********"
          @blur="validatepasswordConfirmationOnBlur"
        />
        <div class="div-error">
          <span v-if="passwordConfirmationError" class="error">{{
            passwordConfirmationError
          }}</span>
        </div>
      </label>
      <label for="agreement-terms" class="checkbox-label">
        <input type="checkbox" id="agreement-terms" />
        <p>
          Eu aceito os
          <RouterLink
          class="router"
          to="/termos-e-condicoes"
          >
          Termos e condições
        </RouterLink>
        </p>
      </label>
      <button id="register-form-btn">Registro</button>
      <div class="links-redirect">
        <p>
          Já possui cadastro?
          <RouterLink class="router" to="/login">
            Fazer login
         </RouterLink>
        </p>
      </div>
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
  font-size: 16px;
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
  font-size: 12px;
  gap: 20px;
}

.router {
  color: #ff1818;
}

.checkbox-label p {
  font-size: 12px;
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
  font-size: x-small;
  transition: max-height 0.2s ease;
}

label p {
  font-size: 14px;
}

label input {
  font-size: 14px;
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
