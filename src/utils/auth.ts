import { swalError } from './swal';
import { createStorage, type SimpleStorage } from './storage';

class Auth {
  private storage: SimpleStorage;
  static URL = import.meta.env.VITE_BASE_URL;
  static X_API_KEY = import.meta.env.VITE_X_API_KEY;

  constructor(persistent = false) {
    this.storage = createStorage(persistent);
  }

  private getFallback(key: string): string | null {
    const transient = createStorage(false);
    const persistent = createStorage(true);
    return transient.get(key) || persistent.get(key);
  }

  success(response: Response, onSuccess: () => void) {
    response.json().then((json) => {
      if (json.token) {
        this.storage.store('token', json.token);
      }
      if (json.email) {
        this.storage.store('email', json.email);
      }
      if (json.refresh_token) {
        this.storage.store('refresh_token', json.refresh_token);
      }
      onSuccess();
    });
  }

  failure(response: Response, onFailure: () => void) {
    response.json().then((json) => {
      swalError('Erro no cadastro', json.message);
    });
    onFailure();
  }

  currentUser() {
    if (!this.isLoggedIn()) {
      return null;
    }
    return {
      email: this.getFallback('email')
    };
  }

  isLoggedIn() {
    return Boolean(this.getFallback('token'));
  }

  signOut(andThen = () => {}) {
    const transient = createStorage(false);
    const persistent = createStorage(true);
    transient.remove('token');
    transient.remove('email');
    transient.remove('refresh_token');
    persistent.remove('refresh_token');
    persistent.remove('token');
    persistent.remove('email');
    andThen();
  }

  async signIn(email: string,
    password: string,
    onSuccess: () => void,
    onFailure: () => void) {
    const body = {
      login: {
        email: email,
        password: password
      }
    };
    fetch(`${Auth.URL}/sign_in`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': Auth.X_API_KEY
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

  async signUp(
    email: string,
    password: string,
    password_confirmation: string,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const body = {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      }
    };
    await fetch(`${Auth.URL}/new`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': Auth.X_API_KEY
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

  async resetPassword(email: string, onSuccess: () => void, onFailure: () => void) {
    const body = {
      user: {
        email: email
      }
    };
    await fetch(`${Auth.URL}/users/password`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': Auth.X_API_KEY,
        'Authorization': 'Bearer ' + this.getFallback('token')
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFailure();
      }
    });
  }


  async refreshTokens(refresh_token: string) {
    const response = await fetch(`${Auth.URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': Auth.X_API_KEY
      },
      body: JSON.stringify({ refresh_token: refresh_token })
    });
    if (response.ok) {
      const data = await response.json();
      this.storage.store('token', data.token);
      this.storage.store('email', data.email);
      this.storage.store('refresh_token', data.refresh_token);
    } else {
      return null;
    }
  }

}

export { Auth };
