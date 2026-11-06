# Guía Técnica para Desarrolladores • Calato Leathers

Este documento detalla la arquitectura, el funcionamiento de la paleta de selección de colores y cómo mantener o agregar nuevos productos en la tienda web de **Calato Leathers** (artesano: Jhon Paredes).

---

## 1. Arquitectura General del Proyecto

El sitio web está construido con tecnologías web estándar (Vanilla HTML, CSS y JavaScript) sin dependencias de frameworks externos, lo que garantiza velocidad máxima de carga y compatibilidad total con dispositivos móviles y navegadores.

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
│   ├── products.js              # Datos de los productos (precios, fotos originales, variantes, descripciones)
│   └── app.js                   # Lógica interactiva (swatches de confección, modales, lightbox, WhatsApp)
├── assets/
│   ├── img/                     # Fotografías originales y auténticas de los productos
│   └── icons/                   # Favicons y recursos gráficos
├── .github/workflows/deploy.yml # Pipeline de despliegue automático
└── CAMBIOS_PROGRAMADOR.md        # Este documento explicativo
```

---

## 2. Sistema de Selección de Colores de Confección

### Decisión de diseño y autenticidad del producto:
Para mantener la máxima honestidad y calidad artesanal de Calato Leathers:
1. **Las fotografías se mantienen 100% auténticas y originales:** No se alteran ni recolorean artificialmente las fotos de los productos, garantizando que se aprecie la textura real, el brillo natural del cuero, las costuras y los broches de latón genuinos tal como fueron fotografiados en el taller.
2. **Paleta de Confección por Encargo:** Debajo de cada producto se presenta la paleta con las opciones de cuero disponibles para confeccionar la pieza a mano:
   - **Tono Original de la foto** (Caramelo/Miel, Coñac Vintage o Chocolate Profundo según la pieza)
   - **Negro Azabache** (`#1D1A18`)
   - **Verde Olivo Oscuro** (`#2E3D2A`)
   - **Azul Marino Profundo** (`#1A283B`)
3. Al tocar cualquier botón de la paleta:
   - El botón swatch queda resaltado con su halo activo.
   - El texto informativo se actualiza inmediatamente mostrando el nombre del cuero y la costura de contraste seleccionada (ej. `Cuero: Verde Olivo Oscuro • Costura: Hilo Crema Marfil`).
   - La foto original permanece intacta y nítida.
