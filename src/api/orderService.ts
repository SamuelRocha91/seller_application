import { BaseService } from "./abstractService";
import { fetchEventSource } from '@microsoft/fetch-event-source';

class OrderService extends BaseService {
  async connectToOrderStream(storeId: number, success: (data: any) => void) {
    const token = this.getFallback('token');
    fetchEventSource(`${this.apiUrl}/stores/${storeId}/orders/new`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-API-KEY': BaseService.X_API_KEY
      },
      async onopen(response) {
        if (response.ok) {
          console.log('Conexão estabelecida');
        } else {
          console.log('Erro ao estabelecer conexão');
        }
      },
      onmessage(msg) {
        if (msg.event === 'new orders') {
          success(msg.data);
        }
      },
      onerror(err) {
        console.log(err);
      }
    });
  }
}

export default new OrderService();  