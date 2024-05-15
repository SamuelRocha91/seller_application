<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { categories, prices } from '@/utils/data';
import { swalError, swalSuccess, swallWithDelete } from '@/utils/swal';
import { StoreService } from '../../api/storeService';
import { phoneMask } from '@/utils/formUtils';
import TableList from '../dashboard/TableList.vue';
import { type storeType } from '@/types/storeType';
import { useStoreActive } from '@/store/storeActive';


let image: File | string;

const storeActive = useStoreActive();
const imageUrl = ref();
const edit = ref(false);
const name = defineModel('name', { default: '' });
const address = defineModel('address', { default: '' });
const description = defineModel('description', { default: '' });
const category = defineModel('category', { default: '' });
const minimumPrice = defineModel('minimumPrice', { default: '' });
const phoneNumber = ref('');
const store = new StoreService();
const editId = ref();
const data = ref();
const awaiting = ref(false);


const handleImageChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files ? inputElement.files[0] : null;
  if (file) {
    image = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

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

const handleStatus = (id: number) => {
  data.value
    .map((entity: storeType) => {
      if (entity.id == id) {
        entity.active = !entity.active ;
      } else {
        entity.active = false;
      }
    });
  updateGlobalState();
  store.storage.store('stores', JSON.stringify(data.value));
};

const handleClick = async () => {
  const validate = validateFields();
  if (!validate) {
    swalError('Erro ao salvar os dados',
      'Por favor, verifique os dados inseridos');
    return;
  }
  const storeData = objectForm();
  if (editId.value) {
    awaiting.value = true;
    editStore(storeData);
  } else {
    awaiting.value = true;
    createStore(storeData);
  };
};

const createStore = (storeData: storeType) => {
  store.createStore(storeData,
    () => {
      const stores = store.storage.get('stores');
      data.value = JSON.parse(stores || '');
      swalSuccess('Dados salvos com sucesso!');
      updateGlobalState();
      edit.value = true;
      editId.value = null;
      awaiting.value = false;
    },
    () => {
      swalError('Erro ao salvar os dados',
        'Por favor, verifique os dados inseridos');
      awaiting.value = false;

    }
  );
};

const editStore = (storeData: storeType) => {
  const imageUpdate = storeData.src === image ? null : image;
  store.updateStore(editId.value, storeData, imageUpdate, () => {
    const stores = store.storage.get('stores');
    data.value = JSON.parse(stores || '');
    swalSuccess('Dados atualizados com sucesso!');
    edit.value = true;
    awaiting.value = false;
  }, () => {
    swalError('Erro ao salvar os dados',
      'Por favor, verifique os dados inseridos');
    awaiting.value = false;
  });
};


const handleDelete = (id: number) => {
  swallWithDelete(() => deleteForm(id));
};

const deleteForm = (id: number) => {
  const storeFiltered: storeType[] = data.value
    .filter((entity: storeType) => entity.id !== id);
  if (storeFiltered.length === 0) {
    store.storage.remove('stores');
    startFormCreateStore();
  } else {
    store.storage.store('stores', JSON.stringify(storeFiltered));
  }
  store.deleteStore(id,
    () => swalSuccess('Dados excluídos com sucesso'),
    () => swalSuccess('Erro no processamento da exclusão')
  );
  data.value = storeFiltered;
  updateGlobalState();
};

const editForm = async (id: number) => {
  editId.value = id;
  const storeFiltered: storeType[] = data.value
    .filter((entity: storeType) => entity.id == id);

  address.value = storeFiltered[0].address;
  description.value = storeFiltered[0].description;
  category.value = storeFiltered[0].category;
  name.value = storeFiltered[0].name;
  minimumPrice.value = storeFiltered[0].price;
  phoneNumber.value = storeFiltered[0].phoneNumber;
  imageUrl.value = storeFiltered[0].src;
  image = storeFiltered[0].src;
  edit.value = false;
};

const updateGlobalState = () => {
  const active = data.value.find((field: any) => field.active);
  const objectActive = {
    ...active
  };
  storeActive.setStore(objectActive);
};

const objectForm = () => ({
  src: image,
  name: name.value,
  price: minimumPrice.value,
  description: description.value,
  address: address.value,
  category: category.value,
  phoneNumber: phoneNumber.value
});

const startFormCreateStore = () => {
  address.value = '';
  description.value = '';
  category.value = '';
  name.value = '';
  minimumPrice.value = '';
  phoneNumber.value = '';
  imageUrl.value = '';
  edit.value = false;
  editId.value = null;
};

onMounted(() => {
  const sellerData = store.getFallback('stores') || '';
  const seller = sellerData ? JSON.parse(sellerData) : null;
  if (seller !== null) {
    data.value = seller;
    edit.value = true;
  }
});
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
  <template v-else>
    <div class="form-container">
      <TableList
      title="Lojas cadastradas"
      tableOne="Loja"
      tableTwo="Nome"
      tableThree="Pedido Mínimo"
      :handleEdit="editForm"
      :handleClick="handleDelete"
      :handleStatus="handleStatus"
      :data="data"
      />
      <button 
      @click.prevent="startFormCreateStore" 
      class="register-form-btn"
      >
      Cadastrar nova loja
      </button>
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
../../api/storeService