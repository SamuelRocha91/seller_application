<script setup lang="ts">
import { ref } from 'vue'
import { categories, prices} from '@/utils/data';
const imageUrl = ref('')
const handleImageChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  const file = inputElement.files ? inputElement.files[0] : null
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
  }
}
</script>

<template>
  <div class="form-container">
    <form id="uploadForm" action="/upload" method="post" enctype="multipart/form-data">
      <div class="form-init">
        <div class="image-form">
          <div class="image-container">
            <img id="uploadedImage" :src="imageUrl" alt="" />
          </div>
          <label for="imageInput" class="custom-file-upload">Alterar foto de perfil</label>
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
            <input class="bg-input" type="text" name="" id="" />
          </label>
          <label for="">
            <p>Endereço</p>
            <input class="bg-input" type="text" />
          </label>
        </div>
      </div>
      <div class="section-intermediate">
        <div class="intermediate-content">
          <div >
            <p>Categoria</p>
            <select name="" id="" class="select-box">
            <option v-for="(categoria, index) in categories" :key="index" :value="categoria">{{ categoria }}</option>
            </select>
          </div>
          <div>
            <p>Pedido Mínimo</p>
            <select name="" id="" class="select-box">
              <option v-for="(price, index) in prices" :key="index" :value="price" class="content-option">{{ price }}</option>
            </select>
          </div>
          <div class="input-phone">
            <p>Telefone</p>
            <input class="bg-input" type="text" name="" id="" />
          </div>
        </div>
      </div>
      <div class="section-finish">
        <div class="text-description">
          <p>Descrição</p>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="btn-div"><button type="submit" class="save-form-btn">Salvar</button></div>
      </div>
    </form>
  </div>
</template>

<style scoped>

.select-box {
  width: 200px; /* Largura desejada */
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
  height: auto;
  border-radius: 50%;
}

.form-init {
  display: flex;
}

.save-form-btn {
  color: #ffffff;
  background-color: #ff1818;
  font-size: 16px;
  width: 70px;
  height: 50px;
  border-radius: 5px;
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
  height: 25vh;
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
  height: 150px;
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

</style>
