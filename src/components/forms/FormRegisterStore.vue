<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { categories } from '@/utils/data';
import { swalError, swalSuccess, swallWithDelete } from '@/utils/swal';
import { StoreService } from '../../api/storeService';
import { type storeType } from '@/types/storeType';
import { useStoreActive } from '@/store/storeActive';
import Swal from 'sweetalert2';
import TableList from '../dashboard/TableList.vue';
import { watch } from 'vue';
import LoadingSpiner from '../dashboard/LoadingSpiner.vue';

let image: File | string;

const URL_HOST = import.meta.env.VITE_BASE_URL;

const address = defineModel('address', { default: '' });
const awaiting = ref(false);
const category = defineModel('category', { default: '' });
const cep = ref('');
const city = defineModel('city', {default: ''});
const cnpj = ref('');
const data = ref<any>([]);
const description = defineModel('description', { default: '' });
const edit = ref(false);
const editId = ref();
const imageUrl = ref();
const isLoading = ref(false);
const name = defineModel('name', { default: '' });
const navBarColor = defineModel('navColor', { default: '' });
const neighborhood = defineModel('neighborhood', { default: '' });
const numberAddress = ref('');
const state = defineModel('state', {default: ''});
const store = new StoreService();
const storeActive = useStoreActive();

watch(storeActive, () => {
  if (storeActive.storeActive.id !== 0) {
    const index = data.value
      .findIndex((field: any) => field.id === storeActive.storeActive.id);
    data.value[index].isOpen = storeActive.storeActive.isOpen;
  }
});

const cepMask = (value: string) => {
  if (!value) return '';
  value = value.replace(/\D/g, '');
  if (value.length > 5) {
    value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
  } else {
    value = value.replace(/(\d{1,5})/, '$1');
  }
  
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

const openStore = (id: number) => {
  data.value
    .map((entity: storeType) => {
      if (entity.id == id) {
        const newValue = !entity.isOpen;
        store.openStore(id, newValue,
          () => {
            swalSuccess("abertura/fechamento feito com sucesso");
            entity.isOpen = !entity.isOpen;
            updateGlobalState();
          },
          () => swalSuccess("Erro ao abrir/fechar loja"));
      }
    });
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
    (info: any) => {
      data.value.push({
        id: info.id,
        category: category.value || '',
        src: `${URL_HOST}${info.avatar_url}` || '',
        name: name.value,
        active: false,
        isOpen: info.is_open ? info.is_open : false,
        colorTheme: navBarColor.value || ''
      });
      updateGlobalState();
      edit.value = true;
      editId.value = null;
      awaiting.value = false;
      swalSuccess('Dados salvos com sucesso!');
    },
    () => {
      swalError('Erro ao salvar os dados',
        'Por favor, verifique os dados inseridos');
      awaiting.value = false;

    }
  );
};

const editStore = (storeData: storeType) => {
  const imageUpdate = image ? image : null;
  store.updateStore(editId.value, storeData, imageUpdate, (info: any) => {
    const storIndex = data.value
      .findIndex((entity: storeType) => entity.id === editId.value);
    data.value[storIndex] = {
      id: editId.value,
      category: category.value || '',
      src: `${URL_HOST}${info.avatar_url}` || '',
      name: name.value,
      active: data.value[storIndex].active,
      isOpen: info.is_open ? info.is_open : false,
      colorTheme: navBarColor.value || ''
    };
    updateGlobalState();
    editId.value = null;
    awaiting.value = false;
    swalSuccess('Dados salvos com sucesso!');
    edit.value = true;

  }, () => {
    swalError('Erro ao salvar os dados',
      'Por favor, verifique os dados inseridos');
    awaiting.value = false;
  });
};

const deleteForm = (id: number) => {
  const storeFiltered: storeType[] = data.value
    .filter((entity: storeType) => entity.id !== id);
  store.deleteStore(id,
    () => {
      data.value = storeFiltered;   
      swalSuccess('Dados excluídos com sucesso');
      if (storeFiltered.length === 0) {
        startFormCreateStore();
      }
      updateGlobalState();

    },
    () => swalSuccess('Erro no processamento da exclusão')
  );
};

