<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Auth } from '../../utils/auth';

defineProps<{
  sendEmail?: () => void
}>();

const router = useRouter();

const email = defineModel<string>('email', { default: '' });
const password = defineModel<string>('password', { default: '' });
const awaiting = ref(false);
const remember = defineModel<boolean>('remember', { default: true });

const emailError = ref('');
const passwordError = ref('');

const validatepasswordOnBlur = () => {
  password.value.length < 6
    ? (passwordError.value = 'A senha deve ter no mínimo 6 caracteres')
    : (passwordError.value = '');
};

const onSubmit = () => {
  const auth = new Auth(remember.value);
  awaiting.value = true;
  auth.signIn(
    email.value || '',
    password.value || '',
    () => {
      awaiting.value = false;
      router.push('/dashboard/perfil');
    },
    () => {
      awaiting.value = false;
      console.log('não foi dessa vez!');
    }
  );
};

const validateEmailOnBlur = () => {
  const re = /\S+@\S+\.\S+/;
  re.test(email.value)
    ? (emailError.value = '')
    : (emailError.value = 'Por favor, insira um email válido');
};
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
      <button :disabled="awaiting" id="register-form-btn">Login</button>
      
      <div class="links-redirect">
        <p>
          Ainda não tem cadastro?
          <RouterLink class="router" to="/">
            Cadastre sua loja
          </RouterLink>
        </p>
        <RouterLink class="router" to="/recuperar-senha">
          Esqueceu a senha?
        </RouterLink>
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
