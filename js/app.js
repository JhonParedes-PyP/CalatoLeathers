/* ========================================================
   CALATO LEATHERS - LÓGICA DE APLICACIÓN
   Pedidos directos a WhatsApp, Paleta de Confección, Compartir, Galería y Visor
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
  checkSharedProductUrl();
});

// Respaldo en caso de carga tardía de imágenes o eventos
window.addEventListener('load', () => {
  checkSharedProductUrl();
});

// Listener para cambios de URL sin recargar página
window.addEventListener('hashchange', () => {
  checkSharedProductUrl();
});

window.addEventListener('popstate', () => {
  checkSharedProductUrl();
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
// RENDERIZADO DE PRODUCTOS (FOTOS 100% ORIGINALES)
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

    if (product.variants && product.variants.length > 0) {
      const activeVariantId = AppState.selectedVariants[product.id] || product.variants[0].id;
      const activeVariant = product.variants.find(v => v.id === activeVariantId) || product.variants[0];

      variantsHtml = `
        <div class="product-variants" onclick="event.stopPropagation()">
          <div class="variants-header">
            <span class="variants-title"><i class="fa-solid fa-palette"></i> Colores para confección:</span>
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
            <span class="variant-thread"><i class="fa-solid fa-grip-lines"></i> Costura: ${activeVariant.thread}</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-thumb">
          <img id="productImg-${product.id}" src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
          <button class="product-share-btn" onclick="shareProduct(${product.id}, event)" title="Compartir este producto" aria-label="Compartir producto">
            <i class="fa-solid fa-share-nodes"></i>
          </button>
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
            <div class="product-actions-group">
              <button class="btn-share-icon" onclick="shareProduct(${product.id}, event)" title="Compartir este producto" aria-label="Compartir">
                <i class="fa-solid fa-share-nodes"></i>
              </button>
              <button class="btn btn-buy-wa" onclick="orderSingleProductWhatsApp(${product.id})" title="Pedir por WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
                <span>Pedir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ----------------------------------------------------
// SELECCIÓN DE VARIANTE DE COLOR (LA FOTO ORIGINAL SE MANTIENE)
// ----------------------------------------------------
function selectProductVariant(productId, variantId, btnEl) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product || !product.variants) return;

  const variant = product.variants.find(v => v.id === variantId);
  if (!variant) return;

  AppState.selectedVariants[productId] = variantId;

  // 1. Actualizar la tarjeta del producto (solo swatches y texto informativo)
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    const swatches = card.querySelectorAll('.variant-swatch');
    swatches.forEach(s => {
      s.classList.toggle('active', s.dataset.variantId === variantId);
    });

    const info = card.querySelector(`#variantInfo-${productId}`);
    if (info) {
      info.innerHTML = `
        <span class="variant-leather">Cuero: ${variant.name}</span>
        <span class="variant-thread"><i class="fa-solid fa-grip-lines"></i> Costura: ${variant.thread}</span>
      `;
    }
  }

  // 2. Si el modal está abierto para este producto, sincronizar swatches y texto
  const modal = document.getElementById('productModal');
  if (modal && modal.classList.contains('active') && AppState.selectedProduct && AppState.selectedProduct.id === productId) {
    const modalSwatches = modal.querySelectorAll('.variant-swatch');
    modalSwatches.forEach(s => {
      s.classList.toggle('active', s.dataset.variantId === variantId);
    });
    const modalInfo = modal.querySelector(`#modalVariantInfo-${productId}`);
    if (modalInfo) {
      modalInfo.innerHTML = `
        <span class="variant-leather">Cuero: ${variant.name}</span>
        <span class="variant-thread"><i class="fa-solid fa-grip-lines"></i> Costura: ${variant.thread}</span>
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

  if (product.variants && product.variants.length > 0) {
    const activeVariantId = AppState.selectedVariants[product.id] || product.variants[0].id;
    const activeVariant = product.variants.find(v => v.id === activeVariantId) || product.variants[0];

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
          <span class="variant-thread"><i class="fa-solid fa-grip-lines"></i> Costura: ${activeVariant.thread}</span>
        </div>
      </div>
    `;
  }

  details.innerHTML = `
    <div class="modal-grid">
      <div class="modal-image-col">
        <div class="modal-main-img-box" onclick="openLightboxFromModal()" title="Hacer clic para ver foto completa en pantalla grande">
          <img id="modalMainImg" src="${product.image}" alt="${product.name}">
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
          <button class="btn btn-share-modal" onclick="shareProduct(${product.id}, event)">
            <i class="fa-solid fa-share-nodes"></i>
            <span>Compartir este producto</span>
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
    
    // Si la URL tenía el parámetro del producto, limpiar la URL de forma limpia
    try {
      if (window.location.search.includes('producto=') || window.location.hash.includes('producto-')) {
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch(e) {}
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
      variantDetails = `🎨 *Color de Cuero Solicitado:* ${variant.name}\n` +
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
// FUNCIÓN COMPARTIR PRODUCTO (NATIVE WEB SHARE & CLIPBOARD)
// ----------------------------------------------------
function shareProduct(productId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const origin = window.location.origin;
  const path = window.location.pathname;
  // Genera URL con nombre amigable (slug): ?producto=monedero-calato
  const productKey = product.slug || product.id;
  const shareUrl = `${origin}${path}?producto=${productKey}`;
  
  const shareTitle = `${product.name} • ${STORE_CONFIG.storeName}`;
  const shareText = `Descubre esta pieza de cuero vacuno legítimo hecha 100% a mano por ${STORE_CONFIG.artisanName}: ${product.name} (${STORE_CONFIG.formatPrice(product.price)}).`;

  if (navigator.share) {
    navigator.share({
      title: shareTitle,
      text: shareText,
      url: shareUrl
    }).catch(err => {
      // Si el usuario no canceló la acción manualmente, copiar enlace
      if (err.name !== 'AbortError') {
        copyShareLink(shareUrl, product.name);
      }
    });
  } else {
    copyShareLink(shareUrl, product.name);
  }
}

function copyShareLink(url, productName) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast(`¡Enlace de "${productName}" copiado! Listo para compartir.`, 'fa-solid fa-link');
    }).catch(() => {
      fallbackCopyText(url, productName);
    });
  } else {
    fallbackCopyText(url, productName);
  }
}

function fallbackCopyText(text, productName) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`¡Enlace copiado al portapapeles! Listo para compartir.`, 'fa-solid fa-link');
  } catch (err) {
    showToast(`Enlace: ${text}`, 'fa-solid fa-info-circle');
  }
  document.body.removeChild(textArea);
}

function showToast(message, icon = 'fa-solid fa-check') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ----------------------------------------------------
// DETECCIÓN ROBUSTA DE PRODUCTO EN LA URL (SLUGS Y PARÁMETROS)
// ----------------------------------------------------
function getSharedProduct() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = (window.location.hash || '').replace(/^#/, '').toLowerCase().trim();
    const href = window.location.href || '';

    // 1. Revisar si viene ?producto=monedero-calato o ?producto=6
    const paramVal = (urlParams.get('producto') || urlParams.get('id') || urlParams.get('p') || '').toLowerCase().trim();
    if (paramVal) {
      const found = PRODUCTS_DATA.find(p => p.slug === paramVal || String(p.id) === paramVal);
      if (found) return found;
    }

    // 2. Revisar si viene en formato ?monedero=calato o ?billetera=bifold
    for (const [key, val] of urlParams.entries()) {
      const combined = `${key}-${val}`.toLowerCase().trim();
      const foundCombined = PRODUCTS_DATA.find(p => p.slug === combined || (p.slug && p.slug.includes(combined)));
      if (foundCombined) return foundCombined;
      
      const foundKey = PRODUCTS_DATA.find(p => p.slug === key.toLowerCase() || (p.slug && p.slug.includes(key.toLowerCase())));
      if (foundKey) return foundKey;

      const foundVal = PRODUCTS_DATA.find(p => p.slug === val.toLowerCase() || (p.slug && p.slug.includes(val.toLowerCase())));
      if (foundVal) return foundVal;
    }

    // 3. Revisar el hash de la URL: #monedero-calato o #producto-6
    if (hash) {
      const cleanHash = hash.replace('producto-', '');
      const foundHash = PRODUCTS_DATA.find(p => p.slug === cleanHash || p.slug === hash || String(p.id) === cleanHash);
      if (foundHash) return foundHash;
    }

    // 4. Búsqueda en la URL completa (fallback)
    for (const p of PRODUCTS_DATA) {
      if (p.slug && href.toLowerCase().includes(p.slug)) {
        return p;
      }
    }
  } catch (e) {
    console.error('Error detectando producto compartido:', e);
  }
  return null;
}

// Abrir producto directamente si viene por URL compartida
let hasHandledSharedUrl = false;
function checkSharedProductUrl() {
  if (hasHandledSharedUrl) return;

  const product = getSharedProduct();
  if (!product) return;

  hasHandledSharedUrl = true;

  // Si la categoría actual está filtrada y oculta el producto, restablecer a 'todos'
  if (AppState.currentCategory !== 'todos' && AppState.currentCategory !== product.category) {
    AppState.currentCategory = 'todos';
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.category === 'todos');
    });
    renderProducts();
  }

  // Abrir de inmediato el modal del producto
  openProductModal(product.id);

  // Desplazar suavemente hasta centrar el producto en la página
  setTimeout(() => {
    const card = document.querySelector(`.product-card[data-id="${product.id}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('highlight-shared');
      setTimeout(() => card.classList.remove('highlight-shared'), 3500);
    }
  }, 150);
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
