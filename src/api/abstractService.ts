import { createStorage, type SimpleStorage } from '../utils/storage';
import { Auth } from '@/utils/auth';

abstract class BaseService {
  protected apiUrl: string;
  storage: SimpleStorage;
  static X_API_KEY = import.meta.env.VITE_X_API_KEY;
  protected auth: Auth;


  constructor() {
    this.apiUrl = import.meta.env.VITE_BASE_URL;
    const persistent: boolean = this.whatIsMyStorage();
    this.storage = createStorage(persistent);
    this.auth = new Auth(persistent);

  }
    
  getFallback(key: string): string | null {
    return this.storage.get(key);
  }

  protected async getEntity(path: string): Promise<Response> {
    const token = this.getFallback('token');
    const response = await fetch(`${this.apiUrl}/${path}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-API-KEY': BaseService.X_API_KEY

        }
      }
    );
    return response;
  }
    
  protected async create<T extends BodyInit | null | undefined>(path: string, data: T): Promise<Response> {
    const token = this.getFallback('token');
    const response = await fetch(`${this.apiUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-API-KEY': BaseService.X_API_KEY

      },
      body: data
    });
    return response;
  }
  
  protected async update
    <T extends BodyInit | null | undefined>
  (
    id: number,
    path: string,
    data: T
  ): Promise<Response> {
      const token = this.getFallback('token');

      const response = await fetch(`${this.apiUrl}/${path}/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-API-KEY': BaseService.X_API_KEY
        },
        body: data
      });
      return response;
    }

  protected patch(path: string) {
    const token = this.getFallback('token');
    const response = fetch(`${this.apiUrl}/${path}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-API-KEY': BaseService.X_API_KEY
      }
    });
    return response;
  }
    

  protected async delete(id: number, path: string): Promise<Response> {
    const token = this.getFallback('token');
    const response = await fetch(`${this.apiUrl}/${path}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-API-KEY': BaseService.X_API_KEY
      }
    });
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

  protected async refreshToken() {
    const refresh_token = this.storage.get('refresh_token') || '[]';
    const parseRefresh = refresh_token;
    await this.auth.refreshTokens(parseRefresh);
  }
}

export { BaseService };