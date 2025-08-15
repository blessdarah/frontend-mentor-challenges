import { cartManager } from "./cart.js";
import { desertsManager } from "./deserts.js";

window.desertsManager = desertsManager;

const main = async () => {
  cartManager.loadStore();

  const deserts = await desertsManager.getDeserts();
  desertsManager.renderDeserts(deserts);
};

main();
