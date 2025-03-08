class MemoryManager {
  constructor() {
    this.data = [];
  }

  async create(data) {
    this.data.push(data);
    return data;
  }
  async read(filter = {}) {
    return this.data.filter((item) =>
      Object.entries(filter).every(([key, value]) => item[key] === value)
    );
  }
  async readBy(data) {
    return (
      this.data.find((item) =>
        Object.entries(data).every(([key, value]) => item[key] === value)
      ) || null
    );
  }
  async readById(id) {
    return this.data.find((item) => item._id === id) || null;
  }
  async updateById(id, data) {
    const index = this.data.findIndex((item) => item._id === id);
    if (index === -1) return null;
    this.data[index] = { ...this.data[index], ...data };
    return this.data[index];
  }
  async destroyById(id) {
    const index = this.data.findIndex((item) => item._id === id);
    if (index === -1) return null;
    this.data.splice(index, 1);
    return { message: "Elemento eliminado correctamente" };
  }
}

export default MemoryManager;

const productsManager = new MemoryManager();
const usersManager = new MemoryManager();
const cartsManager = new MemoryManager();

export { productsManager, usersManager, cartsManager };
