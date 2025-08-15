import { desertsManager } from "./deserts.js";

/**
 * typedef {Object} CartItem
 * @property {Desert} desert
 * @property {number} quantity
 **/

export const cartManager = {
  /** @type {CartItem[]} */
  items: [],

  loadStore: function () {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      this.items = JSON.parse(cartItems);
    }
  },

  updateStore: function () {
    localStorage.setItem("cart", JSON.stringify(this.items));
  },

  /**
   * Get item quantity if exists in cart
   * @param {string} name
   * @returns {number}
   */
  getItemQuantity: function (name) {
    const item = this.items.find((i) => i.desert.name === name);
    return item ? item.quantity : 0;
  },

  /** @param {Desert} desert */
  addItem: function (desert) {
    const cartItem = {
      quantity: 1,
      desert,
    };

    const existingItem = this.items.find((i) => i.desert.name === desert.name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push(cartItem);
    }
    this.updateStore();
  },

  /** @param {string} name */
  removeItem: function (desert) {
    const existingItem = this.items.find((i) => i.desert.name === desert.name);

    if (existingItem && existingItem.quantity >= 1) {
      existingItem.quantity--;
    }

    if (existingItem && existingItem.quantity === 0) {
      this.items = this.items.filter((i) => i.desert.name !== desert.name);
    }

    this.updateStore();
  },

  /** @returns {number} */
  getTotal: function () {
    return this.items.reduce((total, item) => total + item.desert.price, 0);
  },
};
