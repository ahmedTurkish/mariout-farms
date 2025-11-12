document.addEventListener('DOMContentLoaded', () => {
  // التبويبات
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });

  // تحميل البيانات
  fetchData('products-grid', [
    { id: 1, name: 'بطاطا', price: '12', unit: 'كيلوجرام', image: 'assets/products/potato.jpg' },
    { id: 2, name: 'بطاطس', price: '10', unit: 'كيلوجرام', image: 'assets/products/sweetpotato.jpg' },
    { id: 3, name: 'زيت الزيتون', price: '200', unit: 'لتر', image: 'assets/products/oliveoil.jpg' },
  ]);

  fetchData('services-grid', [
    { id: 101, name: 'تأجير حفارات آبار المياه', price: 'بالاتفاق', image: 'assets/services/drilling.jpg' },
    { id: 102, name: 'ماكينات رفع المياه', price: 'بالاتفاق', image: 'assets/services/pump.jpg' },
  ]);
});

function fetchData(containerId, data) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-info">
        <div class="item-title">${item.name}</div>
        <div class="item-price">${item.price} ${item.unit || ''}</div>
        <div class="btns">
          <button class="btn" onclick="requestQuote('${item.name}')">طلب عرض سعر</button>
          <button class="btn" onclick="offerQuote('${item.name}')">تقديم عرض سعر</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// روابط Google Sheets الوهمية
const REQUEST_URL = "https://docs.google.com/forms/d/e/fakeRequestForm/viewform";
const OFFER_URL = "https://docs.google.com/forms/d/e/fakeOfferForm/viewform";

function requestQuote(itemName) {
  window.open(`${REQUEST_URL}?entry.product=${encodeURIComponent(itemName)}`, '_blank');
}

function offerQuote(itemName) {
  window.open(`${OFFER_URL}?entry.product=${encodeURIComponent(itemName)}`, '_blank');
}
