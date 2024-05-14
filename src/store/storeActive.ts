import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStoreActive = defineStore('store', () => {
  const storeActive = ref({
    active: false,
    address: '', 
    description: '',
    id: 0,
    phoneNumber: '',
    price: '',
    src: '',
    category: '',
    name: ''
  });
  function setStore(data: any) {
    storeActive.value.active = data.active;
    storeActive.value.address = data.address;
    storeActive.value.description = data.description;
    storeActive.value.id = data.id;
    storeActive.value.phoneNumber = data.phoneNumber;
    storeActive.value.price = data.price;
    storeActive.value.src = data.src;
    storeActive.value.category = data.category;
  }

  return { setStore, storeActive };
});
