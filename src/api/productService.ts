import { BaseService } from './abstractService';

class ProductService extends BaseService{
  constructor() {
    super();
  }
  
  async getProducts(
    id: number,  
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const response = await this.getAll(`stores/${id}/products`);
    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(response, onFailure);
    }
  }
  

  async createProduct(
    id: number,
    dataProduct: any,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const formData = new FormData();
    formData.append('product[image]', dataProduct.src);
    const response = await this.create(`stores/${id}/products`, formData);
    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(response, onFailure);
    }
  }

  async updateProduct(
    id: number,
    idProduct: number,
    dataProduct: any,
    onSuccess: () => void,
    onFailure: () => void,
  ) {
    const formData = new FormData();
    formData.append('product[image]', dataProduct.src);
    const response = await this.update(
      idProduct,
      `stores/${id}/products`,
      formData
    );
    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(response, onFailure);
    }
  }

  async deleteProduct(
    id: number,
    idProduct: number,
    onSuccess: () => void,
    onFailure: () => void) {
    const response = await this.delete(idProduct, `stores/${id}/products`);
    if (response.ok) {
      onSuccess();
    } else {
      this.failure(response, onFailure);
    }
  }

  success(response: Response, onSucess: () => void) {
    onSucess();  
  }
  
  failure(response: Response, onFailure: () => void) {
    onFailure();
  }  
}

export { ProductService };
