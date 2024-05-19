<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { swalError, swalSuccess, swallWithDelete } from '../../utils/swal';
import { catergoriesProducts } from '@/utils/data';
import { priceMask } from '@/utils/formUtils';
import ShoppingCart from './../../assets/icons/ShoppingCart.png';
import Menu from '../../assets/icons/Menu.png';
import TableList from '../dashboard/TableList.vue';
import PageInfo from '../dashboard/PageInfo.vue';
import { ProductService } from '@/api/productService';
import { useStoreActive } from '@/store/storeActive';
import '../../assets/global.css';

let image: File | string;

const imageUrl = ref();
const category = defineModel('category', { default: '' });
const name = defineModel('name', { default: '' });
const price = ref('');
const description = defineModel('description', { default: '' });
const awaiting = ref(false);
const menuPage = ref(true);
const data = ref();
const productService = new ProductService();
const storeActive = useStoreActive().storeActive;
const editId = ref();


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
    .map((entity: any) => {
      if (entity.id == id) {
        entity.active = !entity.active ;
      } 
    });
  const storage = productService.storage.get('stores') || '';
  const store = JSON.parse(storage);
  const index = store
    .findIndex((field: any) => Number(field.id) === Number(storeActive.id));
  store[index].products = data.value;
  productService.storage.store('stores', JSON.stringify(store));
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
  const productData = objectForm();
  if (editId.value) {
    awaiting.value = true;
    editProduct(productData);
  } else {
    awaiting.value = true;
    createProduct(productData);
  }
};

const handleDelete = (id: number) => {
  swallWithDelete(() => deleteForm(id));
};

const deleteForm = (id: number) => {
  const productFiltered: any[] = data.value
    .filter((entity: any) => entity.id !== id);
  startFormCreateStore();
  const storage = productService.storage.get('stores') || '';
  const store = JSON.parse(storage);
  const index = store
    .findIndex((field: any) => Number(field.id) === Number(storeActive.id));
  store[index].products = productFiltered;
  productService.storage.store('stores', JSON.stringify(store));
  productService.deleteProduct(storeActive.id, id,
    () => swalSuccess('Dados excluídos com sucesso'),
    () => swalSuccess('Erro no processamento da exclusão')
  );
  data.value = productFiltered;
};

const createProduct = (dataProduct: any) => {
  productService.createProduct(
    storeActive.id,
    dataProduct,
    () => {
      const establishment: any = productService.storage.get('stores') || [];
      if (establishment !== null) {
        const parseEstablishment = JSON.parse(establishment);
        const products = parseEstablishment
          .find((fields: any) =>
            Number(fields.id) == storeActive.id).products || '';
        data.value = products;
        editId.value = null;
        awaiting.value = false;
        menuPage.value = false;
      }
      swalSuccess('Dados salvos com sucesso!');
    },
    () => {
      swalError('Erro ao salvar os dados',
        'Por favor, verifique os dados inseridos');
      awaiting.value = false;
    }
  );
};


const editProduct = (productData: any) => {
  const imageUpdate = productData.src === image ? null : image;
  productService.updateProduct(
    storeActive.id,
    editId.value,
    productData,
    imageUpdate, () => {
      const establishment = productService.storage.get('stores') || '';
      const parseEstablishment = JSON.parse(establishment);
      const products = parseEstablishment
        .find((fields: any) =>
          Number(fields.id) == storeActive.id).products || '';
      data.value = products;
      swalSuccess('Dados atualizados com sucesso!');
      awaiting.value = false;
      menuPage.value = false;
    }, () => {
      swalError('Erro ao salvar os dados',
        'Por favor, verifique os dados inseridos');
      awaiting.value = false;
    });
};

const editForm = async (id: number) => {
  editId.value = id;
  const productFiltered: any[] = data.value
    .filter((entity: any) => entity.id == id);

  description.value = productFiltered[0].description;
  category.value = productFiltered[0].category;
  name.value = productFiltered[0].name;
  imageUrl.value = productFiltered[0].src;
  price.value = productFiltered[0].price;
  image = productFiltered[0].src;
  menuPage.value = true;
};

const startFormCreateStore = () => {
  description.value = '';
  category.value = '';
  name.value = '';
  price.value = '';
  imageUrl.value = '';
  editId.value = null;
};

const objectForm = () => ({
  src: image,
  name: name.value,
  price: parseFloat(price.value),
  description: description.value,
  category: category.value,
});

onMounted(() => {
  const sellerData = productService.getFallback('stores') || '';
  const seller = sellerData ? JSON.parse(sellerData) : null;
  if (seller !== null) {
    const sellerACtive = seller
      .find((cart: any) => Number(cart.id) == Number(storeActive.id));
    if (sellerACtive.products.length != 0) {
      data.value = sellerACtive.products;
      menuPage.value = false;
    }
  }
});
</script>
<template>
  <template v-if="menuPage">
    <div class="main-content" >
        <PageInfo
              :src="ShoppingCart"
              alt="ícone de carrinho"
              title="Dados do produto"
              description="Adicione um novo produto"
            />
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
     </div>
  </template>
  <template v-else>
    <div class="main-content" >
        <PageInfo
            :src="Menu"
            alt="ícone de menu"
            title="Cardápios"
            description="Gerencie os itens disponíveis em sua loja
            através do cardápio"
          />
          <div class="filters-menu">
            <label for="">
              <input 
               class="bg-input-2"
               placeholder="Busque pelo nome do item" 
               type="search">
            </label>
            <select class="select-box-2" v-model="category">
                <option value="" disabled selected>
                  Filtrar por categoria
                </option>
               <option
                v-for="(categoria, index) in catergoriesProducts"
                :key="index"
                :value="categoria"
                >
                  {{ categoria }}
                </option>
              </select>
          </div>
          <div class="content-menu">
            <TableList 
            title="Produtos cadastrados"
            tableOne="Produto"
            tableTwo="Nome"
            tableThree="Preço"
            :handleEdit="editForm"
            :handleClick="handleDelete"
            :handleStatus="handleStatus"
            :data="data"
            />
          </div>
        </div>
   </template>
</template>
<style scoped>

.bg-input-2 {
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
  width: 99%;
}

.content-menu {
  background-color: white;
  padding: 20px;
  width: 90%;
  height: 100%;
}

.filters-menu {
  margin-top: 5px;
  background-color: white;  
  width: 90%;
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
}

.filters-menu label {
  width: 50%;
}

.form-init {
  border: 1px solid rgb(189, 187, 187);
}

.image-form {
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.intermediate {
  width: 100%;
}

.intermediate-content {
  justify-content: space-between;
}

.label-intermediate {
  margin-left: 4%;
  width: 90%;
}

.main-content{
  background-color: gray;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  gap: 8px;
  flex-direction: column;
}

.section-finish {
  height: 32.0vh;
  border: 1px solid #ccc;
}

.section-intermediate {
  justify-content: space-between;
  border-right: 1px solid rgb(189, 187, 187);
  border-left: 1px solid rgb(189, 187, 187);
  align-items: center;
}

.select-box-2 {
  width: 400px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
  height: 41px;
}

.text-description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 87%;
  height: fit-content;
  justify-content: center;
}

</style>