const editForm = async (id: number) => {
  editId.value = id;
  const storeFiltered: storeType[] = data.value
    .filter((entity: storeType) => entity.id == id);
  store.getStoreById(id, (data: any) => {
    console.log(data);
    description.value = data.description;
    category.value = data.category ? data.category
      .charAt(0).toUpperCase() + data.category.slice(1) : '';
    name.value = storeFiltered[0].name;
    imageUrl.value = storeFiltered[0].src;
    cnpj.value = data.cnpj;
    navBarColor.value = data.color_theme;
   
    if (data.address) {
      address.value = data.address.street;
      city.value = data.address.city;
      neighborhood.value = data.address.neighborhood || '';
      cep.value = data.address.postal_code ? cepMask(data.address.postal_code) : '';
      numberAddress.value = data.address.number ? data.address.number : '';
      state.value = data.address.state;
    }
    edit.value = false;
  }, (erro: any) => {
    console.error('Request failed:', erro);
    Swal.fire('Falha ao tentar carregar as lojas. Tente novamente');
  });
};

const updateGlobalState = () => {
  const active = data.value.find((field: any) => field.active);
  console.log(active);
  if (active) {
    const objectActive = {
      ...active
    };
    storeActive.setStore(objectActive);
  } else {
    storeActive.setStore({
      id: 0,
      active: false,
      isOpen: false
    });
  }
};

const objectForm = () => ({
  src: image,
  name: name.value,
  description: description.value,
  address: address.value,
  category: category.value.toLowerCase(),
  neighborhood: neighborhood.value,
  numberAddress: numberAddress.value,
  state: state.value,
  city: city.value,
  cnpj: cnpj.value,
  cep: cep.value,
  colorTheme: navBarColor.value
});

const startFormCreateStore = () => {
  address.value = '';
  description.value = '';
  category.value = '';
  name.value = '';
  imageUrl.value = '';
  cep.value = '';
  numberAddress.value = '';
  state.value = '';
  city.value = '';
  cnpj.value = '';
  neighborhood.value = '';
  edit.value = false;
  editId.value = null;
};

onMounted(() => {
  isLoading.value = true;
  store.getStores((info: any) => {
    console.log(info);
    data.value = info.result.stores.map((stor: any) => ({
      id: stor.id,
      category: stor.category || '',
      src: `${URL_HOST}${stor.avatar_url}` || '',
      name: stor.name,
      active: false,
      isOpen: stor.is_open ? stor.is_open : false,
      colorTheme: stor.color_theme || ''
    }));
    isLoading.value = false;
    edit.value = true;
    if (storeActive.storeActive.id !== 0) {
      const index = data.value
        .findIndex((field: any) => field.id === storeActive.storeActive.id);
      data.value[index].active = true;
    }
  },
  (erro: any) => {
    isLoading.value = false;
    console.error('Request failed:', erro);
    Swal.fire('Falha ao tentar carregar as lojas. Tente novamente');
  });

});
</script>
<template>
  <template v-if="isLoading">
    <LoadingSpiner :isLoading="isLoading"/>
  </template>
  <template v-else>
      <template v-if="!edit">
        <div
        class="container mt-4 p-5 bg-white w-90"
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
                 />
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
            <div class="form-group d-flex align-items-center align-center">
                 <label class="mt-2" for="navbar-color">
                  Escolha uma cor para a Navbar:</label>
                 <input type="color"
                 id="navbar-color"
                 name="navbar-color"
                 v-model="navBarColor">
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
                    maxlength="9"
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
      <template v-else >
          <div class="form-container">
            <TableList
            title="Lojas cadastradas"
            tableOne="Loja"
            tableTwo="Nome"
            tableThree="Categoria"
            tableFour="Exibir loja"
            :handleEdit="editForm"
            :handleClick="handleDelete"
            :handleStatus="handleStatus"
            :handleActive="openStore"
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
</template>

<style scoped>
.bg-secondary {
  background-color: #ccc !important;
}

.form-container {
  background-color: white;
  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
  padding: 20px;
  width: 72%;
  height: 62vh;
}

.register-form-btn {
  color: #ffffff;
  background-color: #ff1818;
  font-size: 16px;
  width: 230px;
  height: 50px;
  border-radius: 5px;
}

.register-form-btn {
  cursor: pointer;
}

#uploadedImage {
  width: 150%;
  height: 150%;
  object-fit: cover; 
}
</style>
