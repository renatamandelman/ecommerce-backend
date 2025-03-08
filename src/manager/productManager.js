import ProductModel from "../models/product.model.js";

export class ProductManager {
  constructor() {
    this.products = [];
  }
async getProducts() {
  try{
    const products = await ProductModel.find().lean();
    return products;
  } catch(error){
    console.log(`Error: ${error.message}`);
  }
  }
  async getProductById(id) {
  try{
    const product = await ProductModel.findById(id).lean();
    if (!product) throw new Error("Product not found");
    return product;
  } catch(error){
    console.log(`Error: ${error.message}`);
  }
}
  async addProduct(product) {
    //desectructuro el producto en las variables que me interesan recibir
    try {
      const {code} = product;
      const productExist = this.products.find((product) => product.code === code);
      if (productExist) throw new Error(`El producto con el codigo ${code} ya existe`);
     
      const newProduct = new ProductModel(product);
      await newProduct.save();
      this.products.push(newProduct);
      return newProduct;

    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  async updateProduct(id, productData){
    try {
      const product = await ProductModel.findByIdAndUpdate(id, productData, {new: true});
      if(!product) throw new Error("no se encuentra ese producto");
      return product;
      }   
     catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
async deleteProduct(id){
  try {
    const product = await ProductModel.findByIdAndDelete(id);
    if(!product) throw new Error("No existe el producto");
    return product;
} catch (error) {
    console.log(`Error: ${error.message}`);
  }

}
}

const products = new ProductManager();

