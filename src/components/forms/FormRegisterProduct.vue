<script setup lang="ts">
import { ref } from 'vue';
import { swalError } from '../../utils/swal';
import { catergoriesProducts } from '@/utils/data';
import { priceMask } from '@/utils/formUtils';

let image: File | string;

const imageUrl = ref();
const category = defineModel('category', { default: '' });
const name = defineModel('name', { default: '' });
const price = ref('');
const description = defineModel('description', { default: '' });
const awaiting = ref(false);


const handleImageChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files ? inputElement.files[0] : null;
  if (file) {
    image = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

const handlePrice = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  const newPrice = priceMask(value || '');
  price.value = newPrice;
};

const validateFields = () => {
  const fields = [name, description, category];
  if (fields.some((field) => field.value.length < 3)) {
    return false;
  } else if (price.value.length < 4) {
    return false;
  } else {
    return true;
  }
};

const handleClick = async () => {
  const validate = validateFields();
  if (!validate) {
    swalError('Erro ao salvar os dados',
      'Por favor, verifique os dados inseridos');
    return;
  }
};
</script>

<template>
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
            Alterar Imagem do produto
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
             <div>
              <p>Categoria</p>
              <select class="select-box category" v-model="category">
                <option
                v-for="(categoria, index) in catergoriesProducts"
                :key="index"
                :value="categoria"
                >
                  {{ categoria }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="section-intermediate">
          <div class="intermediate-content">
            <label class="label-intermediate">
              <p>Nome do produto</p>
              <input
                placeholder="O nome precisa ter no mínimo 3 caracteres"
                class="bg-input intermediate"
                type="text"
                v-model="name"
              />
            </label>
            <div class="input-phone">
              <p>Valor</p>
              <input
                @input="handlePrice"
                v-model="price"
                class="bg-input intermediate"
                type="text"
                maxlength="15"
                placeholder="0.00"
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
            :disabled="awaiting"
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
  align-items: center;
  height: fit-content;
  padding: 10px;
  width: 100%;
  gap: 10px;
  border: 1px solid rgb(189, 187, 187);
}
.form-container {
  background-color: white;
  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
  padding: 20px;
  width: 90%;
  height: 62vh;
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

.label-intermediate {
  margin-left: 4%;
  width: 90%;
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

.category {
  width: 90%;
}

.inputs-init {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.intermediate {
  width: 100%;
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
  justify-content: space-between;
  border-right: 1px solid rgb(189, 187, 187);
  border-left: 1px solid rgb(189, 187, 187);
  align-items: center;
}

.intermediate-content {
  display: flex;
  width: 100%;
  gap: 40px;
  padding: 10px;
  justify-content: space-between;
}

.section-finish {
  width: 100%;
  height: 32.0vh;
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
}

.text-description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 82%;
  height: fit-content;
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


.register-form-btn {
  color: #ffffff;
  background-color: #ff1818;
  font-size: 16px;
  width: 230px;
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