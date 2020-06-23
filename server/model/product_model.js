var BaseModel = require("./base_model.js");
class ProductModel extends BaseModel {
  constructor() {
    super();
  }

  getProductsByCategory(categoryID, limit = 0) {
    var queryString = `select p.* from product p inner join product_product_category pc on p.id = pc.product_id where pc.product_category_id = ${categoryID} ${limit > 0 ? `limit ${limit}` : ''}`;
    return this.query(queryString);
  }

  getCategories() {
    var queryString = 'select * from product_category';
    return this.query(queryString);
  }

  getCategoryById(id) {
    var queryString = `select * from product_category where id=${id}`;
    return this.query(queryString);
  }

  getAllCollection() {
    return this.executeProcedure('CALL getALLCollection();', null);
  }

  getAllProduct() {
    var queryString = 'SELECT p.*, pc.id catId, pc.name catName FROM product p INNER JOIN product_product_category ppc ON p.id = ppc.product_id INNER JOIN product_category pc ON ppc.product_category_id = pc.id;';
    return this.query(queryString);
  }

  getProductById(id) {
    var queryString = `SELECT * FROM product WHERE id = ${id}`;
    return this.query(queryString);
  }

  updateProduct(product) {
    var queryString = `UPDATE product SET name='${product.name}', description='${product.description}', origin_price='${product.origin_price}', sale_price='${product.sale_price}', image_path='${product.image_path}' WHERE id = ${product.id}`;
    return this.execute(queryString);
  }

  addProduct(product) {
    var queryString = `UPDATE product SET name='${product.name}', description='${product.description}', origin_price='${product.origin_price}', sale_price='${product.sale_price}', image_path='${product.image_path}' WHERE id = ${product.id}`;
    return this.execute(queryString);
  }

}
module.exports = ProductModel;