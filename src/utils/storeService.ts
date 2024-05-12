import { createStorage, type SimpleStorage } from './storage';

const URL = import.meta.env.VITE_BASE_URL;

class StoreService {
  storage: SimpleStorage;

  constructor() {
    const persistent: boolean = this.whatIsMyStorage();
    this.storage = createStorage(persistent);
  }

  private whatIsMyStorage() {
    const transient = createStorage(false);
    if (transient.get('token') != undefined) {
      return false;
    } else {
      return true;
    }
  }

  getFallback(key: string): string | null {
    return this.storage.get(key);
  }


  createStore(
    name: string,
    image: File,
    onSuccess: () => void, onFailure: () => void) {
    const formData = new FormData();
    formData.append('store[avatar]', image);
    formData.append('store[name]', name);
    const token = this.getFallback('token');
    fetch(`${URL}/stores`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: formData
            
    }).then((response) => {
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      console.log('Response body:', response.body);
      console.log(response);
      response.json().then((json) => console.log(json));
      if (response.ok) {
        this.success(response, onSuccess);
      } else {
        this.failure(response, onFailure);
      }
    });

  }
  updateStore(id: number,
    name: string,
    onSuccess: () => void,
    onFailure: () => void) {
    const body = {
      store: {
        name: name
      }
    };
    const token = this.getFallback('token');
        
    fetch(`${URL}/stores/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess);
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
        this.success(response, onSuccess);
      } else {
        this.failure(response, onFailure);
      }
    });
  }

  failure(response: Response, onFailure: () => void) {
    onFailure();
  }

  success(response: Response, onSuccess: () => void) {
    onSuccess();
    response.json().then((json) => console.log(json));
  }
}

export { StoreService };

