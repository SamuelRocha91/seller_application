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
import { useProductsStore } from '@/store/productsStore';
import { type dataProductsRequest } from '@/types/productTypes';
import debounce from 'lodash.debounce';
import Swal from 'sweetalert2';

let image: File | string;

const URL_HOST = import.meta.env.VITE_BASE_URL;

const awaiting = ref(false);
const category = defineModel('category', { default: '' });
const data = ref();
const description = defineModel('description', { default: '' });
const editId = ref();
const imageUrl = ref();
const filterName = defineModel('filterName', { default: '' });
const menuPage = ref(true);
const name = defineModel('name', { default: '' });
const price = ref('');
const productService = new ProductService();
const storeActive = useStoreActive().storeActive;
const productsStore = useProductsStore();
const current = ref(0);
const next = ref(0);
const previous = ref(0);
const pages= ref(0);
const isLoading = ref(false);

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

const handlePage = (page: number) => {
  if (page > 0 && page <= pages.value) {
    getlist(page);
  }
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
    .map((entity: any) => {
      if (entity.id == id) {
        entity.active = !entity.active;
        productService.updateProductAvailable(storeActive.id, id, entity.active,
          () => Swal.fire("Estado do produto atualizado com sucesso"),
          () => Swal.fire('Falha ao atualizar estado do produto'));
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

const deleteForm = (id: number) => {
  const productFiltered: any[] = data.value
    .filter((entity: any) => entity.id !== id);
  startFormCreateProduct();
  productService.deleteProduct(storeActive.id, id,
    () => swalSuccess('Dados excluídos com sucesso'),
    () => swalSuccess('Erro no processamento da exclusão')
  );
  data.value = productFiltered;
  productsStore.productActive = productFiltered;
};

const goToFormCreate = () => {
  menuPage.value = true;
  startFormCreateProduct();
};

const createProduct = (dataProduct: any) => {
  productService.createProduct(
    storeActive.id,
    dataProduct,
    (info: any) => {
      if (data.value.length < 4) {
        data.value.push(
          {
            id: info.id,
            name: info.title,
            src: `${URL_HOST}${info.image_url}`,
            price: info.price,
            category: info.category
          }
        );
      }
      editId.value = null;
      awaiting.value = false;
      menuPage.value = false;
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
    imageUpdate, (info: any) => {
      const index = data.value.findIndex((field: any) => field.id == info.id);
      data.value[index] =  {
        id: info.id,
        name: info.title,
        src: `${URL_HOST}${info.image_url}`,
        price: info.price,
        category: info.category
      };
      awaiting.value = false;
      menuPage.value = false;
      swalSuccess('Dados atualizados com sucesso!');
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
  productService.getProductById(storeActive.id,
    productFiltered[0].id, (info: any) => {
      description.value = productFiltered[0].description;
      category.value =
        info.category.charAt(0).toUpperCase() + info.category.slice(1);
      name.value = productFiltered[0].name;
      imageUrl.value = productFiltered[0].src;
      price.value = info.price;
      image = productFiltered[0].src;
      menuPage.value = true;
    }, (erro: any) => {
      console.error('Request failed:', erro);
      Swal.fire('Falha ao tentar carregar as lojas. Tente novamente');
    });
};

const filteredStores = () => {
  getlist(1, filterName.value.toLowerCase(), category.value.toLowerCase());
};

const debouncedSearch = debounce(filteredStores, 300);

const getlist = (page: number, search = '', category = '') => {
  isLoading.value = true;
  productService.getProducts(
    Number(storeActive.id),
    (info: dataProductsRequest) => {
      isLoading.value = false;
      data.value = info.result.products.map((product: any) => ({
        ...product,
        src: `${URL_HOST}${product.image_url}`,
        name: product.title,
        active: product.product_available,
      }));
      next.value = info.result.pagination.next || 1;
      pages.value = info.result.pagination.pages;
      current.value = info.result.pagination.current || 1;
      previous.value = info.result.pagination.previous || 1;
    },
    (error: any) => {
      console.error('Request failed:', error);
      Swal.fire('Falha ao tentar carregar os produtos. Tente novamente');
      isLoading.value = false;
    },
    page,
    search,
    category,
  );
};

const startFormCreateProduct = () => {
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
  category: category.value.toLowerCase(),
});

onMounted(() => {
  if (storeActive.active) {
    isLoading.value = true;
    productService.getProducts(storeActive.id, (info: any) => {
      if (info && info.result && info.result.product && info.result.product.length > 0) {
        data.value = info.result.products.map((product: any) => ({
          ...product,
          name: product.title,
          src: `${URL_HOST}${product.thumbnail_url}`,
          active: product.product_available,
          category: ''
        }));
        next.value = info.result.pagination.next || 1;
        pages.value = info.result.pagination.pages;
        current.value = info.result.pagination.current || 1;
        previous.value = info.result.pagination.previous || 1;
        isLoading.value = false;
        menuPage.value = false;

      } else {
        isLoading.value = false;
        menuPage.value = true;
      }
    }, (erro: any) => {
      console.error('Request failed:', erro);
      isLoading.value = false;
      Swal.fire('Falha ao tentar carregar as lojas. Tente novamente');
    }, 1);
  }
});
</script>
<template>
   <template v-if="isLoading">
    <LoadingSpiner :isLoading="isLoading"/>
  </template>
  <template v-else>
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
              :display="true"
              :handleClick="goToFormCreate"
            />
            <div class="filters-menu">
              <label for="">
                <input
                 class="bg-input-2"
                 placeholder="Busque pelo nome do item"
                 type="search"
                 v-model="filterName"
                 @input="debouncedSearch"
                 >
              </label>
              <select
              class="select-box-2"
              v-model="category"
               @change="debouncedSearch">
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
              tableFour="Produto disponível"
              :handleEdit="editForm"
              :handleClick="handleDelete"
              :handleStatus="handleStatus"
              :data="data"
              />
            </div>
             <nav>
              <ul class="pagination justify-content-end">
                <li class="page-item" :class="{ disabled: current === 1 }">
                  <a class="page-link" href="#" @click.prevent="handlePage(previous)">
                    Anterior
                  </a>
                </li>
                <li class="page-item" v-for="page in pages" :key="page" :class="{ active: current === page }">
                  <a class="page-link" href="#" @click.prevent="handlePage(page)">
                    {{ page }}
                  </a>
                </li>
                <li class="page-item" :class="{ disabled: current === pages }">
                  <a class="page-link" href="#" @click.prevent="handlePage(next)">
                    Próxima
                  </a>
                </li>
              </ul>
             </nav>
  
          </div>
     </template>
  </template>
</template>
<style scoped>

.filters-menu label {
  width: 50%;
}
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
.select-box {
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
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
.main-content{
  background-color: gray;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  gap: 8px;
  flex-direction: column;
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
  width: 72%;
  height: 67vh;
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
.filters-menu {
  margin-top: 5px;
  background-color: white;  
  width: 72%;
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
}
.content-menu {
  background-color: white;
  padding: 20px;
  width: 72%;
  height: 100%;
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
  width: 99%;
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
  width: 87%;
  height: fit-content;
  justify-content: center;
}
.text-description textarea {
  width: 90%;
  height: 200px;
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