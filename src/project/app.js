import html from "./app.html?raw";
import getProducts from "./helpers/getProducts";
import { animation } from "./modules/animations";
import { cart } from "./modules/cart";
import { loader } from "./modules/louder";
import products from "./modules/product";
import { showCart } from "./modules/show-cart";
import { showDescription } from "./modules/showDescription";
import { showMenu } from "./modules/showMenu";

export const App = async (elementId) => {
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
  })();

  loader();

  animation();

  showMenu();

  showCart();

  const { db, printProducts } = await products(await getProducts());

  cart(db, printProducts);

  showDescription();
};
