import { BaseService } from "./abstractService";

class AnalysisService extends BaseService {
  async getAnalysisProductSalesByDayOfWeek(storeId: number, success: (data: any) => void) {
    const response = await this.getEntity(`/analysis/anacor?store_id=${storeId}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
  }

  async getAnalysisBilingDayOfTheWeek(storeId: number, success: (data: any) => void) {
    const response = await this.getEntity(`/analysis/monthly_analysis?store_id=${storeId}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
  }

}

export { AnalysisService };