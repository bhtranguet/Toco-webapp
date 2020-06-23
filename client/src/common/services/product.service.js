var BaseService = require('common/base/base_service');
class ProductService extends BaseService {
  getProductsByCategory(catID) {
    var url = `${this.baseUrl}/api/product_controller/categories/${catID}/products?limit=6`;
    this.get(url);
  }

  getCategories() {
    return fetch(`http://localhost:8000/api/product_controller/categories`);
  }

  getCategoryById(id) {
    return fetch(`${this.baseUrl}/api/product_controller/categories/${id}`);
  }

  getAllCollection() {
    return fetch(`${this.baseUrl}/api/product_controller/all_collection`);
  }

  getAllProduct() {
    return fetch(`${this.baseUrl}/api/product_controller/products`);
  }

  getProductById(id) {
    return fetch(`${this.baseUrl}/api/product_controller/product/${id}`);
  }

  updateProduct(product) {
    return this.put(`${this.baseUrl}/api/product_controller/products/${product.id}`, product);
  }

  addProduct(product) {
    return this.post(`${this.baseUrl}/api/product_controller/products`, product);
  }

}

module.exports = ProductService;