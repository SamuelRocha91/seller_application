<script setup lang="ts">
import { createStorage } from '../../utils/storage';
import { ref } from 'vue';
import { swalSuccess } from '@/utils/swal';
import { useRouter } from 'vue-router';
import { cepMask, phoneMask } from '@/utils/formUtils';

const router = useRouter();

const email = defineModel<string>('email', { default: '' });
const emailError = ref('');
const phoneError = ref('');
const cepError = ref('');
const nameError = ref('');

const phone = ref('');
const cep = ref('');
const name = ref('');

const handleName = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  name.value = value;
  name.value.split(' ').length >= 2
    ? (nameError.value = '')
    : (nameError.value = 'Insira um nome válido');
};

const handlePhone = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  phone.value = phoneMask(value || '');
};

const handleCep = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  cep.value = cepMask(value || '');
};

const handleClick = () => {
  if (
    emailError.value.length > 0 ||
    cepError.value.length > 0 ||
    phoneError.value.length > 0 ||
    nameError.value.length > 0
  ) {
    return swalSuccess('Por favor, preencha todos os campos corretamente');
  }

  if (email.value == '' || phone.value == ''
    || name.value == '' || cep.value == '') {
    return swalSuccess('Por favor, não deixe campos vazios');
  }

  const storage = createStorage(false);
  storage.store('email', JSON.stringify(email.value));
  router.push('/registro');
};

const validateEmailOnBlur = () => {
  const re = /\S+@\S+\.\S+/;
  re.test(email.value)
    ? (emailError.value = '')
    : (emailError.value = 'Por favor, insira um email válido');
};

const validatePhoneOnBlur = () => {
  phone.value.length === 15
    ? (phoneError.value = '')
    : (phoneError.value = 'Por favor, insira um número válido');
};

const validateCepOnBlur = () => {
  cep.value.length === 9 ?
    (cepError.value = '') :
    (cepError.value = 'Dado incompleto');
};
</script>

<template>
  <form>
    <h1>Cadastre sua loja</h1>
    <label for="name-total" class="label-register">
      <p>Digite seu nome</p>
      <input
        type="text"
        name="name-total"
        id="name-total"
        placeholder="Samuel Soares Rocha"
        :value="name"
        @blur="handleName"
      />
      <div class="div-error">
        <span v-if="nameError" class="error">{{ nameError }}</span>
      </div>
    </label>
    <label for="email" class="label-register">
      <p>Email</p>
      <input
        v-model="email"
        type="email"
        name="email"
        id="email"
        @blur="validateEmailOnBlur"
        placeholder="email@example.com"
      />
      <div class="div-error">
        <span v-if="emailError" class="error">{{ emailError }}</span>
      </div>
    </label>
    <label for="phone" class="label-register">
      <p>Telefone</p>
      <input
        type="tel"
        maxlength="15"
        @input="handlePhone"
        :value="phone"
        name="phone"
        id="phone"
        placeholder="xx xxxxx-xxxx"
        @blur="validatePhoneOnBlur"
      />
      <div class="div-error">
        <span v-if="phoneError" class="error">{{ phoneError }}</span>
      </div>
    </label>
    <label for="cep" class="label-register">
      <p>CEP</p>
      <input
        type="text"
        name="cep"
        id="cep"
        placeholder="xxxxx-xxx"
        :value="cep"
        @input="handleCep"
        maxlength="9"
        @blur="validateCepOnBlur"
      />
      <div class="div-error">
        <span v-if="cepError" class="error">{{ cepError }}</span>
      </div>
    </label>
    <button
    @click.prevent="handleClick"
    id="register-form-btn"
    >
    Cadastrar agora
  </button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  background-color: #fff8f8;
  padding: 30px;
  height: fit-content;
  width: fit-content;
  gap: 10px;
  width: 25%;
  border-radius: 12px;
  box-shadow: 10px 5px 5px black;
}

.label-register input {
  border: 1px solid #dedede;
  padding: 13px;
  width: 100%;
  height: 37px;
}

.label-register {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;
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

form h1 {
  font-size: 22px;
  text-align: center;
}

label p {
  font-size: 14px;
}

label input {
  font-size: 14px;
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

@media (max-width: 1290px) {
  form {
    padding: 20px;
    height: fit-content;
    gap: 10px;
    width: 35%;
  }
}

@media (max-width: 1100px) {
  form {
    padding: 20px;
    height: fit-content;
    gap: 10px;
    width: 40%;
  }
}

@media (max-width: 920px) {
  form {
    padding: 20px;
    height: fit-content;
    gap: 10px;
    width: 45%;
  }
}

@media (max-width: 540px) {
  form {
    padding: 20px;
    height: fit-content;
    gap: 10px;
    width: 60%;
  }

  form h1 {
    font-size: 20px;
  }

  form button {
    font-size: 20px;
  }
}
@media (max-width: 440px) {
  form {
    padding: 10px;
    height: fit-content;
    gap: 10px;
    width: 80%;
  }

  form h1 {
    font-size: 18px;
  }

  form p {
    font-size: 15px;
  }
  form button {
    font-size: 18px;
  }
  .label-register input {
    padding: 10px;
    width: 100%;
    height: 35px;
    font-size: 14px;
  }
}
@media (max-width: 280px) {
  form {
    padding: 20px;
    height: fit-content;
    gap: 10px;
    width: 90%;
  }

  form h1 {
    font-size: 20px;
  }

  form button {
    font-size: 20px;
  }
}
</style>
