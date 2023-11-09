export const showCart = () => {
  const btnCart = document.querySelector(".btn--cart");
  const cart = document.querySelector(".cart");

  btnCart.addEventListener("click", () => {
    cart.classList.toggle("show--cart");
  });

  cart.addEventListener("click", (e) => {
    if (e.target.closest(".btn--close")) {
      cart.classList.remove("show--cart");
    }
  });
};
