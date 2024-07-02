import { BaseService } from "./abstractService";
import { type analysis, type monthly_analysis, type heathMap } from "../types/analysis";

class AnalysisService extends BaseService {
  async getAnalysisProductSalesByDayOfWeek(storeId: number, success: (data: heathMap) => void) {
    const response = await this.getEntity(`/analysis/anacor?store_id=${storeId}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
  }

  async getAnalysisBilingDayOfTheWeek(storeId: number, success: (data: monthly_analysis) => void) {
    const response = await this.getEntity(`/analysis/monthly_analysis?store_id=${storeId}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
  }

  async getTotalOrders(storeId: number, success: (data: analysis) => void) {
    const response = await this.getEntity(`/analysis/total_orders?store_id=${storeId}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
  }

  async getTotalSales(storeId: number, success: (data: analysis) => void) {
    const response = await this.getEntity(`/analysis/total_sales?store_id=${storeId}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
  }

  async getPendingOrders(storeId: number, success: (data: analysis) => void) {
    const response = await this.getEntity(`/analysis/pending_orders?store_id=${storeId}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
  }

}

export { AnalysisService };