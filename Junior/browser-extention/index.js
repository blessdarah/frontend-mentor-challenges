/**
 * @typedef {Object} Extension
 * @property {string} logo
 * @property {string} name
 * @property {string} description
 * @property {boolean} isActive
 * */

const extensionContainer = document.querySelector(".extensions");
const filterButtons = document.querySelectorAll(".filter-option");

// TODO: Load extension data from a JSON file
// TODO: Activate and Deactivete extensions
const extensionManager = {
  loadExtensions() {
    this.initFilters();
    this.renderExtensions(this.extensions);
  },
  extensions /** @type Extension[] */: [
    {
      logo: "./assets/images/logo-devlens.svg",
      name: "DevLens",
      description:
        "Quickly inspect page layouts and visualize element boundaries.",
      isActive: true,
    },
    {
      logo: "./assets/images/logo-style-spy.svg",
      name: "StyleSpy",
      description: "Instantly analyze and copy CSS from any webpage element.",
      isActive: true,
    },
    {
      logo: "./assets/images/logo-speed-boost.svg",
      name: "SpeedBoost",
      description:
        "Optimizes browser resource usage to accelerate page loading.",
      isActive: false,
    },
    {
      logo: "./assets/images/logo-json-wizard.svg",
      name: "JSONWizard",
      description:
        "Formats, validates, and prettifies JSON responses in-browser.",
      isActive: true,
    },
    {
      logo: "./assets/images/logo-tab-master-pro.svg",
      name: "TabMaster Pro",
      description: "Organizes browser tabs into groups and sessions.",
      isActive: true,
    },
    {
      logo: "./assets/images/logo-viewport-buddy.svg",
      name: "ViewportBuddy",
      description:
        "Simulates various screen resolutions directly within the browser.",
      isActive: false,
    },
    {
      logo: "./assets/images/logo-markup-notes.svg",
      name: "Markup Notes",
      description:
        "Enables annotation and notes directly onto webpages for collaborative debugging.",
      isActive: true,
    },
    {
      logo: "./assets/images/logo-grid-guides.svg",
      name: "GridGuides",
      description:
        "Overlay customizable grids and alignment guides on any webpage.",
      isActive: false,
    },
    {
      logo: "./assets/images/logo-palette-picker.svg",
      name: "Palette Picker",
      description: "Instantly extracts color palettes from any webpage.",
      isActive: true,
    },
    {
      logo: "./assets/images/logo-link-checker.svg",
      name: "LinkChecker",
      description: "Scans and highlights broken links on any page.",
      isActive: true,
    },
    {
      logo: "./assets/images/logo-dom-snapshot.svg",
      name: "DOM Snapshot",
      description: "Capture and export DOM structures quickly.",
      isActive: false,
    },
    {
      logo: "./assets/images/logo-console-plus.svg",
      name: "ConsolePlus",
      description:
        "Enhanced developer console with advanced filtering and logging.",
      isActive: true,
    },
  ],

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
