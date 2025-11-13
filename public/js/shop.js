document.addEventListener("DOMContentLoaded", () => {
  // عناصر المودال
  const modal = document.getElementById("quoteModal");
  const modalTitle = document.getElementById("modalTitle");
  const productInput = document.getElementById("modalProduct");

  // فتح المودال فقط عند الضغط على زر تقديم عرض سعر
  window.openForm = function(type, productName) {
    if (!modal) return;
    modal.classList.remove("hidden");
    modalTitle.innerText = type === "طلب" ? "طلب عرض سعر" : "تقديم عرض سعر";
    productInput.value = productName;
  };

  // إغلاق المودال
  window.closeForm = function() {
    if (!modal) return;
    modal.classList.add("hidden");
  };

  // إغلاق عند النقر خارج صندوق المودال
  modal.addEventListener("click", (e) => {
    if (e.target.id === "quoteModal") closeForm();
  });

  // إرسال البيانات
  window.submitQuote = function() {
    const name = document.getElementById("modalName").value.trim();
    const phone = document.getElementById("modalPhone").value.trim();
    const product = productInput.value.trim();
    const unit = document.getElementById("modalUnit").value;
    const price = document.getElementById("modalPrice").value.trim();

    if (!name || !phone) {
      alert("الرجاء إدخال الاسم ورقم الهاتف");
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
  };
});
