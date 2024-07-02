import { BaseService } from "./abstractService";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { type orderStream } from "@/types/orderTypes";

class OrderService extends BaseService {
  private controller: AbortController | undefined;
  async connectToOrderStream(storeId: number, success: (data: orderStream) => void, noConnection: () => void) {
    this.controller = new AbortController();
    const signal = this.controller.signal;
    const token = this.getFallback('token');
    fetchEventSource(`${this.apiUrl}/stores/${storeId}/orders/new`, {
      method: 'GET',
      signal,
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
          console.log(msg);
          const data = JSON.parse(msg.data);
          success(data);
        } else {
          console.log('Evento desconhecido');
          noConnection();
        }
      },
      onerror(err) {
        console.log(err);
      }
    });
  }

  disconnectFromOrderStream() {
    if (this.controller) {
      this.controller.abort();
      this.controller = undefined;
      console.log('Conexão encerrada');
    }
  }

  async getOrders(storeId: number, success: (data: any) => void, page: number = 1, data: string = '', status: string = '') {
    const response = await this.getEntity(`stores/${storeId}/orders?page=${page}&created_at=${data}&status=${status}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
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