async function fetchProducts() {
  try { 
    const res = await fetch('products.json');
    if (!res.ok) throw new Error('Failed to fetch products.json: ' + res.status);
    const products = await res.json();
    renderProducts(products);
    setupFilter(products); // ربط الفلترة بالمنتجات
  } catch (e) {
    const container = document.getElementById('products');
    if (container) {
      container.innerText = 'حدث خطأ أثناء جلب المنتجات.';
    } else {
      console.error('Products container not found and fetch failed:', e);
    }
    console.error(e);
  }
}

// ✅ دالة عرض المنتجات
function renderProducts(products) {
  const container = document.getElementById('products');
  if (!container) {
    console.error('No container element with id "products" was found in the DOM.');
    return;
  }

  container.innerHTML = '';

  if (!Array.isArray(products)) {
    container.innerText = 'لا توجد منتجات للعرض.';
    console.warn('Expected products to be an array but got:', products);
    return;
  }

  products.forEach(p => {
    const id = p?.id ?? '';
    const name = p?.name ?? 'بدون اسم';
    const description = p?.description ?? '';
    const price = p?.price ?? '-';
    const unit = p?.unit ?? '';
    const imageSrc = p?.image ?? '/assets/placeholder.jpg';

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
    descEl.textContent = description;

    const priceEl = document.createElement('div');
    priceEl.className = 'product-price';
    priceEl.textContent = `${price} ج.م${unit ? ' - ' + unit : ''}`;

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.type = 'button';
    btn.textContent = 'أضف إلى السلة';
    btn.addEventListener('click', () => addToCart(id));

    info.append(titleEl, descEl, priceEl, btn);
    card.append(img, info);
    container.appendChild(card);
  });
}

// ✅ دالة الفلترة
function setupFilter(products) {
  const categorySelect = document.getElementById('category');
  const priceInput = document.getElementById('price');
  const filterBtn = document.getElementById('filter-btn');

  if (!categorySelect || !priceInput || !filterBtn) return;

  filterBtn.addEventListener('click', () => {
    const selectedCategory = categorySelect.value;
    const maxPrice = parseFloat(priceInput.value) || Infinity;

    const filtered = products.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesPrice = parseFloat(p.price) <= maxPrice;
      return matchesCategory && matchesPrice;
    });

    renderProducts(filtered);
  });
}

// ✅ دالة السلة
function addToCart(id) {
  alert('تم إضافة المنتج (تجريبياً): ' + id);
}

// ✅ بدء التنفيذ
fetchProducts();
