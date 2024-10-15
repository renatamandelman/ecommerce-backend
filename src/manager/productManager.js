import fs from "fs";
import path from "path";
import __dirname from "/Users/valeremandel/Desktop/coderHouse/ecommerce-Mandelman/dirname.js";

export class ProductManager {
  constructor() {
    this.products = [];
    this.pathFile = __dirname +  "/src/manager/data/products.json";
  }
async getProducts() {
  try{
    const productsJson = await fs.promises.readFile(this.pathFile, "utf-8");
    const productsParse = JSON.parse(productsJson);
    this.products = productsParse ||  []; //nos aseguramos que si devuelve null o undefined, que devuelva un array
    return this.products;
  } catch(error){
    console.log(`Error: ${error.message}`);
  }
  }
async getProductById(id) {
  try{
    await this.getProducts(); 

    const findProduct = this.products.find((product) => product.id === (id));

    if (!findProduct) throw new Error("Product not found");
    console.log(findProduct);
    return findProduct;
   
  } catch(error){
    console.log(`Error: ${error.message}`);
  }

    
}
  async addProduct(product) {
    //desectructuro el producto en las variables que me interesan recibir
    try {
      await this.getProducts(); 
      
      const { title, description, price, thumbnail, code, stock, category } = product;
      const newProduct = {
        id: code,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status:true,
        category,
      };

      const productExist = this.products.find((product) => product.code === code);

      if (productExist) throw new Error(`El producto con el codigo ${code} ya existe`);
      
      const arraysValue = Object.values(newProduct);
      
      if (arraysValue.includes(undefined)) throw new Error("todos los datos son obligatorios");

      this.products.push(newProduct);
      
      await fs.promises.writeFile(this.pathFile, JSON.stringify(this.products));
      return this.products;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  async updateProduct(id, productData){
    try {
      await this.getProducts();

      const index = this.products.findIndex(product => product.id === id); //Si no encuentra el elemento que coincide, devuelve un -1
      if(index == -1) throw new Error("Product not found");
      this.products[index] = {
        ...this.products[index], // Copiamos todos los valores originales
        ...productData, // sobre escribimos los nuevos valores
      };
      await fs.promises.writeFile(this.pathFile, JSON.stringify(this.products));
      return this.products;
      }   
     catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
async deleteProduct(id){
  try {
  await this.getProducts();
  await this.getProductById(id);
  this.products = this.products.filter((product) => product.id !== id);// le pido que filtre todos los id distintos  
  await fs.promises.writeFile(this.pathFile, JSON.stringify(this.products));
  return this.products;
} catch (error) {
    console.log(`Error: ${error.message}`);
  }

}
}

const products = new ProductManager();

