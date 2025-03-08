import fs from "fs";
import path from "path";
// import __dirname from "/Users/valeremandel/Desktop/coderHouse/ecommerce-Mandelman/dirname.js";
import ProductModel from "../models/product.model.js";
import CartModel from "../models/cart.model.js";

export class CartManager {
  constructor() {
    this.carts = [];
  }
  async getCarts() {
    try {
      const carts = await CartModel.find().lean();
      return carts;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  async getCartById(id) {
    try {
     const cart = await CartModel.findById(id).populate("products.product").lean();
      if (!cart) throw new Error("Product not found");
      return cart;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  async createCart() {
    try {
          const newCart = new CartModel({products:[]});
          await newCart.save();
          return newCart;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  async addProductToCart(cid, pid) {
    try {
        // const product =  await productsManager.getProductById(pid);  
        const cart = await CartModel.findById(cid) ;
        if(!cart) throw new Error("Cart not found");
        const product = await ProductModel.findById(pid);
        if (!product) throw new Error("Product not found");
  
        const existingProduct = cart.products.find((p) => p.product.equals(pid));
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({
            product: pid,
            quantity: 1
          });
        }
          await cart.save();
          return cart;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  async updateCart(cid,products){
    try{
      const cart = await CartModel.findById(cid);
      if(!cart) throw new Error("Cart not found");
      cart.products = products;
      await cart.save();
      return cart;
    }catch(error){
      console.log(`Error: ${error.message}`);
    }
  }
  async updateProductQuantity(cid,pid,quantity ){
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) throw new Error("Carrito no encontrado");

      const existingProduct = cart.products.find((p) => p.product.equals(pid));      

      if (!existingProduct) throw new Error("Product not found in cart");      
      existingProduct.quantity = quantity;
      
      
      await cart.save();
  
      return cart;
      }catch(error)
      {console.log(`Error: ${error.message}`);
  }
}
async deleteProduct(cid,pid){
  try{
    const cart = await CartModel.findById(cid);
    if(!cart) throw new Error("Carrito no encontrado");
    const productFound = cart.products.find((p) => p.product.equals(pid));
    if(!productFound) throw new Error("Product not found in cart");
    cart.products.pull({product: pid});
    cart.save();
    return cart;
    }catch(error){
      console.log(`Error: ${error.message}`);
      }
  }
  async deleteCart(cid){
    try{
      const cart = await CartModel.findById(cid);
      if(!cart) throw new Error("Carrito no encontrado");
      cart.products = [];
      await cart.save();
      return cart;
      }catch(error){
        console.log(`Error: ${error.message}`);
        }
        }
}