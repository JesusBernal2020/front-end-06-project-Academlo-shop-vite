/**
 *funcion de productos
 * @param {Promise} products con la data
 * @returns {Object} un objeto con los productos
 */
const products = async (products) => {
  /* const data = await products; */
  const db = [...products];
  console.log(db);

  const printProducts = () => {
    const productsDOM = document.querySelector(".products__container");

    let htmlProduct = "";

    for (let product of db) {
      htmlProduct += `
            <article class="product">
        <div class="product__image">
          <div class="card__face card__face--front">
            <img
              src="${product.image}"
              alt="${product.name}"
            />
          </div>
          <div class="card__face card__face--back">
            <div class="description__content">
              <div class="description__header">
                <h3 class="description__title">${product.name}</h3>
              </div>
              <div class="description__text">
                <p>
                ${product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="product__content">
          <button type="button" class="product__btn add--to--cart" data-id="${product.id}">
            <i class="bx bxs-cart-add"></i>
          </button>
          <span class="product__price">$${product.price}</span>
          <span class="product__stock">Disponible: ${product.quantity}</span>
          <h3 class="product__title">
            ${product.name}
          </h3>
        </div>
      </article>
            
            `;
    }

    productsDOM.innerHTML = htmlProduct;
  };

  printProducts();

  return {
    db,
    printProducts,
  };
};

export default products;
