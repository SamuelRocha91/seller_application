<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { categories, prices } from '@/utils/data';
import { swalError, swalSuccess, swallWithDelete } from '@/utils/swal';
import { StoreService } from '../../api/storeService';
import { phoneMask } from '@/utils/formUtils';
import TableList from '../dashboard/TableList.vue';
import { type storeType } from '@/types/storeType';
import { useStoreActive } from '@/store/storeActive';
import '../../assets/global.css';

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
.image-form {
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.intermediate-content {
  justify-content: space-around;
}

.section-intermediate {
  justify-content: center;
}

.section-finish {
  height: 32.5vh;
}

.text-description {
  display: flex;
  flex-direction: column;
  width: 82%;
  justify-content: center;
}

</style>