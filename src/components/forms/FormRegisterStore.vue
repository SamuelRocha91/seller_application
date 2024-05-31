<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { categories } from '@/utils/data';
import { swalError, swalSuccess, swallWithDelete } from '@/utils/swal';
import { StoreService } from '../../api/storeService';
import { type storeType } from '@/types/storeType';
import { useStoreActive } from '@/store/storeActive';
import Swal from 'sweetalert2';

let image: File | string;

const address = defineModel('address', { default: '' });
const awaiting = ref(false);
const category = defineModel('category', { default: '' });
const cep = ref('');
const city = defineModel('city', {default: ''});
const cnpj = ref('');
const data = ref();
const description = defineModel('description', { default: '' });
const edit = ref(false);
const editId = ref();
const imageUrl = ref();
const name = defineModel('name', { default: '' });
const neighborhood = defineModel('neighborhood', {default: ''});
const numberAddress = ref('');
const state = defineModel('state', {default: ''});
const store = new StoreService();
const storeActive = useStoreActive();

const cepMask = (value: string) => {
  if (!value) return '';
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{3})$/, '$1-$2');
  return value;
};

const cnpjMask = (value: string) => {
  if (!value) return '';
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/, '$1.$2');
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
  value = value.replace(/(\d{4})(\d)/, '$1-$2');
  return value;
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

const handleCep = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  cep.value = cepMask(value || '');
};

const handleCnpj = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  cnpj.value = cnpjMask(value || '');
};

const handleNumberAddress = (event: Event) => {
  let value = (event.target as HTMLInputElement).value;
  value = value.replace(/\D/g, '');
  numberAddress.value = value;
};

const handleDelete = (id: number) => {
  swallWithDelete(() => deleteForm(id));
};

const handleImageChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files ? inputElement.files[0] : null;
  if (file) {
    image = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

const handleStatus = (id: number) => {
  data.value
    .map((entity: storeType) => {
      if (entity.id == id) {
        entity.active = !entity.active;
      } else {
        entity.active = false;
      }
    });
  updateGlobalState();
  store.storage.store('stores', JSON.stringify(data.value));
};

const searchCep = () => {
  const formatedCep = cep.value.replace('-', '');
  fetch(`https://viacep.com.br/ws/${formatedCep}/json/`)
    .then((data) => data.json().then((json) => {
      address.value = json.logradouro;
      state.value = json.uf;
      city.value = json.localidade;
      neighborhood.value = json.bairro;
    })).catch(() => Swal.fire("Cep inválido"));
};

const validateFields = () => {
  const fields = [name, address, description, category];
  if (fields.some((field) => field.value.length < 3)) {
    return false;
  } else if (cnpj.value.length < 18) {
    return false;
  } else {
    return true;
  }
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
  description: description.value,
  address: address.value,
  category: category.value,
});

const startFormCreateStore = () => {
  address.value = '';
  description.value = '';
  category.value = '';
  name.value = '';
  imageUrl.value = '';
  edit.value = false;
  editId.value = null;
};

onMounted(() => {
  store.getStores((data: any) => {
    console.log(data);
  },
  (erro: any) => {
    console.error('Request failed:', erro);
    Swal.fire('Falha ao tentar carregar as lojas. Tente novamente');
  });

});
</script>

<template>
  <template v-if="!edit">
    <div
    class="container mt-4 p-4 bg-white w-90"
    style="max-height: 100vh;
     overflow-y: auto;">
      <form
        id="uploadForm"
        action="/upload"
        method="post"
        enctype="multipart/form-data">
        <div
          class=
          "form-group d-flex flex-column
          text-center justify-content-center align-items-center"
          >
          <div
            class="mb-3 bg-secondary p-3
            rounded-circle d-flex justify-content-center align-items-center"
            style="width: 150px; height: 150px;">
              <img id="uploadedImage"
              :src="imageUrl" alt=""
               class="rounded-circle"
               style="width: 100px; height: 100px;" />
          </div>
          <label for="imageInput" class="btn btn-primary">
            Alterar foto de perfil
          </label>
          <input
            type="file"
            name="image"
            id="imageInput"
            @change="handleImageChange"
            class="d-none" />
        </div>
        <div class="form-group">
          <label for="storeName">Nome da loja</label>
          <input
          type="text"
           id="storeName"
           class="form-control"
            placeholder="O nome precisa ter no mínimo 3 caracteres"
            v-model="name" />
        </div>
        <div class="form-group">
          <label for="cnpj">CNPJ</label>
          <input
            type="text"
            id="cnpj"
            class="form-control"
            maxlength="18"
            placeholder="XX.XXX.XXX/0001-XX"
            @input="handleCnpj"
            v-model="cnpj" />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="category">Categoria</label>
            <select id="category" class="form-control" v-model="category">
              <option
                v-for="(categoria, index)
                 in categories" :key="index"
                 :value="categoria">{{ categoria }}</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="cep">CEP</label>
            <div class="input-group">
              <input
                type="text"
                id="cep" class="form-control"
                placeholder="Digite o CEP"
                @input="handleCep"
                :value="cep" />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  @click.prevent="searchCep">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="bairro">Estado</label>
            <input
            type="text"
             id="bairro"
            class="form-control"
            :value="state"
            readonly
            />
          </div>
          <div class="form-group col-md-6">
            <label for="rua">Cidade</label>
            <input
             type="text"
             id="rua"
             class="form-control"
             v-model="city"
              readonly />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="bairro">Bairro</label>
            <input
             type="text"
             id="bairro"
             class="form-control"
            v-model="neighborhood"
             readonly
            />
          </div>
  
          <div class="form-group col-md-6">
            <label for="numero">Número</label>
            <input
            type="text"
            id="numero"
            class="form-control"
            @input="handleNumberAddress"
            :value="numberAddress"  />
          </div>
  
          <div class="form-group w-100">
            <label for="endereço">Endereço</label>
            <input
             type="text"
             id="endereço" class="form-control"
             v-model="address"
             readonly />
          </div>
        </div>
        <div class="form-group">
          <label for="description">Descrição</label>
          <textarea
            id="description"
            class="form-control"
            rows="3" placeholder="Máximo: 50 caracteres"
            v-model="description" maxlength="50"></textarea>
        </div>
        <button
          type="submit" class="btn btn-success btn-block"
          @click.prevent="handleClick" :disabled="awaiting">
          Salvar
        </button>
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
.bg-secondary {
  background-color: #ccc !important;
}
</style>
