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

  async getOrderById(orderId: number, success: (data: any) => void) {
    const response = await this.getEntity(`buyers/orders/${orderId}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
  }

  async acceptOrder(storeId: number, orderId: number, success: () => void) {
    const response = await this.patch(`stores/${storeId}/orders/${orderId}/accept`);
    if (response.ok) {
      success();
    } else {
      console.log('Erro ao aceitar pedido');
    }
  }

  async cancelOrder(storeId: number, orderId: number, success: () => void) {
    const response = await this.patch(`stores/${storeId}/orders/${orderId}/cancel`);
    if (response.ok) {
      success();
    } else {
      console.log('Erro ao cancelar pedido');
    }
  }

  async startPreparation(storeId: number, orderId: number, success: () => void) {
    const response = await this.patch(`stores/${storeId}/orders/${orderId}/start_progress`);
    if (response.ok) {
      success();
    } else {
      console.log('Erro ao iniciar preparo');
    }
  }

  async readyForDelivery(storeId: number, orderId: number, success: () => void) {
    const response = await this.patch(`stores/${storeId}/orders/${orderId}/ready_for_delivery`);
    if (response.ok) {
      success();
    } else {
      console.log('Erro ao marcar como pronto para entrega');
    }
  }
}

export default new OrderService();  