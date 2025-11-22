// ===== Reveal on Scroll =====
const scrollElements = document.querySelectorAll(".scroll-reveal");
const cards = document.querySelectorAll(".sector-card");

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const handleScrollAnimation = () => {

  // إظهار العنوان والوصف
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      el.classList.add("show");
    }
  });

  // إظهار البطاقات واحدة واحدة
  cards.forEach((card, index) => {
    if (elementInView(card, 150)) {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 150);
    }
  });

};

window.addEventListener("scroll", handleScrollAnimation);
handleScrollAnimation();
