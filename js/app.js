/* ========================================================
   CALATO LEATHERS - LÓGICA DE APLICACIÓN
   Pedidos directos a WhatsApp, Variantes de Color Reales, Galería y Visor
   Artesano: Jhon Paredes • El Artesano
   ======================================================== */

// Estado global de la aplicación
const AppState = {
  currentCategory: 'todos',
  searchQuery: '',
  selectedProduct: null,
  selectedVariants: {}, // { [productId]: variantId }
  lightboxGallery: [],
  lightboxIndex: 0,
  lightboxTitle: ''
};

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  renderProducts();
  setupEventListeners();
  updateFooterYear();
});

// Configurar enlaces telefónicos según STORE_CONFIG
function initWhatsAppLinks() {
  const phone = STORE_CONFIG.whatsappNumber;
  const floatingWa = document.getElementById('floatingWhatsApp');
  const contactWa = document.getElementById('contactWhatsAppLink');
  const navWa = document.getElementById('navWaBtn');
  
  const defaultMsg = encodeURIComponent('¡Hola ' + STORE_CONFIG.storeName + '! Me gustaría consultar sobre sus productos de cuero artesanal.');

  if (floatingWa) {
    floatingWa.href = `https://wa.me/${phone}?text=${defaultMsg}`;
  }
  
  if (contactWa) {
    contactWa.href = `https://wa.me/${phone}?text=${defaultMsg}`;
    contactWa.textContent = `Chatear al +${phone}`;
  }

  if (navWa) {
    navWa.href = `https://wa.me/${phone}?text=${defaultMsg}`;
  }
}

