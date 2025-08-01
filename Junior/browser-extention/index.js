/**
 * @typedef {Object} Extension
 * @property {string} logo
 * @property {string} name
 * @property {string} description
 * @property {boolean} isActive
 * */

const extensionContainer = document.querySelector(".extensions");
const filterButtons = document.querySelectorAll(".filter-option");
const addExtensionButton = document.querySelector("#add-extension");
const dialog = document.querySelector("dialog");

const extensionManager = {
  async loadExtensions() {
    // check local storage for extensions
    const persistedExts = localStorage.getItem("extensions");
    if (persistedExts) {
      this.extensions = JSON.parse(persistedExts);
    } else {
      this.extensions = await fetch("./data.json").then((res) => res.json());
      localStorage.setItem("extensions", JSON.stringify(this.extensions));
    }
    this.renderExtensions(this.extensions);
    this.initFilters();
    this.initDialog();
  },
  extensions /** @type Extension[] */: [],
  initFilters() {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filterAttr = button.dataset.filter;
        extensionManager.toggleActiveButton(filterAttr);
        extensionManager.renderExtensions(
          extensionManager.filterExtensions(filterAttr)
        );
      });
    });
  },

  addExtension(event) {
    event.preventDefault();
    const form = event.target;
    const extensionName = form.name.value;
    const extensionDescription = form.description.value;
    const randIndex = Math.floor(
      Math.random() * extensionManager.extensions.length
    );
    const extension /** @type Extension */ = {
      name: extensionName,
      logo: extensionManager.extensions[randIndex].logo,
      description: extensionDescription,
      isActive: true,
    };
    extensionManager.extensions.push(extension);
    // sycn extensions to local storage
    localStorage.setItem(
      "extensions",
      JSON.stringify(extensionManager.extensions)
    );
    extensionManager.renderExtensions(extensionManager.extensions);
    form.reset();
    dialog.close();
  },

  /**
   * @function addExtension - Adds an extension to the extensions list
   * @param {Extension} extension
   */
  initDialog() {
    addExtensionButton.addEventListener("click", () => {
      const cancelButton = dialog.querySelector(".cancel");
      const form = dialog.querySelector("form");
      form.addEventListener("submit", extensionManager.addExtension);
      cancelButton.onclick = () => {
        form.reset();
        dialog.close();
      };
      dialog.showModal();
    });
  },
  /**
   * This function allows us to have only one active button at a time
   * @function toggleActiveButton - Toggles active class on button
   * @param {"all" | "active" | "inactive"} filterAttr
   */
  toggleActiveButton(filterAttr) {
    filterButtons.forEach((button) => {
      if (button.dataset.filter === filterAttr) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  },
  /**
   * @function renderExtensions - Renders all extensions
   * @param {Extension[]} list
   */
  renderExtensions(list) {
    extensionContainer.innerHTML = "";
    list.forEach((extension) => {
      const extdata = this.createExtension(extension);
      extensionContainer.innerHTML += extdata.outerHTML;
    });
  },

  /**
   * @function createExtension - Creates an extension element
   * @param {Extension} extension
   * @returns {HTMLDivElement}
   */
  createExtension(extension) {
    const extDiv = document.createElement("div");
    extDiv.classList.add("extension");
    extDiv.innerHTML = `
        <header>
            <img src="${extension.logo}" alt="${extension.name} logo">
            <div>
                <h2>${extension.name}</h2>
                <p>${extension.description}</p>
            </div>
        </header>
        <footer>
            <button class="remove-extension" onclick="extensionManager.removeExtension('${extension.name}')">Remove</button>
            <input id="extension-${extension.name}" type="checkbox">
            <label for="extension-${extension.name}" role="switch" class="toggle-extension">
            </label>
        </footer>`;
    return extDiv;
  },

  /**
   * Removes an extension for the extensions list
   * @function removeExtension - Removes an extension from the extensions list
   * @param {string} extensionName
   */
  removeExtension(extensionName) {
    const extIndex = this.extensions.findIndex(
      (extension) => extension.name === extensionName
    );
    this.extensions.splice(extIndex, 1);
    // sync extensions to local storage
    localStorage.setItem(
      "extensions",
      JSON.stringify(extensionManager.extensions)
    );
    this.renderExtensions(this.extensions);
  },

  /**
   * @function filterExtensions - Filters extensions based on the filter attribute
   * @param {"all" | "active" | "inactive"} filterAttr
   */
  filterExtensions(filterAttr = "all") {
    switch (filterAttr) {
      case "all":
        return this.extensions;
      case "active":
        return this.extensions.filter((extension) => extension.isActive);
      case "inactive":
        return this.extensions.filter((extension) => !extension.isActive);
      default:
        return this.extensions;
    }
  },
};

extensionManager.loadExtensions();
