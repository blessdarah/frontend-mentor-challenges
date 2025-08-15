/**
 * typedef {Object} Desert
 * @property {string} image.thumbnail
 * @property {string} image.mobile
 * @property {string} image.tablet
 * @property {string} image.desktop
 * @property {string} name
 * @property {string} category
 * @property {number} price
 **/

import { cartManager } from "./cart.js";

export const desertsManager = {
  deserts: [],
  /**
   * Fetches the deserts data from the data.json file
   * @returns {Desert[]}
   */
  getDeserts: async function () {
    if (this.deserts.length === 0) {
      const response = await fetch("./data.json");
      const data = await response.json();
      this.deserts = data;
    }
    return this.deserts;
  },

  updateQuanityController: function (desert) {
    const quantityController = document.querySelector(
      `#${this.getDesertId(desert.name)} .quantity-controller`
    );

    const quantity = cartManager.getItemQuantity(desert.name);
    if (quantity > 0) {
      quantityController.innerHTML = this.getQuantityController(desert);
    } else {
      quantityController.innerHTML = this.getAddButton(desert);
    }
  },

  getDesertId: function (desertName) {
    return desertName.replaceAll(" ", "-").toLowerCase();
  },

  addToCart: function (desertName) {
    const desert = this.getDesertByName(desertName);
    cartManager.addItem(desert);
    this.updateQuanityController(desert);
  },

  removeFromCart: function (desertName) {
    const desert = this.getDesertByName(desertName);
    cartManager.removeItem(desert);
    this.updateQuanityController(desert);
  },

  /**
   * Get a desert by name
   * @param {string} name
   * @returns {Desert}
   */
  getDesertByName: function (name) {
    return this.deserts.find((d) => d.name === name);
  },

  /**
   * renders the add to cart button
   * @param {Desert} desert
   **/
  getAddButton: function (desert) {
    return `<button onclick="desertsManager.addToCart('${desert.name}')">Add to cart</button>`;
  },

  /**
   * renders the quantity controller
   * @param {Desert} desert
   **/
  getQuantityController: function (desert) {
    const quantity = cartManager.getItemQuantity(desert.name);
    return `<button onclick="desertsManager.removeFromCart('${desert.name}')">-</button>
                <span>${quantity}</span>
                <button onclick="desertsManager.addToCart('${desert.name}')">+</button>`;
  },

  /**
   * Creates a desert card
   * @param {Desert} desert
   * @returns {string}
   */
  createDesertCard: function (desert) {
    const quantity = cartManager.getItemQuantity(desert.name);

    const base = `<article class="desert" id="${this.getDesertId(desert.name)}">
            <img src="${desert.image.desktop}" alt="${desert.name}">
            <p>${desert.category}</p>
            <h2>${desert.name}</h2>
            <p>Price: $${desert.price}</p>
<div class="quantity-controller">`;

    return quantity > 0
      ? `${base}${this.getQuantityController(desert)}</div></article>`
      : `${base}${this.getAddButton(desert)}</div></article>`;
  },

  renderDeserts: function (deserts) {
    const html = deserts
      .map((desert) => this.createDesertCard(desert))
      .join("");
    document.querySelector("#deserts").innerHTML = html;
  },
};
