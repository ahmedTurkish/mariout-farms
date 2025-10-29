async function fetchProducts(){
  try{
    const res = await fetch('/api/products');
    if(!res.ok) throw new Error('Fail to fetch');
    const products = await res.json();
    renderProducts(products);
  }catch(e){
    document.getElementById('products').innerText = 'حدث خطأ أثناء جلب المنتجات.';
    console.error(e);
  }
}

function renderProducts(products){
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(p =>{
    const card = document.createElement('div');
    card.className = 'product-card';
    const img = document.createElement('img');
    img.src = p.image || '/assets/placeholder.jpg';
    img.alt = p.name;
    const info = document.createElement('div');
    info.className = 'product-info';
    info.innerHTML = `
      <div class="product-title">${p.name}</div>
      <div class="product-desc">${p.description || ''}</div>
      <div class="product-price">${p.price} ج.م - <small>${p.unit || ''}</small></div>
      <button class="btn" onclick="addToCart(${p.id})">أضف إلى السلة</button>
    `;
    card.appendChild(img);
    card.appendChild(info);
    container.appendChild(card);
  })
}

function addToCart(id){alert('تم إضافة المنتج (تجريبياً): ' + id);}

fetchProducts();