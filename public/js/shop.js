async function fetchProducts() {
  try { 
    (products.json or /products.json)
    const res = await fetch('products.json');
    if (!res.ok) throw new Error('Failed to fetch products.json: ' + res.status);
    const products = await res.json();
    renderProducts(products);
  } catch (e) {
    const container = document.getElementById('products') || document.getElementById('products.json');
    if (container) {
      container.innerText = 'حدث خطأ أثناء جلب المنتجات.';
    } else {
      console.error('Products container not found and fetch failed:', e);
    }
    console.error(e);
  }
}

function renderProducts(products) {
  const container = document.getElementById('products') || document.getElementById('products.json');
  if (!container) {
    console.error('No container element with id "products" or "products.json" was found in the DOM.');
    return;
  }

  container.innerHTML = '';

  if (!Array.isArray(products)) {
    container.innerText = 'لا توجد منتجات للعرض.';
    console.warn('Expected products to be an array but got:', products);
    return;
  }

  products.forEach(p => {
    // Basic normalization and safety
    const id = p && p.id != null ? String(p.id) : '';
    const name = p && p.name != null ? String(p.name) : 'بدون اسم';
    const description = p && p.description != null ? String(p.description) : '';
    const price = p && p.price != null ? String(p.price) : '-';
    const unit = p && p.unit != null ? String(p.unit) : '';
    const imageSrc = p && p.image ? String(p.image) : '/assets/placeholder.jpg';

    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = name;

    const info = document.createElement('div');
    info.className = 'product-info';

    const titleEl = document.createElement('div');
    titleEl.className = 'product-title';
    titleEl.textContent = name;

    const descEl = document.createElement('div');
    descEl.className = 'product-desc';
    descEl.textContent = description; // textContent => no HTML injection

    const priceEl = document.createElement('div');
    priceEl.className = 'product-price';
    priceEl.textContent = `${price} ج.م${unit ? ' - ' + unit : ''}`;

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.type = 'button';
    btn.textContent = 'أضف إلى السلة';
    // attach event listener; convert id to string to avoid breaking if it's non-numeric
    btn.addEventListener('click', () => addToCart(id));

    info.appendChild(titleEl);
    info.appendChild(descEl);
    info.appendChild(priceEl);
    info.appendChild(btn);

    card.appendChild(img);
    card.appendChild(info);
    container.appendChild(card);
  });
}

function addToCart(id) {
  // Replace with real cart logic
  alert('تم إضافة المنتج (تجريبياً): ' + id);
}

fetchProducts();
