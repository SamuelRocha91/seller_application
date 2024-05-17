import { createStorage, type SimpleStorage } from '../utils/storage';

abstract class BaseService {
  protected apiUrl: string;
  storage: SimpleStorage;

  constructor() {
    this.apiUrl = import.meta.env.VITE_BASE_URL;
    const persistent: boolean = this.whatIsMyStorage();
    this.storage = createStorage(persistent);
  }
    
  getFallback(key: string): string | null {
    return this.storage.get(key);
  }
   
  async getAll(path: string): Promise<Response> {
    const token = this.getFallback('token');
    const response = await fetch(`${this.apiUrl}/${path}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  }
    
  private whatIsMyStorage() {
    const transient = createStorage(false);
    if (transient.get('token') != undefined) {
      return false;
    } else {
      return true;
    }
  }
}

export { BaseService };