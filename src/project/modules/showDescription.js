export const showDescription = () => {
  const card = document.querySelector(".products__container");

  if (card) {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".product__image")) {
        e.target.closest(".product__image").classList.toggle("is--flipped");
      }
    });
  }
};
