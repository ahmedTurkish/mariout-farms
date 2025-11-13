document.addEventListener("DOMContentLoaded", () => {

  // ✅ التبديل بين المنتجات والخدمات
  const productsTab = document.getElementById("productsTab");
  const servicesTab = document.getElementById("servicesTab");
  const productsSection = document.getElementById("productsSection");
  const servicesSection = document.getElementById("servicesSection");

  productsTab.addEventListener("click", () => {
    productsSection.classList.remove("hidden");
    servicesSection.classList.add("hidden");
    productsTab.classList.add("active");
    servicesTab.classList.remove("active");
  });

  servicesTab.addEventListener("click", () => {
    servicesSection.classList.remove("hidden");
    productsSection.classList.add("hidden");
    servicesTab.classList.add("active");
    productsTab.classList.remove("active");
  });

  // ✅ عناصر المودال
  const modal = document.getElementById("quoteModal");
  const modalTitle = document.getElementById("modalTitle");
  const productInput = document.getElementById("product");

  // ✅ فتح المودال
  window.openForm = function (type, productName) {
    modal.classList.remove("hidden");
    modalTitle.innerText = type === "طلب" ? "طلب عرض سعر" : "تقديم عرض سعر";
    productInput.value = productName;
  };

  // ✅ إغلاق المودال
  window.closeForm = function () {
    modal.classList.add("hidden");
  };

  // ✅ إغلاق عند الضغط خارج الصندوق
  modal.addEventListener("click", (e) => {
    if (e.target.id === "quoteModal") closeForm();
  });

  // ✅ إرسال البيانات إلى Google Sheets
  window.submitQuote = function () {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const product = document.getElementById("product").value;
    const unit = document.getElementById("unit").value;
    const price = document.getElementById("price").value;

    const data = { name, phone, product, unit, price };

    fetch("https://script.google.com/macros/s/YOUR_FAKE_LINK_HERE/exec", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        alert("تم إرسال البيانات بنجاح ✅");
        closeForm();
      })
      .catch(() => {
        alert("حدث خطأ أثناء الإرسال ❌");
      });
  };
});
