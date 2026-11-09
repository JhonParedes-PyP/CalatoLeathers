const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://jhonparedes-pyp.github.io/CalatoLeathers';

// Cargar y evaluar js/products.js exponiendo las constantes
let productsCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'products.js'), 'utf8');
productsCode += '\nglobalThis.__EXTRACTED_PRODUCTS = PRODUCTS_DATA;\n';

const vm = require('vm');
const context = vm.createContext({});
vm.runInContext(productsCode, context);
const products = context.__EXTRACTED_PRODUCTS;

if (!products || !products.length) {
  console.error('No se pudieron cargar los productos de js/products.js');
  process.exit(1);
}

function buildProductHtml(p, relativeToRoot) {
  const imageUrl = `${BASE_URL}/${p.image}`;
  const targetUrl = `${BASE_URL}/producto/${p.slug}/`;
  const redirectTarget = `${relativeToRoot}?producto=${p.slug}`;
  const imageType = p.image.endsWith('.png') ? 'image/png' : 'image/jpeg';

  const priceText = p.originalPrice && p.originalPrice > p.price
    ? `Oferta: S/ ${p.price} (Antes S/ ${p.originalPrice} - 40% DSCTO)`
    : `Precio: S/ ${p.price}`;

  const salesText = p.salesCount ? ` • 🔥 ${p.salesCount} ${p.salesCount === 1 ? 'vendido' : 'vendidos'}` : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.name} | Calato Leathers</title>
  <meta name="description" content="${p.shortDesc} • ${priceText}${salesText}">

  <!-- Open Graph para WhatsApp y Redes Sociales con la FOTO REAL DEL PRODUCTO -->
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="Calato Leathers">
  <meta property="og:title" content="${p.name} • Calato Leathers">
  <meta property="og:description" content="${p.shortDesc} • ${priceText}${salesText}. Cuero 100% genuino hecho a mano por Jhon Paredes.">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:secure_url" content="${imageUrl}">
  <meta property="og:image:type" content="${imageType}">
  <meta property="og:image:alt" content="${p.name}">
  <meta property="og:url" content="${targetUrl}">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${p.name} • Calato Leathers">
  <meta name="twitter:description" content="${p.shortDesc} • ${priceText}${salesText}">
  <meta name="twitter:image" content="${imageUrl}">

  <link rel="icon" type="image/jpeg" href="${BASE_URL}/assets/img/logo-calato.jpg">

  <!-- Redirección automática inmediata al producto en la tienda -->
  <meta http-equiv="refresh" content="0; url=${redirectTarget}">
  <script>
    window.location.replace("${redirectTarget}");
  </script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #FAF7F2;
      color: #2C221E;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
      text-align: center;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      max-width: 380px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      border: 1px solid #EBE5DF;
      position: relative;
    }
    .badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: #B71C1C;
      color: white;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 20px;
      letter-spacing: 0.5px;
    }
    .sales-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: #FFF5EB;
      color: #B84A1C;
      border: 1px solid rgba(184, 74, 28, 0.25);
      font-weight: 700;
      font-size: 0.75rem;
      padding: 3px 9px;
      border-radius: 20px;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 1.25rem;
      margin: 0 0 8px 0;
      color: #2C221E;
    }
    p {
      color: #6E6259;
      font-size: 0.95rem;
      margin: 0 0 16px 0;
    }
    .pricing {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 10px;
      margin-bottom: 16px;
    }
    .price-curr {
      font-size: 1.6rem;
      font-weight: 800;
      color: #B84A1C;
    }
    .price-orig {
      font-size: 1.1rem;
      color: #8C827A;
      text-decoration: line-through;
      font-weight: 600;
    }
    .btn {
      display: inline-block;
      background: #A85D2A;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #8F4C1F;
    }
  </style>
</head>
<body>
  <div class="card">
    ${p.originalPrice && p.originalPrice > p.price ? '<span class="badge">-40% DSCTO</span>' : ''}
    ${p.salesCount ? `<span class="sales-badge">🔥 ${p.salesCount} ${p.salesCount === 1 ? 'vendido' : 'vendidos'}</span>` : ''}
    <img src="${imageUrl}" alt="${p.name}">
    <h1>${p.name}</h1>
    <div class="pricing">
      <span class="price-curr">S/ ${p.price}</span>
      ${p.originalPrice && p.originalPrice > p.price ? `<span class="price-orig">S/ ${p.originalPrice}</span>` : ''}
    </div>
    <p>${p.shortDesc}</p>
    <a class="btn" href="${redirectTarget}">Ver en Calato Leathers</a>
  </div>
</body>
</html>`;
}

const prodDir = path.join(__dirname, '..', 'producto');
if (!fs.existsSync(prodDir)) {
  fs.mkdirSync(prodDir, { recursive: true });
}

products.forEach(p => {
  const itemDir = path.join(prodDir, p.slug);
  if (!fs.existsSync(itemDir)) {
    fs.mkdirSync(itemDir, { recursive: true });
  }
  fs.writeFileSync(path.join(itemDir, 'index.html'), buildProductHtml(p, '../../'), 'utf8');
  fs.writeFileSync(path.join(prodDir, `${p.slug}.html`), buildProductHtml(p, '../'), 'utf8');
});

console.log(`Páginas generadas con éxito para ${products.length} productos en /producto/ con contador de ventas`);
