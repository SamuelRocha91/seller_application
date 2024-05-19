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
      this.success(response, onSuccess, id);
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
    const formData = this.formData(dataProduct);
    formData.append('product[image]', dataProduct.src);
    const response = await this.create(`stores/${id}/products`, formData);
    if (response.ok) {
      this.success(response, onSuccess, id);
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
      this.success(response, onSuccess, id);
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

  success(
    response: Response,
    onSuccess: () => void,
    id: number,
    type = "generate"
  ) {
    if (type == "generate") {
      response.json().then((json) => {
        this.generateStorage(json, id);
        onSuccess();
      });
    } 
  }
  
  failure(response: Response, onFailure: () => void) {
    onFailure();
  }  


  private formData(dataProduct: any) {
    const formData = new FormData();
    formData.append('product[title]', dataProduct.name);
    formData.append('product[category]', dataProduct.category);
    formData.append('product[price]', dataProduct.price);
    formData.append('product[description]', dataProduct.description);
    return formData;
  }

  private generateObjectSeller(json: any) {
    return {
      id: json.id,
      src: `${this.apiUrl}${json.image_url}`,
      name: json.title,
      price: json.price,
      description: json.description,
      category: json.category,
      active: true
    };
  }

  private generateStorage(json: any, id: number) {
    const storage = this.storage.get('stores') || '';
    const productSaved = this.generateObjectSeller(json);
    if (storage != '') {
      console.log(json);
      const store = JSON.parse(storage);
      console.log(store);
      const index = store
        .findIndex((field: any) => Number(field.id) === Number(id));
      console.log(index, id);
      store[index].products.push(productSaved);
      console.log(store);
      this.storage.store('stores', JSON.stringify(store));
    } 
  }
}

export { ProductService };
