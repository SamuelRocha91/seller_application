import { createStorage, type SimpleStorage } from './storage';
import { type storeCreateType } from '../types/storeType';
const URL = import.meta.env.VITE_BASE_URL;

class StoreService {
  storage: SimpleStorage;

  constructor() {
    const persistent: boolean = this.whatIsMyStorage();
    this.storage = createStorage(persistent);
  }

  getFallback(key: string): string | null {
    return this.storage.get(key);
  }


  createStore(
    dataStore: storeCreateType,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const formData = this.formData(dataStore);
    formData.append('store[avatar]', dataStore.src);
    const token = this.getFallback('token');
    fetch(`${URL}/stores`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: formData
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess);
      } else {
        this.failure(response, onFailure);
      }
    });
  }

  updateStore(
    id: number,dataStore: storeCreateType,
    image: File | null,onSuccess: () => void,
    onFailure: () => void
  ) {
    const formData = this.formData(dataStore);
    if (image !== null) {
      formData.append('store[avatar]', image);
    }
    const token = this.getFallback('token');
    fetch(`${URL}/stores/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: formData
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess, "update");
      } else {
        this.failure(response, onFailure);
      }
    });
  }

  deleteStore(id: number, onSuccess: () => void, onFailure: () => void) {
    const token = this.getFallback('token');
  
    fetch(`${URL}/stores/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        this.failure(response, onFailure);
      }
    });
  }

  failure(response: Response, onFailure: () => void) {
    onFailure();
  }

  success(
    response: Response,
    onSuccess: () => void,
    type = "generate"
  ) {
    if (type == "generate") {
      response.json().then((json) => {
        this.generateStorage(json);
        onSuccess();
      });
    } else if(type == "update") {
      response.json().then(async (json) => {
        this.updateStorage(json);
        onSuccess();
      });
    } else {
      onSuccess();
    }
  }

  private whatIsMyStorage() {
    const transient = createStorage(false);
    if (transient.get('token') != undefined) {
      return false;
    } else {
      return true;
    }
  }

  private formData(dataStore: storeCreateType) {
    const formData = new FormData();
    // formData.append('store[avatar]', dataStore.src);
    formData.append('store[name]', dataStore.name);
    formData.append('store[category]', dataStore.category);
    formData.append('store[price_minimum]', dataStore.price);
    formData.append('store[description]', dataStore.description);
    formData.append('store[address]', dataStore.address);
    formData.append('store[phone_number]', dataStore.phoneNumber);
    return formData;
  }

  private generateObjectSeller(json: any) {
    return {
      id: json.id,
      src: `${URL}${json.avatar_url}`,
      name: json.name,
      price: json.price_minimum,
      description: json.description,
      phoneNumber: json.phone_number,
      category: json.category,
      address: json.address,
    };
  }

  private generateStorage(json: any) {
    const storage = this.storage.get('stores') || '';
    const storeSaved = this.generateObjectSeller(json);
    if (storage != '') {
      const store = JSON.parse(storage);
      const data = [...store, {
        ...storeSaved
      }];
      this.storage.store('stores', JSON.stringify(data));
    } else {
      this.storage.store('stores', JSON.stringify([{
        ...storeSaved
      }]));
    }
  }

  private updateStorage(json: any) {
    const storage = this.storage.get('stores') || '';
    const storeSaved =  this.generateObjectSeller(json);
    if (storage != '') {
      const store = JSON.parse(storage);
      const index = store
        .findIndex((item: any) => item.id === storeSaved.id);

      store[index] = storeSaved;

      this.storage.store('stores', JSON.stringify(store));
    } 
  }

}

export { StoreService };

