/* ========================================================
   CALATO LEATHERS - CATÁLOGO OFICIAL DE AUTOR
   Productos 100% auténticos elaborados por Jhon Paredes • El Artesano
   ======================================================== */

const STORE_CONFIG = {
  storeName: "Calato Leathers",
  artisanName: "Jhon Paredes • El Artesano",
  // Número oficial de WhatsApp de Jhon Paredes
  whatsappNumber: "51915222623",
  currency: "S/",
  // Estrategia de Marketing: Campaña con 40% de descuento en todo el catálogo
  discount: {
    active: true,
    percent: 40,
    label: "40% DSCTO"
  },
  // Función para formatear el precio en Soles (ej: 39 -> S/ 39, 70.8 -> S/ 70.80)
  formatPrice: function(price) {
    if (typeof price !== 'number') return price;
    const hasDecimals = !Number.isInteger(price);
    return this.currency + " " + price.toLocaleString("es-PE", { 
      minimumFractionDigits: hasDecimals ? 2 : 0, 
      maximumFractionDigits: 2 
    });
  }
};

/* Catálogo Oficial - Fotos 100% Originales y Enlaces Amigables (slug) */
const PRODUCTS_DATA = [
  {
    id: 1,
    slug: "billetera-bifold-broche",
    name: "Billetera Bifold Compacta con Solapa y Broche",
    category: "billeteras",
    categoryLabel: "Billeteras de Hombre",
    originalPrice: 118,
    price: 70.80,
    discountPercent: 40,
    salesCount: 4,
    image: "assets/img/billetera-bifold-broche-frontal.png",
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
    tag: "100% Hecha a Mano • Jhon Paredes",
    gallery: [
      "assets/img/billetera-bifold-broche-frontal.png",
      "assets/img/billetera-bifold-broche-abierta.png",
      "assets/img/billetera-bifold-broche-posterior.png"
    ],
    shortDesc: "Diseño bifold minimalista en cuero genuino bitono con solapa de broche en latón antiguo. Hecha 100% a mano por Jhon Paredes • El Artesano.",
    fullDesc: "Billetera bifold compacta y minimalista de alta gama, diseñada y elaborada íntegramente a mano por Jhon Paredes • El Artesano. Cuero vacuno legítimo de primera selección. Su broche de presión metálico en latón antiguo mantiene el contenido siempre seguro sin añadir volumen innecesario en el bolsillo. Cosida punto a punto con técnica tradicional de dos agujas e hilo encerado reforzado para durar décadas.",
    specs: [
      "Elaborada 100% a mano por Jhon Paredes • El Artesano",
      "Cuero vacuno genuino de primera flor con curtido vegetal",
      "Colores disponibles bajo pedido: Caramelo original, Negro azabache, Verde olivo oscuro y Azul marino profundo",
      "Solapa de cierre seguro con broche de presión metálico en latón envejecido",
      "Capacidad interior para 6 a 8 tarjetas y billetes doblados",
      "Costura tradicional a dos agujas (saddle stitch) con hilo encerado resistente",
      "Bordes biselados, pulidos y sellados a mano con ceras naturales",
      "Perfil Slim ultracompacto: cabe cómodamente en bolsillo frontal o posterior",
      "Garantía de confección artesanal directa de taller Calato Leathers"
    ]
  },
  {
    id: 2,
    slug: "billetera-clasica-negra",
    name: "Billetera Clásica Bifold Cuero Negro",
    category: "billeteras",
    categoryLabel: "Billeteras de Hombre",
    originalPrice: 89,
    price: 53.40,
    discountPercent: 40,
    salesCount: 3,
    image: "assets/img/billetera-negra-calato-exterior.jpg",
    variants: [
      {
        id: "negro",
        name: "Negro Azabache (Foto Original)",
        hex: "#1D1A18",
        thread: "Hilo Negro / Crema"
      },
      {
        id: "marron",
        name: "Marrón Cuero Clásico",
        hex: "#5C3A21",
        thread: "Hilo Crema Marfil"
      },
      {
        id: "verde",
        name: "Verde Olivo Oscuro",
        hex: "#2E3D2A",
        thread: "Hilo Crema Marfil"
      },
      {
        id: "azul",
        name: "Azul Marino Profundo",
        hex: "#1A283B",
        thread: "Hilo Crema en Contraste o Hilo Azul"
      }
    ],
    tag: "Sello Calato en Relieve",
    gallery: [
      "assets/img/billetera-negra-calato-exterior.jpg",
      "assets/img/billetera-negra-calato-interior.jpg"
    ],
    shortDesc: "Cuero vacuno legítimo con esquinas redondeadas anti-desgaste y sello oficial Calato grabado en bajo relieve. 100% cosida a mano por Jhon Paredes • El Artesano.",
    fullDesc: "Elegancia, sobriedad y máxima durabilidad. Diseñada y elaborada íntegramente a mano por Jhon Paredes • El Artesano con cuero vacuno legítimo de primera flor. Cuenta con el emblema circular oficial Calato grabado a fuego/presión en el exterior y firma de marca en el interior. Sus esquinas redondeadas previenen el deterioro al deslizarla en el bolsillo y sus ranuras curvas interiores permiten retirar las tarjetas con suavidad sin esfuerzo.",
    specs: [
      "Elaborada 100% a mano por Jhon Paredes • El Artesano",
      "Cuero legítimo vacuno de primera flor (poro auténtico y tacto firme)",
      "Sello oficial 'Calato' grabado en bajo relieve en exterior e interior",
      "Esquinas redondeadas anatómicas que evitan deformaciones y desgaste",
      "4 ranuras curvas ergonómicas para extracción rápida de tarjetas",
      "2 compartimentos ocultos interiores para billetes doblados y recibos",
      "Capacidad total para 6 a 10 tarjetas y efectivo",
      "Costura artesanal a dos agujas con hilo encerado de alta resistencia",
      "Bordes y cantos biselados, teñidos y sellados a mano",
      "Garantía de cuero 100% auténtico peruano"
    ]
  },
  {
    id: 3,
    slug: "tarjetero-vertical",
    name: "Tarjetero Bifold Vertical Minimalista",
    category: "tarjeteros",
    categoryLabel: "Tarjeteros de Cuero",
    originalPrice: 50,
    price: 30,
    discountPercent: 40,
    salesCount: 4,
    image: "assets/img/tarjetero-vertical-cognac.jpg",
    variants: [
      {
        id: "cognac",
        name: "Coñac / Whiskey Vintage (Foto Original)",
        hex: "#C66827",
        thread: "Hilo Crema Grueso"
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
        thread: "Hilo Crema Marfil"
      },
      {
        id: "azul",
        name: "Azul Marino Profundo",
        hex: "#1A283B",
        thread: "Hilo Crema en Contraste o Hilo Azul"
      }
    ],
    tag: "100% Hecho a Mano • Jhon Paredes",
    gallery: [
      "assets/img/tarjetero-vertical-cognac.jpg"
    ],
    shortDesc: "Tarjetero vertical en cuero vacuno pull-up con ranuras ergonómicas onduladas y costura a dos agujas. Hecho 100% a mano por Jhon Paredes.",
    fullDesc: "Máxima practicidad y elegancia en el menor volumen posible. Este tarjetero bifold de orientación vertical está confeccionado artesanalmente a mano por Jhon Paredes con cuero vacuno legítimo de tacto graso / pull-up, que desarrollará una pátina hermosa con el uso diario. Sus ranuras frontales con corte ondulado ergonómico facilitan retirar tus tarjetas de crédito o identificación con suavidad. Cosido punto a punto a mano con técnica tradicional saddle stitch e hilo encerado reforzado.",
    specs: [
      "Elaborado 100% a mano por Jhon Paredes • El Artesano",
      "Cuero vacuno legítimo de primera flor con acabado pull-up",
      "Orientación vertical compacta: cabe cómodamente en bolsillo delantero de camisa o pantalón",
      "4 ranuras ergonómicas con corte en onda para extracción rápida de tarjetas",
      "2 compartimentos interiores amplios para billetes doblados o tarjetas secundarias",
      "Capacidad recomendada para 4 a 8 tarjetas y efectivo doblado",
      "Costura tradicional a dos agujas con hilo encerado grueso",
      "Cantos biselados, bruñidos y sellados a mano con ceras naturales",
      "Garantía de confección artesanal directa de taller Calato Leathers"
    ]
  },
  {
    id: 4,
    slug: "tarjetero-horizontal",
    name: "Tarjetero Bifold Horizontal Clásico",
    category: "tarjeteros",
    categoryLabel: "Tarjeteros de Cuero",
    originalPrice: 50,
    price: 30,
    discountPercent: 40,
    salesCount: 4,
    image: "assets/img/tarjetero-horizontal-interior.jpg",
    variants: [
      {
        id: "cognac",
        name: "Coñac / Whiskey Vintage (Foto Original)",
        hex: "#C66827",
        thread: "Hilo Crema Grueso"
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
        thread: "Hilo Crema Marfil"
      },
      {
        id: "azul",
        name: "Azul Marino Profundo",
        hex: "#1A283B",
        thread: "Hilo Crema en Contraste o Hilo Azul"
      }
    ],
    tag: "Cuero Vacuno Pull-up • Jhon Paredes",
    gallery: [
      "assets/img/tarjetero-horizontal-interior.jpg",
      "assets/img/tarjetero-horizontal-exterior.jpg",
      "assets/img/tarjetero-horizontal-cognac.jpg"
    ],
    shortDesc: "Tarjetero horizontal en cuero vacuno pull-up. Ranuras semicirculares y costura perimetral artesanal a dos agujas por Jhon Paredes.",
    fullDesc: "Diseño clásico, sobrio y de gran carácter. Elaborado íntegramente a mano por el artesano Jhon Paredes con cuero vacuno auténtico de grano vivo. Su apertura horizontal permite acceso inmediato a tarjetas gracias a sus cortes semicirculares pulidos. El reverso exterior exhibe toda la riqueza natural y el jaspeado del cuero genuino, enmarcado por una sólida costura perimetral a mano con hilo encerado. Delgado, liviano y fabricado para durar toda la vida.",
    specs: [
      "Elaborado 100% a mano por Jhon Paredes • El Artesano",
      "Cuero vacuno auténtico seleccionado con acabado graso y veteado natural",
      "Orientación bifold horizontal ultraplana",
      "Ranuras interiores semicirculares para deslizar y retirar tarjetas con el pulgar",
      "2 bolsillos interiores principales + espacio oculto para billetes doblados",
      "Capacidad recomendada para 4 a 8 tarjetas y billetes",
      "Costura perimetral tradicional a dos agujas con hilo encerado",
      "Bordes y cantos sellados, pulidos y encerados a mano",
      "Hecho a mano en Perú con insumos seleccionados"
    ]
  },
  {
    id: 5,
    slug: "billetera-mujer-monedero",
    name: "Billetera Trifold para Mujer con Monedero",
    category: "billeteras",
    categoryLabel: "Billeteras de Mujer",
    originalPrice: 130,
    price: 78,
    discountPercent: 40,
    salesCount: 1,
    image: "assets/img/billetera-mujer-monedero-cerrada.jpg",
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
        thread: "Hilo Crema Marfil"
      },
      {
        id: "azul",
        name: "Azul Marino Profundo",
        hex: "#1A283B",
        thread: "Hilo Crema en Contraste o Hilo Azul"
      }
    ],
    tag: "Con Monedero • Jhon Paredes",
    gallery: [
      "assets/img/billetera-mujer-monedero-cerrada.jpg",
      "assets/img/billetera-mujer-monedero-abierta.jpg"
    ],
    shortDesc: "Diseño trifold femenino en cuero vacuno legítimo con solapa ondulada, monedero integrado de fuelle y ranuras curvas. Hecha 100% a mano por Jhon Paredes.",
    fullDesc: "Elegancia, versatilidad y practicidad en una sola pieza de autor. Esta billetera trifold para mujer está diseñada y elaborada íntegramente a mano por el artesano Jhon Paredes utilizando cuero vacuno legítimo de primera calidad. Su diseño ergonómico incorpora una solapa exterior de corte ondulado con broche de presión metálico seguro. Al abrirse, despliega tres paneles funcionales: compartimento para tarjetas con ranuras onduladas, un monedero central con solapa para monedas o llaves, y un amplio espacio longitudinal para billetes extendidos.",
    specs: [
      "Elaborada 100% a mano por Jhon Paredes • El Artesano",
      "Cuero vacuno legítimo de grano superior",
      "Estructura trifold compacta de 3 paneles de apertura completa",
      "Monedero central incorporado con solapa propia y broche para monedas y llaves",
      "3 ranuras curvas anatómicas para tarjetas de acceso rápido",
      "Compartimento largo superior para billetes extendidos sin doblar",
      "Cierre principal con broche de presión metálico inoxidable de alta durabilidad",
      "Costura tradicional a dos agujas (saddle stitch) con hilo encerado resistente",
      "Cantos biselados, pulidos y sellados a mano con ceras naturales",
      "Garantía de confección artesanal directa de taller Calato Leathers"
    ]
  },
  {
    id: 6,
    slug: "monedero-calato",
    name: "Monedero Calato",
    category: "monederos",
    categoryLabel: "Monederos de Cuero",
    originalPrice: 18,
    price: 10.80,
    discountPercent: 40,
    salesCount: 8,
    image: "assets/img/monedero-calato-1.jpg",
    variants: [
      {
        id: "chocolate",
        name: "Marrón Chocolate Profundo (Foto Original)",
        hex: "#422415",
        thread: "Hilo Tostado / Café"
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
        thread: "Hilo Crema Marfil"
      },
      {
        id: "azul",
        name: "Azul Marino Profundo",
        hex: "#1A283B",
        thread: "Hilo Crema en Contraste o Hilo Azul"
      }
    ],
    tag: "100% Hecho a Mano • Jhon Paredes",
    gallery: [
      "assets/img/monedero-calato-1.jpg",
      "assets/img/monedero-calato-2.jpg",
      "assets/img/monedero-calato-3.jpg",
      "assets/img/monedero-calato-4.jpg"
    ],
    shortDesc: "Monedero de bolsillo en cuero genuino vacuno con sello oficial Calato y broche de presión en latón envejecido. Elaborado 100% a mano por Jhon Paredes • El Artesano.",
    fullDesc: "Accesorio compacto, resistente y práctico para el día a día. Elaborado íntegramente a mano por el artesano Jhon Paredes en cuero genuino vacuno de primera flor. Cuenta con una solapa triangular con el sello oficial 'CALATO' grabado a presión y broche metálico en latón antiguo para un cierre seguro. Sus laterales están cosidos punto a punto a mano con hilo encerado reforzado y cantos pulidos con ceras naturales.",
    specs: [
      "Elaborado 100% a mano por Jhon Paredes • El Artesano",
      "Cuero genuino vacuno de primera flor",
      "Sello oficial 'CALATO' grabado en bajo relieve en la tapa",
      "Cierre seguro con broche de presión metálico en latón envejecido",
      "Costura artesanal lateral a dos agujas con hilo encerado de alta resistencia",
      "Cantos biselados, pulidos y sellados a mano",
      "Tamaño de bolsillo ultracompacto para monedas, billetes doblados o llaves",
      "Garantía de confección artesanal directa de taller Calato Leathers"
    ]
  },
  {
    id: 7,
    slug: "billetera-minimalista-solapa",
    name: "Billetera Minimalista con Solapa",
    category: "billeteras",
    categoryLabel: "Billeteras de Hombre",
    originalPrice: 65,
    price: 39,
    discountPercent: 40,
    salesCount: 3,
    image: "assets/img/billetera-minimalista-solapa-1.jpeg",
    variants: [
      {
        id: "marron-oscuro",
        name: "Marrón Oscuro (Foto Original)",
        hex: "#3D2314",
        thread: "Hilo Café / Tostado"
      },
      {
        id: "negro",
        name: "Negro Azabache",
        hex: "#1D1A18",
        thread: "Hilo Negro o Crema"
      }
    ],
    tag: "100% Hecha a Mano • Jhon Paredes",
    gallery: [
      "assets/img/billetera-minimalista-solapa-1.jpeg",
      "assets/img/billetera-minimalista-solapa-2.jpeg"
    ],
    shortDesc: "Diseño minimalista compacto con solapa envolvente en cuero vacuno legítimo marrón oscuro. Elaborada 100% a mano por Jhon Paredes • El Artesano.",
    fullDesc: "Elegancia minimalista y practicidad en su máxima expresión. Diseñada y elaborada íntegramente a mano por el artesano Jhon Paredes en cuero vacuno legítimo de primera calidad en tono marrón oscuro profundo. Su solapa envolvente protege tus pertenencias manteniendo un perfil ultradelgado y ligero, ideal para llevar en el bolsillo delantero sin bulto. Capacidad optimizada para tarjetas y billetes doblados, con costura artesanal de alta durabilidad.",
    specs: [
      "Elaborada 100% a mano por Jhon Paredes • El Artesano",
      "Cuero vacuno genuino de primera flor en tono marrón oscuro profundo",
      "Solo 2 colores exclusivos disponibles: Marrón Oscuro original y Negro azabache",
      "Solapa envolvente de protección y perfil ultra-slim de bolsillo",
      "Capacidad recomendada para 4 a 6 tarjetas y billetes doblados",
      "Costura artesanal tradicional a dos agujas con hilo encerado resistente",
      "Bordes biselados, pulidos y sellados a mano con ceras naturales",
      "Garantía de confección artesanal directa de taller Calato Leathers"
    ]
  }
];
