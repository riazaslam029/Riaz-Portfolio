/* script.js
   Behavior for the portfolio site plus the E-commerce frontend demo.
   No external frameworks used.
*/

/* ----------- Utility / small helpers ----------- */
function $qs(sel){ return document.querySelector(sel) }
function $qa(sel){ return Array.from(document.querySelectorAll(sel)) }
function currency(num){ return Number(num).toLocaleString('en-PK'); }

/* Set current year */
(function(){
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;
})();

/* ----------- Demo product data (replace or extend) ----------- */
/* This is a small sample dataset for the e-commerce demo.
   You can replace these items or fetch from an API later.
*/
const PRODUCTS = [
  { id: 'p1', title: 'Wireless Headphones', price: 2950, category: 'electronics', img: '', desc: 'Comfort-fit wireless headphones with long battery' },
  { id: 'p2', title: 'Classic T-Shirt', price: 799, category: 'clothing', img: '', desc: '100% cotton, comfortable fit' },
  { id: 'p3', title: 'Phone Case - Marble', price: 499, category: 'accessory', img: '', desc: 'Sleek protective case for popular phones' },
  { id: 'p4', title: 'Bluetooth Speaker', price: 2550, category: 'electronics', img: '', desc: 'Compact speaker with clear sound' },
  { id: 'p5', title: 'Sports Cap', price: 450, category: 'accessory', img: '', desc: 'Breathable cap for daily wear' }
];

/* Put placeholder images (data URLs) for products that don't have images */
function placeholderImg(text, w=400, h=300){
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#f1f5f9'; ctx.fillRect(0,0,w,h);
  ctx.fillStyle = '#94a3b8'; ctx.fillRect(0,h-40,w,40);
  ctx.fillStyle = '#334155'; ctx.font = '18px Inter, Arial'; ctx.fillText(text, 12, 28);
  return c.toDataURL();
}

/* Ensure product images exist */
PRODUCTS.forEach((p,i)=>{
  if(!p.img) p.img = placeholderImg(p.title, 420, 300);
});

/* ----------- localStorage Cart ----------- */
const CART_KEY = 'riaz_portfolio_cart_v1';
function loadCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){
    console.warn('Error reading cart', e);
    return {};
  }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ----------- Render Products ----------- */
function renderProducts(list){
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  if(!list.length){
    grid.innerHTML = '<div class="muted">No products found.</div>';
    return;
  }
  for(const p of list){
    const item = document.createElement('div');
    item.className = 'product-card';
    item.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h4>${p.title}</h4>
      <div class="price">${currency(p.price)} PKR</div>
      <div style="flex:1"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="btn ghost small" data-action="view" data-id="${p.id}">View</button>
        <button class="btn primary small" data-action="add" data-id="${p.id}">Add to cart</button>
      </div>
    `;
    grid.appendChild(item);
  }
}

/* ----------- Render Cart ----------- */
function renderCart(){
  const cartEl = document.getElementById('cartList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const taxEl = document.getElementById('cartTax');
  const totalEl = document.getElementById('cartTotal');

  const cart = loadCart();
  const ids = Object.keys(cart);
  cartEl.innerHTML = '';
  if(ids.length === 0){
    cartEl.innerHTML = '<div class="muted tiny">Your cart is empty</div>';
    subtotalEl.textContent = '0.00';
    taxEl.textContent = '0.00';
    totalEl.textContent = '0.00';
    return;
  }

  let subtotal = 0;
  for(const id of ids){
    const qty = cart[id];
    const product = PRODUCTS.find(p => p.id === id);
    if(!product) continue;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <div class="meta">
        <strong>${product.title}</strong>
        <div class="muted tiny">${currency(product.price)} PKR × ${qty} = ${currency(product.price * qty)} PKR</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
        <div>
          <button class="btn ghost small" data-action="minus" data-id="${id}">−</button>
          <button class="btn ghost small" data-action="plus" data-id="${id}">+</button>
        </div>
        <button class="btn ghost tiny" data-action="remove" data-id="${id}">Remove</button>
      </div>
    `;
    cartEl.appendChild(itemDiv);
    subtotal += product.price * qty;
  }

  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + tax;
  subtotalEl.textContent = currency(subtotal);
  taxEl.textContent = currency(tax);
  totalEl.textContent = currency(total);
}

