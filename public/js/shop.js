function openForm(type, productName) {
  alert(`فتح نموذج: ${type} للمنتج ${productName}`);
}

function closeForm() {
  alert("تم إغلاق النموذج");
}
// التبديل بين المنتجات والخدمات
document.getElementById("productsTab").addEventListener("click", () => {
  document.getElementById("productsSection").classList.remove("hidden");
  document.getElementById("servicesSection").classList.add("hidden");
  document.getElementById("productsTab").classList.add("active");
  document.getElementById("servicesTab").classList.remove("active");
});

document.getElementById("servicesTab").addEventListener("click", () => {
  document.getElementById("servicesSection").classList.remove("hidden");
  document.getElementById("productsSection").classList.add("hidden");
  document.getElementById("servicesTab").classList.add("active");
  document.getElementById("productsTab").classList.remove("active");
});

// فتح النموذج
function openForm(productName, type) {
  document.getElementById("quoteModal").classList.remove("hidden");
  document.getElementById("modalTitle").innerText =
    type === "طلب" ? "طلب عرض سعر" : "تقديم عرض سعر";
  document.getElementById("product").value = productName;
}

// إغلاق النموذج
function closeForm() {
  document.getElementById("quoteModal").classList.add("hidden");
}

// إرسال البيانات إلى Google Sheets
function submitQuote() {
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
}
