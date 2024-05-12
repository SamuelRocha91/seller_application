<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { categories, prices } from '@/utils/data';
import { swalError, swalSuccess } from '@/utils/swal';
import { StoreService } from '../../utils/storeService';
import { phoneMask } from '@/utils/formUtils';

const imageUrl = ref('');
let image: File;
const storeId = defineModel('storeId', { default: 0 });
const edit = ref(false);
const name = defineModel('name', { default: '' });
const address = defineModel('address', { default: '' });
const description = defineModel('description', { default: '' });
const category = defineModel('category', { default: '' });
const minimumPrice = defineModel('minimumPrice', { default: '' });
const phoneNumber = ref('');
const store = new StoreService();


const handleImageChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files ? inputElement.files[0] : null;
  if (file) {
    image = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};


onMounted(() => {
  const sellerData = store.getFallback('seller') || '';
  const seller = sellerData ? JSON.parse(sellerData) : null;
  if (seller !== null) {
    storeId.value = seller.id;
    edit.value = true;
  }
});

const handlePhone = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  phoneNumber.value = phoneMask(value || '');
};

const validateFields = () => {
  const fields = [name, address, description, category, minimumPrice];
  if (fields.some((field) => field.value.length < 3)) {
    return false;
  } else if (phoneNumber.value.length < 11) {
    return false;
  } else {
    return true;
  }
};

const handleClick = () => {
  const validate = validateFields();
  if (!validate) {
    swalError('Erro ao salvar os dados',
      'Por favor, verifique os dados inseridos');
    return;
  }
  store.createStore(name.value, image,
    () => {
      swalSuccess('Dados salvos com sucesso!');
      store.storage.store(
        'sellerData', JSON.stringify({
          image: imageUrl.value,
          name: name.value
        })
      );
      edit.value = true;
    },
    () => {
      swalError('Erro ao salvar os dados',
        'Por favor, verifique os dados inseridos');
    }
  );
  swalSuccess('Dados salvos com sucesso!');
};

const editForm = () => {
  edit.value = false;
};
</script>

<template>
  <template v-if="!edit">
    <div class="form-container">
      <form
      id="uploadForm"
      action="/upload"
      method="post"
      enctype="multipart/form-data"
      >
        <div class="form-init">
          <div class="image-form">
            <div class="image-container">
              <img id="uploadedImage" :src="imageUrl" alt="" />
            </div>
            <label
            for="imageInput"
            class="custom-file-upload"
            >
            Alterar foto de perfil
          </label>
            <input
              type="file"
              name="image"
              id="imageInput"
              @change="handleImageChange"
              style="display: none"
            />
          </div>
          <div class="inputs-init">
            <label>
              <p>Nome da loja</p>
              <input
                placeholder="O nome precisa ter no mínimo 3 caracteres"
                class="bg-input"
                type="text"
                v-model="name"
              />
            </label>
            <label for="">
              <p>Endereço</p>
              <input
                placeholder="Insira um endereço válido"
                class="bg-input"
                type="text"
                v-model="address"
              />
            </label>
          </div>
        </div>
        <div class="section-intermediate">
          <div class="intermediate-content">
            <div>
              <p>Categoria</p>
              <select class="select-box" v-model="category">
                <option
                v-for="(categoria, index) in categories"
                :key="index"
                :value="categoria"
                >
                  {{ categoria }}
                </option>
              </select>
            </div>
            <div>
              <p>Pedido Mínimo</p>
              <select class="select-box" v-model="minimumPrice">
                <option
                  v-for="(price, index) in prices"
                  :key="index"
                  :value="price"
                  class="content-option"
                >
                  {{ price }}
                </option>
              </select>
            </div>
            <div class="input-phone">
              <p>Telefone</p>
              <input
                @input="handlePhone"
                :value="phoneNumber"
                class="bg-input"
                type="text"
                maxlength="15"
                placeholder="xx xxxxx-xxxx"
              />
            </div>
          </div>
        </div>
        <div class="section-finish">
          <div class="text-description">
            <p>Descrição</p>
            <textarea
              placeholder="Máximo: 50 caracteres"
              cols="30"
              rows="10"
              v-model="description"
              maxlength="50"
            ></textarea>
          </div>
          <div class="btn-div">
            <button
            type="submit"
            @click.prevent="handleClick"
            class="save-form-btn"
            >
            Salvar
          </button>
          </div>
        </div>
      </form>
    </div>
  </template>
  <template v-else>
    <div class="form-container">
      <form
      id="uploadForm"
      action="/upload"
      method="post"
      enctype="multipart/form-data"
      >
        <div class="form-init">
          <div class="image-form">
            <div class="image-container">
              <img id="uploadedImage" :src="imageUrl" alt="" />
            </div>
          </div>
          <div class="inputs-two">
            <label class="name-store">
              <h2>Nome do estabelecimento</h2>
              <p class="input-simulate">{{ name }}</p>
            </label>
            <label class="address">
              <h2>Endereço</h2>
              <p class="input-simulate">{{ address }}</p>
            </label>
          </div>
        </div>
        <div class="section-intermediate">
          <div class="intermediate-content">
            <div>
              <h2>Categoria</h2>
              <p class="input-simulate">{{ category }}</p>
            </div>
            <div>
              <h2>Pedido Mínimo</h2>
              <p class="input-simulate">{{ minimumPrice }}</p>
            </div>
            <div class="input-phone">
              <h2>Telefone</h2>
              <p class="input-simulate">{{ phoneNumber }}</p>
            </div>
          </div>
        </div>
        <div class="section-finish-two">
          <div class="text-description">
            <h2>Descrição</h2>
            <p class="input-simulate">{{ description }}</p>
          </div>
          <div class="btn-div-two">
            <button
            type="submit"
            @click.prevent="editForm"
            class="edit-form-btn"
            >
            Editar
            </button>
            <button
             type="submit"
             @click.prevent="editForm"
             class="delete-form-btn"
             >
             Deletar
            </button>
          </div>
        </div>
      </form>
    </div>
  </template>