/* ----------- Cart actions (add/remove/clear) ----------- */
function addToCart(id, qty=1){
  const cart = loadCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
  renderCart();
}
function changeQty(id, delta){
  const cart = loadCart();
  if(!cart[id]) return;
  cart[id] += delta;
  if(cart[id] <= 0) delete cart[id];
  saveCart(cart);
  renderCart();
}
function removeFromCart(id){
  const cart = loadCart();
  if(cart[id]) delete cart[id];
  saveCart(cart);
  renderCart();
}
function clearCart(){
  localStorage.removeItem(CART_KEY);
  renderCart();
}

/* ----------- Demo event handlers ----------- */
function wireDemo(){
  // initial render
  renderProducts(PRODUCTS);
  renderCart();

  // product buttons
  document.getElementById('productsGrid').addEventListener('click', function(e){
    const btn = e.target.closest('button');
    if(!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    if(action === 'add') addToCart(id, 1);
    if(action === 'view'){
      const p = PRODUCTS.find(x => x.id === id);
      alert(p.title + '\\n\\n' + p.desc + '\\n\\nPrice: ' + currency(p.price) + ' PKR');
    }
  });

  // cart actions
  document.getElementById('cartList').addEventListener('click', function(e){
    const btn = e.target.closest('button');
    if(!btn) return;
    const act = btn.dataset.action;
    const id = btn.dataset.id;
    if(act === 'minus') changeQty(id, -1);
    if(act === 'plus') changeQty(id, +1);
    if(act === 'remove') removeFromCart(id);
  });

  // clear cart
  document.getElementById('clearCartBtn').addEventListener('click', function(){
    if(confirm('Clear cart?')) clearCart();
  });

  // checkout simulation
  document.getElementById('checkoutBtn').addEventListener('click', function(){
    const cart = loadCart();
    if(Object.keys(cart).length === 0){
      alert('Cart is empty.');
      return;
    }
    // simulate processing...
    const message = document.getElementById('checkoutMessage');
    message.textContent = 'Processing order...';
    setTimeout(()=>{
      clearCart();
      message.textContent = 'Order simulated ✔️ — thank you! (no real payment processed)';
      setTimeout(()=>{ message.textContent = '' }, 4000);
    }, 1200);
  });

  // search & filter
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  function applyFilter(){
    const q = (searchInput.value || '').trim().toLowerCase();
    const cat = categoryFilter.value;
    let filtered = PRODUCTS.filter(p=>{
      const matchesQ = q === '' || p.title.toLowerCase().includes(q) || (p.desc || '').toLowerCase().includes(q);
      const matchesCat = cat === 'all' || p.category === cat;
      return matchesQ && matchesCat;
    });
    renderProducts(filtered);
  }

  searchInput.addEventListener('input', applyFilter);
  categoryFilter.addEventListener('change', applyFilter);
}

/* ----------- Contact form handling (client-side only) ----------- */
function wireContactForm(){
  const form = document.getElementById('contactForm');
  const result = document.getElementById('contactResult');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if(!name || !email || !message){
      result.textContent = 'Please fill all fields.';
      result.style.color = 'crimson';
      return;
    }
    // Configuration for contact submission.
    // Set `CONTACT_CONFIG.formspreeEndpoint` to your Formspree endpoint (e.g. https://formspree.io/f/yourId)
    // or leave as null to use the mailto fallback.
    const CONTACT_CONFIG = window.CONTACT_CONFIG || {
      provider: 'auto', // 'formspree' | 'mailto' | 'auto'
      formspreeEndpoint: '' // <-- set your Formspree endpoint here
    };

    // Use Formspree if configured; otherwise fallback to opening the user's mail client.
    if(CONTACT_CONFIG.formspreeEndpoint && CONTACT_CONFIG.provider !== 'mailto'){
      // Submit via fetch using FormData (works with Formspree free endpoint)
      result.style.color = 'inherit';
      result.textContent = 'Sending message...';
      const fd = new FormData(form);
      // Add an explicit field for recipient (not required for Formspree but kept for clarity)
      fd.append('to', 'riazaslam029@gmail.com');
      fetch(CONTACT_CONFIG.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd
      }).then(async (res) => {
        if(res.ok){
          result.style.color = 'green';
          result.textContent = 'Message sent — thank you!';
          form.reset();
          setTimeout(()=> result.textContent = '', 6000);
        }else{
          // Try to read error info
          let json;
          try{ json = await res.json(); }catch(e){}
          console.warn('Formspree error', res.status, json);
          result.style.color = 'crimson';
          result.textContent = 'Could not send message. Falling back to email client...';
          // fallback to mailto after short delay
          setTimeout(()=> fallbackToMailto(name, email, message, result, form), 1200);
        }
      }).catch(err=>{
        console.warn('Contact submit error', err);
        result.style.color = 'crimson';
        result.textContent = 'Error sending message. Opening email client...';
        setTimeout(()=> fallbackToMailto(name, email, message, result, form), 900);
      });
    }else{
      // No provider configured — fallback to mailto
      fallbackToMailto(name, email, message, result, form);
    }
  });
}