4. **Sincronización con WhatsApp:** Al pulsar "Pedir por WhatsApp", el mensaje generado automáticamente incluye el color de cuero exacto y el hilo de costura elegido por el cliente.

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
  image: "assets/img/billetera-bifold-broche-frontal.png", // Foto real del artesano
  variants: [
    {
      id: "caramelo",
      name: "Caramelo / Miel (Foto Original)",
      hex: "#A85D2A",
      thread: "Hilo Crema Marfil (Contraste)"
    },
    {
      id: "negro",
      name: "Negro Azabache",
      hex: "#1D1A18",
      thread: "Hilo Crema en Contraste o Hilo Negro"
    },
    {
      id: "verde",
      name: "Verde Olivo Oscuro",
      hex: "#2E3D2A",
      thread: "Hilo Crema Marfil (Contraste)"
    },
    {
      id: "azul",
      name: "Azul Marino Profundo",
      hex: "#1A283B",
      thread: "Hilo Crema en Contraste o Hilo Azul"
    }
  ],
  gallery: [ ... ],
  shortDesc: "...",
  fullDesc: "...",
  specs: [ ... ]
}
```

---

## 4. Lógica de Interacción en `js/app.js`

La función `selectProductVariant(productId, variantId, btnEl)`:

```javascript
function selectProductVariant(productId, variantId, btnEl) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product || !product.variants) return;

  const variant = product.variants.find(v => v.id === variantId);
  if (!variant) return;

  // Guarda la variante activa en el estado global
  AppState.selectedVariants[productId] = variantId;

  // 1. Actualiza los botones swatch en la tarjeta del producto
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    card.querySelectorAll('.variant-swatch').forEach(s => {
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

  // 2. Si el modal está abierto para este producto, sincroniza la selección
  const modal = document.getElementById('productModal');
  if (modal && modal.classList.contains('active') && AppState.selectedProduct?.id === productId) {
    modal.querySelectorAll('.variant-swatch').forEach(s => {
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
```

---

## 5. Integración con WhatsApp y Función de Compartir

### WhatsApp:
- Configurada en `STORE_CONFIG.whatsappNumber = "51915222623"`.
- Al generar el enlace de compra en `orderSingleProductWhatsApp(productId)`, la función revisa `AppState.selectedVariants[productId]` e inserta los datos de personalización:

```text
¡Hola Calato Leathers! 👋

Estoy interesado en adquirir la siguiente pieza artesanal de Jhon Paredes:
🔸 Billetera Bifold Compacta con Solapa y Broche
🎨 Color de Cuero Solicitado: Verde Olivo Oscuro
🧵 Costura: Hilo Crema Marfil (Contraste)
💰 Precio: S/ 118

¿Tienen disponibilidad y cuáles son los medios de pago para coordinar el envío? ¡Muchas gracias!
```

### Función de Compartir Producto con Enlaces Amigables (`shareProduct`):
- Los clientes pueden compartir cualquier producto desde la tarjeta del catálogo o desde el modal detallado mediante el botón de compartir `<i class="fa-solid fa-share-nodes"></i>`.
- **En dispositivos móviles y navegadores compatibles:** Abre la hoja de compartir nativa del sistema operativo (`navigator.share`) para enviar directamente a WhatsApp, Instagram, Facebook, Telegram, etc.
- **En computadoras de escritorio:** Copia automáticamente el enlace directo al portapapeles (`navigator.clipboard.writeText`) y muestra una notificación flotante (Toast).
- **Enlaces amigables con Slug (URL semántica):**
  Cada producto en `PRODUCTS_DATA` cuenta con una propiedad `slug` amigable (ej. `monedero-calato`, `billetera-bifold-broche`, `tarjetero-vertical`).
  El enlace generado por defecto es:
  `https://jhonparedes-pyp.github.io/CalatoLeathers/?producto=monedero-calato`
- **Compatibilidad con múltiples formatos en `getSharedProduct()`:
  La función detecta de manera inteligente cualquiera de los siguientes formatos:
  1. `?producto=monedero-calato` (Nombre o slug del producto)
  2. `?monedero=calato` o `?billetera=bifold` (Pares clave=valor intuitivos)
  3. `?producto=6` o `?id=6` (Retrocompatibilidad total con enlaces numéricos)
  4. `#monedero-calato` o `#producto-6` (Hashes en la URL)
- **Deep Linking y Apertura Automática:**
  Al abrirse cualquiera de estos enlaces, `checkSharedProductUrl()`:
  1. Si el producto pertenece a otra categoría, restablece el filtro a 'todos' para que el producto exista en el DOM.
  2. Invoca de inmediato `openProductModal(product.id)` para mostrar la ficha completa del producto en primer plano.
  3. Realiza un scroll suave (`scrollIntoView`) hasta centrar la tarjeta y activa un resplandor dorado (`highlight-shared`) para identificar la pieza.

---

## 6. Cómo Agregar un Nuevo Producto

1. Coloca las fotos originales en `assets/img/`.
2. Abre `js/products.js`.
3. Agrega un nuevo objeto al array `PRODUCTS_DATA` con un `id` único consecutivo.
4. Define las opciones de colores en `variants`.
5. Guarda y haz commit:
   ```bash
   git add js/products.js assets/img/
   git commit -m "Agregar nuevo producto X"
   git push origin main
   ```
6. En ~45 segundos el cambio estará activo en la web.

---

## 7. Consejos de Mantenimiento

- **Codificación de Archivos:** Guarda siempre los archivos `.html`, `.css` y `.js` en **UTF-8 sin BOM** para evitar corrupción de caracteres especiales en español.
- **Precios:** Para modificar precios rápidamente, basta con editar el campo `price` en `js/products.js`. La función `STORE_CONFIG.formatPrice()` añade automáticamente el símbolo de moneda (`S/`).
- **Caché en Navegadores:** Tras subir cambios con `git push`, recuerda recargar con `Ctrl + F5` (o en incógnito en móvil) para forzar la recarga de scripts actualizados.
