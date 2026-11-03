# Calato Leathers - Sitio Web de Catálogo y Ventas

Bienvenido a la página web de **Calato Leathers**. Diseñada especialmente para artesanos y marroquineros que desean exhibir sus productos de cuero con estilo premium y recibir pedidos directamente en **WhatsApp**.

---

## 🚀 ¿Cómo abrir la página web?

Simplemente haz **doble clic en el archivo `index.html`** y se abrirá en tu navegador favorito (Chrome, Edge, Firefox, Safari).

O si prefieres usar un servidor local con PowerShell:
```powershell
python -m http.server 8000
```
Y luego abre `http://localhost:8000` en tu navegador.

---

## 🛠️ ¿Cómo personalizar tus datos y productos?

Todo el contenido de tus productos y la configuración de WhatsApp se encuentra en un solo archivo: **`js/products.js`**.

### 1. Cambiar tu número de WhatsApp
Abre `js/products.js` y edita la primera sección:
```javascript
const STORE_CONFIG = {
  storeName: "Calato Leathers",
  // Escribe tu número con el código de país (sin el signo + ni espacios)
  // Ejemplo Colombia: 573001234567 | México: 5215512345678 | España: 34600000000
  whatsappNumber: "573001234567",
  currency: "$",
  ...
};
```

### 2. Agregar o Modificar Productos
En el mismo archivo `js/products.js`, encontrarás la lista `PRODUCTS_DATA`. Cada producto tiene este formato:

```javascript
{
  id: 1,
  name: "Nombre del Producto",
  category: "billeteras", // opciones: 'billeteras', 'cinturones', 'bolsos', 'accesorios'
  categoryLabel: "Billeteras & Tarjeteros",
  price: 85000,
  tag: "Más Vendido", // o "Nuevo", "Personalizable", etc.
  image: "https://url-de-tu-foto.jpg", // o una ruta local como "assets/fotos/billetera.jpg"
  shortDesc: "Breve resumen que se ve en la tarjeta.",
  fullDesc: "Descripción detallada del producto que se verá al abrirlo.",
  specs: [
    "Cuero 100% genuino",
    "Costura a mano",
    "Medidas: 11cm x 9cm"
  ]
}
```

### 3. Tus fotos y marca
Las imágenes que subiste ya están integradas:
- **Logo oficial de Calato:** Guardado en `assets/img/logo-calato.jpg` (visible en la barra superior, sección principal, pie de página y como icono de la pestaña del navegador).
- **Foto del artesano en el taller:** Guardada en `assets/img/artesano-jhon.png` (visible en la sección "Sobre Nosotros").

Para agregar fotos de tus productos:
Crea o usa la carpeta `assets/img/` y guarda las fotos de tus billeteras, cinturones, etc. Luego en `js/products.js` actualiza:
```javascript
image: "assets/img/mi-billetera.jpg",
```

---

## ✨ Características Principales

- **Diseño 100% Adaptable (Responsive):** Se ve impecable en teléfonos móviles, tablets y computadoras.
- **Catálogo Interactivo con Filtros:** Filtra por categorías (Billeteras, Cinturones, Bolsos, Accesorios) y buscador en tiempo real.
- **Modal de Detalle:** Muestra fotos grandes, especificaciones técnicas y beneficios del producto.
- **Carrito de Compras Integrado:** Permite al cliente sumar varios productos y cambiar cantidades.
- **Checkout Automático a WhatsApp:** Al hacer clic en "Pedir", genera un mensaje automático y estructurado con el nombre de los productos, cantidades y precio total listo para enviar a tu chat.
- **Botón Flotante de WhatsApp:** Acceso rápido para dudas y pedidos personalizados.
- **Elegancia Visual:** Tipografía serif de lujo (*Playfair Display*) combinada con diseño moderno, tonos tierra y cuero genuino.

---

## 🌐 Publicar en Internet Gratis

Puedes subir esta carpeta gratis a:
- **Netlify Drop** (arrastrar y soltar la carpeta en [netlify.com/drop](https://app.netlify.com/drop))
- **Vercel** o **GitHub Pages**
- Tu propio dominio y hosting (cPanel, Hostinger, etc.) simplemente subiendo los archivos.
