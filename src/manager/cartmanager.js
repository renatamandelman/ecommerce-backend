import fs from "fs";
import path from "path";
import __dirname from "/Users/valeremandel/Desktop/coderHouse/ecommerce-Mandelman/dirname.js";

export class CartManager {
  constructor() {
    this.carts = [];
    this.pathFile = __dirname + "/src/manager/data/cart.json";
  }
  async getCarts() {
    try {
      const cartJson = await fs.promises.readFile(this.pathFile, "utf-8");
      const cartParse = JSON.parse(cartJson);
      this.carts = cartParse || []; //nos aseguramos que si devuelve null o undefined, que devuelva un array
      return this.carts;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  async getCartById(id) {
    try {
      await this.getCarts();

      const findCart = this.carts.find((cart) => cart.id === Number(id));

      if (!findCart) throw new Error("Product not found");

      return findCart;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  async createCart(cart) {
    //desectructuro el producto en las variables que me interesan recibir
    try {
      await this.getCarts();
      const {
        productsArray
      } = cart;
      const newCart = {
        id: this.carts.length + 1,
        productsArray: []
      };
      this.carts.push(newCart);
      await fs.promises.writeFile(this.pathFile, JSON.stringify(this.carts));
      return newCart;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  async addProductToCart(cid, pid) {
    try {
      await this.getCarts();
      const findCart = this.carts.find((cart) => cart.id === Number(cid));
      if (!findCart) throw new Error("Cart not found");
      const existingProduct = findCart.productsArray.find((p) => p.id === Number(pid));
      console.log(existingProduct)
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        findCart.productsArray.push({
          "id": pid,
          "quantity": 1
        });
      }
      await fs.promises.writeFile(this.pathFile, JSON.stringify(this.carts));
      return findCart;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}