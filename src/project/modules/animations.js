import ScrollReveal from "scrollreveal";

export const animation = () => {
  ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200,
  });

  ScrollReveal().reveal(".title-box", { origin: "left" });
  ScrollReveal().reveal(".img-container", { origin: "bottom" });
};
