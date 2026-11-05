# Guía Técnica para Desarrolladores • Calato Leathers

Este documento detalla la arquitectura, las modificaciones recientes realizadas al sistema de catálogo, el funcionamiento del selector de colores interactivo y cómo mantener o agregar nuevos productos en la tienda web de **Calato Leathers** (artesano: Jhon Paredes).

---

## 1. Arquitectura General del Proyecto

El sitio web está construido con tecnologías web estándar (Vanilla HTML, CSS y JavaScript) sin dependencias pesadas de frameworks, lo que garantiza velocidad máxima de carga y compatibilidad total con dispositivos móviles y navegadores antiguos.

- **URL de Producción:** [https://jhonparedes-pyp.github.io/CalatoLeathers/](https://jhonparedes-pyp.github.io/CalatoLeathers/)
- **Repositorio:** `https://github.com/JhonParedes-PyP/CalatoLeathers.git` (Rama `main`)
- **Hosting y Despliegue:** GitHub Pages gestionado mediante GitHub Actions (`.github/workflows/deploy.yml`). Cualquier commit con `git push origin main` compila y despliega automáticamente en ~45 segundos.

### Estructura de Archivos Clave:
```text
/
├── index.html                   # Estructura principal de la tienda (SPA ligera)
├── css/
│   └── style.css                # Estilos globales, variables de color, responsive, modales
├── js/
│   ├── products.js              # Datos de los productos (precios, fotos, variantes, descripciones)
│   └── app.js                   # Lógica interactiva (swatches, modales, lightbox, WhatsApp)
├── assets/
│   ├── img/                     # Fotografías originales y variantes de color
│   └── icons/                   # Favicons y recursos gráficos
├── .github/workflows/deploy.yml # Pipeline de despliegue automático
└── CAMBIOS_PROGRAMADOR.md        # Este documento explicativo
```

---

## 2. Sistema de Selección de Variantes de Color de Cuero

### El problema anterior y por qué se cambió:
Inicialmente se intentó simular el cambio de color usando filtros CSS (`filter: hue-rotate(...) sepia(...)`). Esto causaba que:
1. Las fotos con fondo blanco, gris o tela cambiaran también el fondo, tiñéndolo de colores verdosos o saturados y distorsionando la imagen.
2. Los productos bitono (por ejemplo, cuero caramelo con solapa chocolate y broche de latón) perdían sus contrastes reales y detalles de costura.

### La solución implementada:
Cada producto cuenta con variantes de color asociadas a **imágenes dedicadas de alta definición**:
- Cuando el cliente hace clic en una bolita de color (swatch), **la imagen del producto cambia de manera suave y real (`img.src = variant.image`)**.
- No se distorsiona el fondo ni los broches metálicos.
- Se actualiza el nombre del cuero seleccionado y el tipo/color de hilo encerado.
- Al hacer clic en "Pedir por WhatsApp", el mensaje generado ya incluye automáticamente el **Color de Cuero** y la **Costura** elegida por el usuario.

---

## 3. Estructura de Datos en `js/products.js`

Cada producto en el arreglo `PRODUCTS_DATA` tiene una estructura como esta:

```javascript
{
  id: 1,
  name: "Billetera Bifold Compacta con Solapa y Broche",
  category: "billeteras",
  categoryLabel: "Billeteras de Hombre",
  price: 118,
  image: "assets/img/billetera-bifold-broche-frontal.png", // Imagen por defecto
  variants: [
    {
      id: "caramelo",
      name: "Caramelo / Miel (Original)",
      hex: "#A85D2A",
      thread: "Hilo Crema Marfil (Contraste)",
      image: "assets/img/billetera-bifold-broche-frontal.png"
    },
    {
      id: "negro",
      name: "Negro Azabache",
      hex: "#1D1A18",
      thread: "Hilo Crema en Contraste o Hilo Negro",
      image: "assets/img/billetera-bifold-broche-frontal-negro.png"
    },
    {
      id: "chocolate",
      name: "Marrón Chocolate Profundo",
      hex: "#422415",
      thread: "Hilo Tostado / Café",
      image: "assets/img/billetera-bifold-broche-frontal-chocolate.png"
    },
    {
      id: "cognac",
      name: "Coñac / Whiskey Vintage",
      hex: "#C66827",
      thread: "Hilo Crema Grueso",
      image: "assets/img/billetera-bifold-broche-frontal-cognac.png"
    }
  ],
  gallery: [ ... ],
  shortDesc: "...",
  fullDesc: "...",
  specs: [ ... ]
}
```

### Paleta estándar de cueros Calato:
1. **Caramelo / Miel:** `#A85D2A`
2. **Negro Azabache:** `#1D1A18`
3. **Marrón Chocolate Profundo:** `#422415`
4. **Coñac / Whiskey Vintage:** `#C66827`

---

## 4. Lógica de Cambio de Color en `js/app.js`

La función `selectProductVariant(productId, variantId, btnEl)`:

```javascript
function selectProductVariant(productId, variantId, btnEl) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product || !product.variants) return;

  const variant = product.variants.find(v => v.id === variantId);
  if (!variant) return;

  // Guarda la variante activa en el estado global
  AppState.selectedVariants[productId] = variantId;

  // 1. Actualiza la tarjeta del catálogo
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    card.querySelectorAll('.variant-swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.variantId === variantId);
    });

    const img = card.querySelector('.product-thumb img');
    if (img && variant.image) {
      img.style.opacity = '0.3';
      setTimeout(() => {
        img.src = variant.image;
        img.style.opacity = '1';
      }, 120);
    }

    const info = card.querySelector(`#variantInfo-${productId}`);
    if (info) {
      info.innerHTML = `
        <span class="variant-leather">Cuero: ${variant.name}</span>
        <span class="variant-thread"><i class="fa-solid fa-grip-lines"></i> ${variant.thread}</span>
      `;
    }
  }

  // 2. Si el modal está abierto para este producto, sincroniza la imagen del modal
  const modal = document.getElementById('productModal');
  if (modal && modal.classList.contains('active') && AppState.selectedProduct?.id === productId) {
    const modalImg = document.getElementById('modalMainImg');
    if (modalImg && variant.image) {
      modalImg.style.opacity = '0.3';
      setTimeout(() => {
        modalImg.src = variant.image;
        modalImg.style.opacity = '1';
      }, 120);
    }
    modal.querySelectorAll('.variant-swatch').forEach(s => {
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
```

---

## 5. Integración con WhatsApp

- Configurada en `STORE_CONFIG.whatsappNumber = "51915222623"`.
- Al generar el enlace de compra en `orderSingleProductWhatsApp(productId)`, la función revisa `AppState.selectedVariants[productId]` e inserta los datos de personalización:

```text
¡Hola Calato Leathers! 👋

Estoy interesado en adquirir la siguiente pieza artesanal de Jhon Paredes:
🔸 Billetera Bifold Compacta con Solapa y Broche
🎨 Color de Cuero: Negro Azabache
🧵 Costura: Hilo Crema en Contraste o Hilo Negro
💰 Precio: S/ 118

¿Tienen disponibilidad y cuáles son los medios de pago para coordinar el envío? ¡Muchas gracias!
```

---

## 6. Cómo Agregar un Nuevo Producto

1. Coloca las fotos en `assets/img/`.
2. Abre `js/products.js`.
3. Agrega un nuevo objeto al array `PRODUCTS_DATA` con un `id` único consecutivo.
4. Si tiene variantes de color, define el array `variants` apuntando a las fotos correspondientes de cada color.
5. Guarda y haz commit:
   ```bash
   git add js/products.js assets/img/
   git commit -m "Agregar nuevo producto X"
   git push origin main
   ```
6. En ~45 segundos el cambio estará activo en la web.

---

## 7. Consejos de Mantenimiento

- **Codificación de Archivos:** Guarda siempre los archivos `.html`, `.css` y `.js` en **UTF-8 sin BOM** para evitar corrupción de tildes o caracteres como la `ñ`.
- **Precios:** Para modificar precios rápidamente, basta con editar el campo `price` en `js/products.js` (número entero o decimal). La función `STORE_CONFIG.formatPrice()` añade automáticamente el símbolo de moneda (`S/`).
- **Caché en Navegadores:** Tras subir cambios con `git push`, recuerda recargar con `Ctrl + F5` (o en incógnito en móvil) para forzar la recarga de scripts actualizados.
