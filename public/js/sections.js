// ===== Reveal on Scroll (مع تأخير للبطاقات) =====
const scrollElements = document.querySelectorAll(".scroll-reveal, .sector-card");

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el, index) => {
    if (elementInView(el, 100)) {
      setTimeout(() => {
        el.classList.add("show");
      }, index * 120); // تأخير بسيط لكل عنصر
    }
  });
};

window.addEventListener("scroll", handleScrollAnimation);
handleScrollAnimation();
