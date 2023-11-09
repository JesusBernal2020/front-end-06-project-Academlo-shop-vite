import Swal from "sweetalert2";

const elementsId = {
  productsContianer: ".products__container",
  notify: ".notify",
  cartBody: ".cart__body",
  cartIntem: ".cart__count--item",
  cartTotal: ".cart__total--item",
  checkout: ".btn--buy",
  theme: "#theme",
  modal: "#myModal",
};

/**
 *funcion para el carrito
 * @param {Object} db los datos de los productos
 * @param {Function} printProducts que renderiza los productos
 */
export const cart = async (db, printProducts) => {
  let cart = [];

  //*elementos del DOM
  const productsDOM = document.querySelector(elementsId.productsContianer);
  const notifyDOM = document.querySelector(elementsId.notify);
  const cartDOM = document.querySelector(elementsId.cartBody);
  const countDOM = document.querySelector(elementsId.cartIntem);
  const totalDOM = document.querySelector(elementsId.cartTotal);
  const checkoutDOM = document.querySelector(elementsId.checkout);
  const themeButton = document.querySelector(elementsId.theme);
  const icon = themeButton.firstElementChild;
  const localStorage = window.localStorage;
  const storeCart = localStorage.getItem("cart");
  const modal = document.querySelector(elementsId.modal);

  if (storeCart) {
    cart = JSON.parse(storeCart);
  }

  const printCart = () => {
    let htmlCart = "";

    if (cart.length === 0) {
      htmlCart += `
      <div class="cart__empty">
          <i class="bx bxs-cart"></i>
          <p class="cart__empty--text">No Hay productos en el carrito</p>
        </div>
      `;
      notifyDOM.classList.remove("show--notify");
    } else {
      for (const item of cart) {
        const product = db.find((p) => p.id === item.id);
        htmlCart += `
        <article class="article">
        <div class="article__image">
        <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="article__content">
        <h3 class="article__title">${product.name}</h3>
        <span class="article__price">$${product.price}</span>
                <div class="article__quantity">
                  <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                    <i class='bx bx-minus'></i>
                  </button>
                   <span class="article__quantity-text">${item.qty}</span>
                   <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                    <i class='bx bx-plus'></i>
                  </button>
                </div>
                <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
                  <i class='bx bx-trash'></i>
                </button>
            </div>
          </article>
             `;
      }
      notifyDOM.classList.add("show--notify");
    }

    function saveStore() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    saveStore();
    cartDOM.innerHTML = htmlCart;
    notifyDOM.innerHTML = showItemsCount();
    countDOM.innerHTML = showItemsCount();
    totalDOM.innerHTML = showTotal();
  };

  /**
   * Funcion que agrega productos al carrito
   * @param {Number} id identificador del productos para agregar al carrito
   * @param {Number} qty valor el cual incrementa
   * @returns {Number} la cantidad del valor agregado
   */
  const addToCart = (id, qty = 1) => {
    if (!id) throw new Error("id es requerido");

    const itemFinded = cart.find((i) => i.id === id);

    if (itemFinded) {
      itemFinded.qty += qty;
    } else {
      cart.push({ id, qty });
    }

    printCart();
  };

  /**
   * Funcion que remueve productos al carrito
   * @param {Number} id identificador del productos para remover al carrito
   * @param {Number} qty valor el cual dencrementa
   * @returns {Number} la cantidad del valor restado
   */
  const removeFromCart = (id, qty = 1) => {
    const itemFinded = cart.find((i) => i.id === id);

    const result = itemFinded.qty - qty;
    if (result > 0) {
      itemFinded.qty -= qty;
    } else {
      cart = cart.filter((i) => i.id !== id);
    }

    printCart();
  };

  /**
   * Funcion para eliminar un producto de carrito
   * @param {Number} id
   */
  function deteleFromCart(id) {
    cart = cart.filter((i) => i.id !== id);

    printCart();
  }

  const showItemsCount = () => {
    let suma = 0;
    for (const item of cart) {
      suma += item.qty;
    }

    return suma;
  };

  const showTotal = () => {
    let total = 0;
    for (const item of cart) {
      const productFinded = db.find((p) => p.id === item.id);

      total += item.qty * productFinded.price;
    }

    return total;
  };

  const checkout = () => {
    for (const item of cart) {
      const productFinded = db.find((p) => p.id === item.id);
      let html = "";

      if (productFinded) {
        if (productFinded.quantity >= item.qty) {
          productFinded.quantity -= item.qty;
        } else {
          Swal.fire({
            title: "Error!",
            text: `No se puede comprar esa cantidad. solo hay ${productFinded.quantity} prendas de la referencia: ${productFinded.name} en el Stcok.`,
            icon: "error",
            confirmButtonColor: "#E05260",
            confirmButtonText: "Aceptar",
          });
          // window.alert(
          //   `No se puede comprar esa cantidad. solo hay ${productFinded.quantity} prendas de la referencia: ${productFinded.name} en el Stcok.`
          // );
          return;
        }
      }
    }

    // Si llegamos a este punto, significa que la compra se ha realizado con éxito
    Swal.fire({
      title: "Exitoso!",
      text: "Su compra se a realizado con exito, gracias!",
      icon: "success",
      confirmButtonColor: "#E05260",
      confirmButtonText: "Aceptar",
    });
    // window.alert("Gracias por su compra");
    cart = [];
    printCart();
    printProducts();
  };

  function darks() {
    if (theme === "dark") {
      document.body.classList.add("dark");
      icon.classList.remove("bxs-moon");
      icon.classList.add("bxs-sun");
    } else {
      document.body.classList.remove("dark");
      icon.classList.remove("bxs-sun");
      icon.classList.add("bxs-moon");
    }
  }

  darks();

  printCart();

  //*EVENTS
  productsDOM.addEventListener("click", (e) => {
    if (e.target.closest(".add--to--cart")) {
      const id = +e.target.closest(".add--to--cart").dataset.id;
      addToCart(id);
    }
  });

  cartDOM.addEventListener("click", (e) => {
    if (e.target.closest(".article--minus")) {
      const id = +e.target.closest(".article--minus").dataset.id;
      removeFromCart(id);
    }

    if (e.target.closest(".article--plus")) {
      const id = +e.target.closest(".article--plus").dataset.id;
      addToCart(id);
    }

    if (event.target.closest(".remove-from-cart")) {
      const id = +event.target.closest(".remove-from-cart").dataset.id;
      deteleFromCart(id);
    }
  });

  checkoutDOM.addEventListener("click", () => {
    checkout();
  });

  // dark mode
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      icon.classList.remove("bxs-moon");
      icon.classList.add("bxs-sun");
    } else {
      localStorage.removeItem("theme");
      icon.classList.remove("bxs-sun");
      icon.classList.add("bxs-moon");
    }
  });
};
