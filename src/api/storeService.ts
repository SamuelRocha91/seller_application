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
      this.success(response, onSuccess, "update");
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
      this.generateStorage(json);
      onFailure(json);
    });
  }

  success(
    response: Response,
    onSuccess: (data?: any) => void,
    type = "generate"
  ) {
    if (type == "generate") {
      response.json().then((json) => {
        this.generateStorage(json);
        onSuccess(json);
      });
    } else if (type == "update") {
      response.json().then(async (json) => {
        this.updateStorage(json);
        onSuccess();
      });
    } else {
      onSuccess();
    }
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
    return formData;
  }

  private generateObjectSeller(json: any) {
    return {
      id: json.id,
      src: `${this.apiUrl}${json.avatar_url}`,
      name: json.name,
      price: json.price_minimum,
      description: json.description,
      phoneNumber: json.phone_number,
      category: json.category,
      address: json.address,
      active: false,
      products: []
    };
  }

  private generateStorage(json: storeType) {
    const storage = this.storage.get('stores') || '';
    const storeSaved = this.generateObjectSeller(json);
    if (storage != '') {
      storeSaved.active = false;
      const store = JSON.parse(storage);
      const data = [...store, {
        ...storeSaved
      }];
      this.storage.store('stores', JSON.stringify(data));
    } else {
      storeSaved.active = true;
      this.storage.store('stores', JSON.stringify([{
        ...storeSaved
      }]));
    }
  }

  private updateStorage(json: storeType) {
    const storage = this.storage.get('stores') || '';
    const storeSaved = this.generateObjectSeller(json);
    if (storage != '') {
      const store = JSON.parse(storage);
      const index = store
        .findIndex((item: any) => item.id === storeSaved.id);
      storeSaved.active = store[index].active;
      store[index] = storeSaved;

      this.storage.store('stores', JSON.stringify(store));
    }
  }

}

export { StoreService };