</template>

<style scoped>
.select-box {
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
}

.custom-file-upload {
  cursor: pointer;
  color: #0000ff;
  text-decoration: underline;
  padding: 10px 20px;
  border-radius: 5px;
}

form {
  width: 100%;
  padding: 10px;
}
.form-init {
  background-color: white;
  display: flex;
  height: fit-content;
  padding: 10px;
  width: 100%;
  gap: 10px;
}
.form-container {
  background-color: white;
  display: flex;
  height: fit-content;
  padding: 10px;
  width: 90%;
}
.image-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ccc;
}

#uploadedImage {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.form-init {
  display: flex;
}

.save-form-btn {
  color: #ffffff;
  background-color: #14bb1d;
  font-size: 16px;
  width: 70px;
  height: 50px;
  border-radius: 5px;
}

.save-form-btn:hover {
  cursor: pointer;
}
.bg-input {
  border: 1px solid #dedede;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
  padding: 13px;
  width: 100%;
  height: 37px;
}

.inputs-init {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-form {
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.section-intermediate {
  display: flex;
  padding: 10px;
  width: 100%;
  padding: 10px;
  justify-content: center;
}

.intermediate-content {
  display: flex;
  width: 100%;
  gap: 40px;
  padding: 10px;
  justify-content: space-around;
}

.section-finish {
  width: 100%;
  height: 32.5vh;
  display: flex;
  justify-content: center;
}

.text-description {
  display: flex;
  flex-direction: column;
  width: 82%;
  justify-content: center;
}

textarea {
  width: 90%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
  padding: 15px;
}

.btn-div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}

.input-phone {
  width: 30%;
}

h2 {
  font-weight: bold;
  font-size: 20px;
}

.inputs-two {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.input-simulate {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
  padding: 13px;
  width: 100%;
  height: 37px;
}

.section-finish-two {
  width: 100%;
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  padding: 30px;
  margin-left: 21px;
  gap: 10px;
}

.section-finish-two .text-description {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

.text-description .input-simulate {
  height: 80%;
}
.address {
  width: 100%;
}
.address .input-simulate {
  width: 91%;
}
.name-store {
  width: 100%;
}
.name-store .input-simulate {
  width: 91%;
}

.inputs-two .name {
  width: 50%;
}

.edit-form-btn {
  color: #ffffff;
  background-color: #3f07c0;
  font-size: 16px;
  width: 70px;
  height: 50px;
  border-radius: 5px;
}

.delete-form-btn {
  color: #ffffff;
  background-color: #ff1818;
  font-size: 16px;
  width: 70px;
  height: 50px;
  border-radius: 5px;
}

.edit-form-btn:hover,
.delete-form-btn:hover {
  cursor: pointer;
}
.btn-div-two {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
