import fs from "fs/promises";
import path from "path";

class FSManager {
  constructor(fileName) {
    this.filePath = path.resolve(`./src/dao/fs/files/${fileName}.json`);
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), "utf-8");
  }

  async create(data) {
    const items = await this._readFile();
    items.push(data);
    await this._writeFile(items);
    return data;
  }
  async read(filter = {}) {
    const items = await this._readFile();
    return items.filter((item) =>
      Object.entries(filter).every(([key, value]) => item[key] === value)
    );
  }
  async readBy(data) {
    const items = await this._readFile();
    return (
      items.find((item) =>
        Object.entries(data).every(([key, value]) => item[key] === value)
      ) || null
    );
  }
  async readById(id) {
    const items = await this._readFile();
    return items.find((item) => item._id === id) || null;
  }
  async updateById(id, data) {
    const items = await this._readFile();
    const index = items.findIndex((item) => item._id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...data };
    await this._writeFile(items);
    return items[index];
  }
  async destroyById(id) {
    const items = await this._readFile();
    const newItems = items.filter((item) => item._id !== id);
    if (items.length === newItems.length) return null;
    await this._writeFile(newItems);
    return id;
  }
}

export default FSManager;

const productsManager = new FSManager("products");
const usersManager = new FSManager("users");
const cartsManager = new FSManager("carts");

export { productsManager, usersManager, cartsManager };