// Helper to open user's mail client if serverless provider isn't configured or fails.
function fallbackToMailto(name, email, message, resultEl, formEl){
  const to = 'riazaslam029@gmail.com';
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message,
    '',
    `---\nSent from portfolio contact form`
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
  // Opening mail client — this requires user's client.
  window.location.href = mailto;
  resultEl.style.color = 'green';
  resultEl.textContent = 'Opening your email client to send the message...';
  formEl.reset();
  setTimeout(()=> resultEl.textContent = '', 6000);
}

/* ----------- GitHub project loader (public repos) ----------- */
async function loadGitHubProjects(username = 'riazaslam029', limit = 6){
  const container = document.getElementById('github-projects');
  if(!container) return;
  container.innerHTML = '<div class="muted">Loading projects...</div>';
  try{
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`);
    if(!res.ok) throw new Error('GitHub API error: ' + res.status);
    const repos = await res.json();
    container.innerHTML = '';
    repos.forEach(r => {
      const card = document.createElement('article');
      card.className = 'repo-card reveal';
      card.innerHTML = `
        <h4 style="margin:0 0 6px"><a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a></h4>
        <p style="margin:0 0 8px;color:var(--text-muted)">${r.description || ''}</p>
        <div class="repo-meta">
          <div class="lang">${r.language || 'N/A'}</div>
          <div>★ ${r.stargazers_count}</div>
          <div style="margin-left:auto;color:var(--text-muted);font-size:0.85rem">Updated ${new Date(r.updated_at).toLocaleDateString()}</div>
        </div>
      `;
      container.appendChild(card);
    });
    // run reveal observer on newly injected items
    initRevealObserver();
  }catch(err){
    container.innerHTML = `<div class="muted">Could not load GitHub projects (${err.message}). Try again later.</div>`;
    console.warn(err);
  }
}

/* ----------- Reveal observer for scroll animations ----------- */
function initRevealObserver(){
  const items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    items.forEach(i=> i.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting) en.target.classList.add('is-visible');
    });
  }, {threshold: 0.12});
  items.forEach(i=> obs.observe(i));
}

/* ----------- Small UI helpers for scrolling demo ----------- */
function scrollToDemo(){
  document.getElementById('ecom-demo').scrollIntoView({behavior:'smooth'});
}

/* ----------- Init on DOM ready ----------- */
document.addEventListener('DOMContentLoaded', function(){
  // Only initialize the e-commerce demo if the demo DOM exists.
  if(document.getElementById('productsGrid') && document.getElementById('cartList')){
    wireDemo();
  }

  if(document.getElementById('contactForm')){
    wireContactForm();
  }

  // Load GitHub projects into the `#github-projects` container
  loadGitHubProjects('riazaslam029', 6);
  // Init reveal observer for any items that exist on load
  initRevealObserver();

  // Add tiny links behavior for demo (open GitHub)
  $qa('.project-actions a').forEach(a=>{
    a.addEventListener('click', function(e){
      // nothing special for now
    });
  });
});