// Configurar Listeners de Eventos
function setupEventListeners() {
  // Filtros de categoría
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      AppState.currentCategory = e.target.dataset.category;
      renderProducts();
    });
  });

  // Búsqueda en tiempo real
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Menú móvil hamburguesa
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
      });
    });
  }

  // Control de teclado para modales y visor
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const lb = document.getElementById('imageLightbox');
      if (lb && lb.classList.contains('active')) {
        closeLightbox();
        return;
      }
      closeProductModal();
    } else if (e.key === 'ArrowLeft') {
      const lb = document.getElementById('imageLightbox');
      if (lb && lb.classList.contains('active')) {
        navigateLightbox(-1);
      }
    } else if (e.key === 'ArrowRight') {
      const lb = document.getElementById('imageLightbox');
      if (lb && lb.classList.contains('active')) {
        navigateLightbox(1);
      }
    }
  });

  // Efecto navbar al hacer scroll
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ----------------------------------------------------
// RENDERIZADO DE PRODUCTOS
// ----------------------------------------------------
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;

  const filtered = PRODUCTS_DATA.filter(product => {
    const matchesCategory = (AppState.currentCategory === 'todos' || product.category === AppState.currentCategory);
    const matchesSearch = product.name.toLowerCase().includes(AppState.searchQuery) ||
                          product.shortDesc.toLowerCase().includes(AppState.searchQuery) ||
                          product.categoryLabel.toLowerCase().includes(AppState.searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }

  if (noResults) noResults.style.display = 'none';

  grid.innerHTML = filtered.map(product => {
    let variantsHtml = '';
    let currentImage = product.image;

    if (product.variants && product.variants.length > 0) {
      const activeVariantId = AppState.selectedVariants[product.id] || product.variants[0].id;
      const activeVariant = product.variants.find(v => v.id === activeVariantId) || product.variants[0];
      if (activeVariant.image) {
        currentImage = activeVariant.image;
      }

      variantsHtml = `
        <div class="product-variants" onclick="event.stopPropagation()">
          <div class="variants-header">
            <span class="variants-title"><i class="fa-solid fa-palette"></i> Colores de cuero:</span>
            <span class="variants-hint">Elige un color</span>
          </div>
          <div class="variant-swatches">
            ${product.variants.map(v => `
              <button 
                type="button" 
                class="variant-swatch ${v.id === activeVariant.id ? 'active' : ''}" 
                style="--swatch-color: ${v.hex};" 
                data-product-id="${product.id}"
                data-variant-id="${v.id}"
                onclick="selectProductVariant(${product.id}, '${v.id}', this)"
                title="${v.name} • ${v.thread}"
                aria-label="${v.name}">
              </button>
            `).join('')}
          </div>
          <div class="variant-info" id="variantInfo-${product.id}">
            <span class="variant-leather">Cuero: ${activeVariant.name}</span>
            <span class="variant-thread"><i class="fa-solid fa-grip-lines"></i> ${activeVariant.thread}</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-thumb">
          <img id="productImg-${product.id}" src="${currentImage}" alt="${product.name}" loading="lazy">
          ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
          <button class="product-quick-view" onclick="openProductModal(${product.id})" title="Ver detalles e imágenes">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <div class="product-body">
          <span class="product-category">${product.categoryLabel}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.shortDesc}</p>
          ${variantsHtml}

          <div class="product-footer">
            <span class="product-price">${STORE_CONFIG.formatPrice(product.price)}</span>
            <button class="btn btn-buy-wa" onclick="orderSingleProductWhatsApp(${product.id})" title="Pedir por WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
              <span>Pedir por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ----------------------------------------------------
// SELECCIÓN DE VARIANTE DE COLOR (CAMBIA LA IMAGEN REAL)
// ----------------------------------------------------
function selectProductVariant(productId, variantId, btnEl) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product || !product.variants) return;

  const variant = product.variants.find(v => v.id === variantId);
  if (!variant) return;

  AppState.selectedVariants[productId] = variantId;

  // 1. Actualizar la tarjeta del producto
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    const swatches = card.querySelectorAll('.variant-swatch');
    swatches.forEach(s => {
      s.classList.toggle('active', s.dataset.variantId === variantId);
    });

    // Cambiar la imagen del producto suavemente
    const img = card.querySelector('.product-thumb img');
    if (img && variant.image && img.getAttribute('src') !== variant.image) {
      img.style.opacity = '0.35';
      setTimeout(() => {
        img.src = variant.image;
        img.style.opacity = '1';
      }, 100);
    }

    const info = card.querySelector(`#variantInfo-${productId}`);
    if (info) {
      info.innerHTML = `
        <span class="variant-leather">Cuero: ${variant.name}</span>
        <span class="variant-thread"><i class="fa-solid fa-grip-lines"></i> ${variant.thread}</span>
      `;
    }
  }

  // 2. Si el modal está abierto para este producto, sincronizar la imagen y swatches
  const modal = document.getElementById('productModal');
  if (modal && modal.classList.contains('active') && AppState.selectedProduct && AppState.selectedProduct.id === productId) {
    const modalImg = document.getElementById('modalMainImg');
    if (modalImg && variant.image && modalImg.getAttribute('src') !== variant.image) {
      modalImg.style.opacity = '0.35';
      setTimeout(() => {
        modalImg.src = variant.image;
        modalImg.style.opacity = '1';
      }, 100);
    }
    const modalSwatches = modal.querySelectorAll('.variant-swatch');
    modalSwatches.forEach(s => {
      s.classList.toggle('active', s.dataset.variantId === variantId);
    });
    const modalInfo = modal.querySelector(`#modalVariantInfo-${productId}`);
    if (modalInfo) {
      modalInfo.innerHTML = `
        <span class="variant-leather">Cuero: ${variant.name}</span>
        <span class="variant-thread"><i class="fa-solid fa-grip-lines"></i> ${variant.thread}</span>
      `;
    }
  }
}

function resetFilters() {
  AppState.currentCategory = 'todos';
  AppState.searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(b => {
    if (b.dataset.category === 'todos') b.classList.add('active');
    else b.classList.remove('active');
  });
  renderProducts();
}

// ----------------------------------------------------
// MODAL DETALLE DE PRODUCTO
// ----------------------------------------------------
function openProductModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  AppState.selectedProduct = product;
  const modal = document.getElementById('productModal');
  const details = document.getElementById('modalProductDetails');

  const specsList = product.specs && product.specs.length > 0 
    ? `<ul class="modal-specs">
        ${product.specs.map(spec => `<li><i class="fa-solid fa-circle-check"></i> ${spec}</li>`).join('')}
       </ul>`
    : '';

  const galleryThumbs = product.gallery && product.gallery.length > 1
    ? `<div class="modal-gallery-thumbs">
        ${product.gallery.map((img, i) => `
          <button class="gallery-thumb-btn ${i === 0 ? 'active' : ''}" onclick="changeModalImage('${img}', this)" aria-label="Ver foto ${i + 1}">
            <img src="${img}" alt="Vista miniatura ${i + 1}">
          </button>
        `).join('')}
       </div>`
    : '';

  let variantsModalHtml = '';
  let initialModalImg = product.image;

  if (product.variants && product.variants.length > 0) {
    const activeVariantId = AppState.selectedVariants[product.id] || product.variants[0].id;
    const activeVariant = product.variants.find(v => v.id === activeVariantId) || product.variants[0];
    if (activeVariant.image) {
      initialModalImg = activeVariant.image;
    }

    variantsModalHtml = `
      <div class="modal-variants">
        <div class="variants-header">
          <span class="variants-title"><i class="fa-solid fa-palette"></i> Selecciona tu combinación de cuero y costura:</span>
        </div>
        <div class="variant-swatches">
          ${product.variants.map(v => `
            <button 
              type="button" 
              class="variant-swatch ${v.id === activeVariant.id ? 'active' : ''}" 
              style="--swatch-color: ${v.hex};" 
              data-product-id="${product.id}"
              data-variant-id="${v.id}"
              onclick="selectProductVariant(${product.id}, '${v.id}', this)"
              title="${v.name} • ${v.thread}"
              aria-label="${v.name}">
            </button>
          `).join('')}
        </div>
        <div class="variant-info" id="modalVariantInfo-${product.id}">
          <span class="variant-leather">Cuero: ${activeVariant.name}</span>
          <span class="variant-thread"><i class="fa-solid fa-grip-lines"></i> ${activeVariant.thread}</span>
        </div>
      </div>
    `;
  }

  details.innerHTML = `
    <div class="modal-grid">
      <div class="modal-image-col">
        <div class="modal-main-img-box" onclick="openLightboxFromModal()" title="Hacer clic para ver foto completa en pantalla grande">
          <img id="modalMainImg" src="${initialModalImg}" alt="${product.name}">
          <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i> Pantalla completa</span>
        </div>
        ${galleryThumbs}
      </div>
      <div class="modal-info-col">
        <span class="modal-badge">${product.categoryLabel}</span>
        <h2 class="modal-title">${product.name}</h2>
        <div class="modal-price">${STORE_CONFIG.formatPrice(product.price)}</div>
        <p class="modal-description">${product.fullDesc || product.shortDesc}</p>
        ${variantsModalHtml}
        ${specsList}
        <div class="modal-actions">
          <button class="btn btn-buy-wa-large" onclick="orderSingleProductWhatsApp(${product.id})">
            <i class="fa-brands fa-whatsapp"></i>
            <span>Pedir esta pieza por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function changeModalImage(src, btnEl) {
  const mainImg = document.getElementById('modalMainImg');
  if (mainImg) {
    mainImg.style.opacity = '0.35';
    setTimeout(() => {
      mainImg.src = src;
      mainImg.style.opacity = '1';
    }, 100);
  }
  document.querySelectorAll('.gallery-thumb-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// ----------------------------------------------------
// LIGHTBOX / VISOR DE FOTO COMPLETA (PANTALLA COMPLETA)
// ----------------------------------------------------
function openLightboxFromModal() {
  if (!AppState.selectedProduct) return;
  
  const mainImg = document.getElementById('modalMainImg');
  const currentSrc = mainImg ? mainImg.getAttribute('src') : AppState.selectedProduct.image;
  
  const gallery = AppState.selectedProduct.gallery && AppState.selectedProduct.gallery.length > 0
    ? [...AppState.selectedProduct.gallery]
    : [AppState.selectedProduct.image];

  if (!gallery.includes(currentSrc)) {
    gallery.unshift(currentSrc);
  }

  let idx = gallery.findIndex(img => currentSrc.includes(img) || img.includes(currentSrc));
  if (idx === -1) idx = 0;

  openLightbox(gallery, idx, AppState.selectedProduct.name);
}

function openLightbox(gallery, index, title) {
  AppState.lightboxGallery = gallery;
  AppState.lightboxIndex = index;
  AppState.lightboxTitle = title || '';

  const lb = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!lb || !img) return;

  img.src = gallery[index];
  if (caption) {
    caption.textContent = `${AppState.lightboxTitle} • Foto ${index + 1} de ${gallery.length} (Pulsa Esc para cerrar)`;
  }

  const showNav = gallery.length > 1;
  if (prevBtn) prevBtn.style.display = showNav ? 'flex' : 'none';
  if (nextBtn) nextBtn.style.display = showNav ? 'flex' : 'none';

  lb.classList.add('active');
  lb.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  const lb = document.getElementById('imageLightbox');
  if (lb) {
    lb.classList.remove('active');
    lb.setAttribute('aria-hidden', 'true');
  }
}

function navigateLightbox(dir) {
  if (!AppState.lightboxGallery || AppState.lightboxGallery.length <= 1) return;
  AppState.lightboxIndex = (AppState.lightboxIndex + dir + AppState.lightboxGallery.length) % AppState.lightboxGallery.length;

  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  if (img) {
    img.style.opacity = '0.35';
    setTimeout(() => {
      img.src = AppState.lightboxGallery[AppState.lightboxIndex];
      img.style.opacity = '1';
    }, 100);
  }
  if (caption) {
    caption.textContent = `${AppState.lightboxTitle} • Foto ${AppState.lightboxIndex + 1} de ${AppState.lightboxGallery.length} (Pulsa Esc para cerrar)`;
  }

  const mainImg = document.getElementById('modalMainImg');
  if (mainImg) {
    mainImg.src = AppState.lightboxGallery[AppState.lightboxIndex];
  }
  const thumbBtns = document.querySelectorAll('.gallery-thumb-btn');
  thumbBtns.forEach((btn, i) => {
    if (i === AppState.lightboxIndex) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

// ----------------------------------------------------
// PEDIDOS DIRECTOS A WHATSAPP
// ----------------------------------------------------
function orderSingleProductWhatsApp(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  let variantDetails = '';
  if (product.variants && product.variants.length > 0) {
    const selectedId = AppState.selectedVariants[productId] || product.variants[0].id;
    const variant = product.variants.find(v => v.id === selectedId);
    if (variant) {
      variantDetails = `🎨 *Color de Cuero:* ${variant.name}\n` +
                       `🧵 *Costura:* ${variant.thread}\n`;
    }
  }

  const text = `¡Hola ${STORE_CONFIG.storeName}! 👋\n\n` +
               `Estoy interesado en adquirir la siguiente pieza artesanal de Jhon Paredes:\n` +
               `🔸 *${product.name}*\n` +
               (variantDetails ? variantDetails : '') +
               `💰 *Precio:* ${STORE_CONFIG.formatPrice(product.price)}\n\n` +
               `¿Tienen disponibilidad y cuáles son los medios de pago para coordinar el envío? ¡Muchas gracias!`;

  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// ----------------------------------------------------
// UTILIDADES
// ----------------------------------------------------
function updateFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
