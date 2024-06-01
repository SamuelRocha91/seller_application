import { type storeType } from '../types/storeType';
import { BaseService } from './abstractService';

class StoreService extends BaseService{
  constructor() {
    super();
  }

  async getStores(
    onSuccess: (data?: any) => void,
    onFailure: (data: any) => void
  ) {
    const response = await this.getAll('stores');
    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(response, onFailure);
    }
  }

  async createStore(
    dataStore: storeType,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const formData = this.formData(dataStore);
    formData.append('store[avatar]', dataStore.src);
    const response = await this.create('stores', formData);
    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(response, onFailure);
    }
  }

  async openStore(
    id: number,
    active: boolean,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const formData = new FormData();
    formData.append('store[is_open]', active ? "true" : "false");
    const response = await this.update(id, 'stores', formData);
    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(response, onFailure);
    }
  }

  async updateStore(
    id: number,
    dataStore: storeType,
    image: File | string | null,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const formData = this.formData(dataStore);
    if (image !== null) {
      formData.append('store[avatar]', image);
    }
    const response = await this.update(id, 'stores', formData);
    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(response, onFailure);
    }
  }
  
  async deleteStore(id: number, onSuccess: () => void, onFailure: () => void) {
    const response = await this.delete(id, 'stores');
    if (response.ok) {
      onSuccess();
    } else {
      this.failure(response, onFailure);
    }
  }

  failure(response: Response, onFailure: (data: any) => void) {
    response.json().then((json) => {
      onFailure(json);
    });
  }

  success(
    response: Response,
    onSuccess: (data?: any) => void,
  ) {
    response.json().then((json) => {
      onSuccess(json);
    });
  }

  private formData(dataStore: storeType) {
    const formData = new FormData();
    formData.append('store[name]', dataStore.name);
    formData.append('store[category]', dataStore.category);
    formData.append('store[cep]', dataStore.cep);
    formData.append('store[description]', dataStore.description);
    formData.append('store[address]', dataStore.address);
    formData.append('store[cnpj]', dataStore.cnpj);
    formData.append('store[city]', dataStore.city);
    formData.append('store[state]', dataStore.state);
    formData.append('store[number_address]', dataStore.numberAddress);
    formData.append('store[neighborhood]', dataStore.neighborhood);
    formData.append('store[is_open]',"false");
    return formData;
  }
}

export { StoreService };

