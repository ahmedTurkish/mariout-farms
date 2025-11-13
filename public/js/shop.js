document.addEventListener("DOMContentLoaded", () => {
  // 🔹 التبديل بين المنتجات والخدمات
  const productsTab = document.getElementById("productsTab");
  const servicesTab = document.getElementById("servicesTab");
  const productsSection = document.getElementById("productsSection");
  const servicesSection = document.getElementById("servicesSection");

  if (productsTab && servicesTab) {
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
  }

  // 🔹 فتح النموذج
  function openForm(type, productName) {
    const modal = document.getElementById("quoteModal");
    const modalTitle = document.getElementById("modalTitle");
    const productInput = document.getElementById("product");

    if (!modal || !modalTitle || !productInput) return;

    modal.classList.remove("hidden");
    modalTitle.innerText = type === "طلب" ? "طلب عرض سعر" : "تقديم عرض سعر";
    productInput.value = productName;
  }

  // 🔹 إغلاق النموذج
  function closeForm() {
    const modal = document.getElementById("quoteModal");
    if (modal) modal.classList.add("hidden");
  }

  // 🔹 إغلاق بالنقر خارج الصندوق (اختياري)
  const modal = document.getElementById("quoteModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.id === "quoteModal") closeForm();
    });
  }

  // 🔹 إرسال البيانات إلى Google Sheets
  function submitQuote() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const product = document.getElementById("product").value.trim();
    const unit = document.getElementById("unit").value;
    const price = document.getElementById("price").value.trim();

    if (!name || !phone) {
      alert("من فضلك أدخل الاسم ورقم الهاتف 📱");
      return;
    }

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
  }

  // 🔹 جعل الدوال متاحة للـ HTML
  window.openForm = openForm;
  window.closeForm = closeForm;
  window.submitQuote = submitQuote;
});
