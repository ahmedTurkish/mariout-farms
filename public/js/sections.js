// ===== Reveal on Scroll =====

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const handleScrollAnimation = () => {
  // إظهار العناصر مع class scroll-reveal (العنوان والوصف)
  const scrollElements = document.querySelectorAll(".scroll-reveal:not(.show)");
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      el.classList.add("show");
    }
  });

  // إظهار البطاقات واحدة تلو الأخرى
  const cards = document.querySelectorAll(".sector-card:not(.show)");
  cards.forEach((card, index) => {
    if (elementInView(card, 100)) {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 150);
    }
  });
};

// تشغيل عند التمرير
window.addEventListener("scroll", handleScrollAnimation);

// تشغيل عند تحميل الصفحة
window.addEventListener("load", () => {
  // تأخير بسيط للتأكد من تحميل كل شيء
  setTimeout(handleScrollAnimation, 100);
});

// استدعاء فوري
handleScrollAnimation();
