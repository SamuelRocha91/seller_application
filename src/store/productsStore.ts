import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductsStore = defineStore('product', () => {
  const productActive = ref<any[]>([]);
    
  function setProduct(data: any) {
      
    const newProduct = {
      active: data.active,
      description: data.description,
      id: data.id,
      price: data.price,
      src: data.src,
      category: data.category,
      name: data.title
    };
      
    productActive.value.push(newProduct);
  }

  return { productActive, setProduct };
});