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
  // Función para formatear el precio en Soles (ej: 120 -> S/ 120.00)
  formatPrice: function(price) {
    return this.currency + " " + price.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
};

/* Catálogo Oficial - Solo Creaciones Originales */
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Billetera Bifold Compacta con Solapa y Broche",
    category: "billeteras",
    categoryLabel: "Billeteras de Hombre",
    price: 118,
    tag: "100% Hecha a Mano • Jhon Paredes",
    image: "assets/img/billetera-bifold-broche-frontal.png",
    gallery: [
      "assets/img/billetera-bifold-broche-frontal.png",
      "assets/img/billetera-bifold-broche-abierta.png",
      "assets/img/billetera-bifold-broche-posterior.png"
    ],
    shortDesc: "Diseño bifold minimalista en cuero genuino bitono (caramelo y chocolate) con solapa de broche en latón antiguo. Hecha 100% a mano por Jhon Paredes • El Artesano.",
    fullDesc: "Billetera bifold compacta y minimalista de alta gama, diseñada y elaborada íntegramente a mano por Jhon Paredes • El Artesano. Combina dos tonalidades de cuero vacuno legítimo de primera selección: un cálido tono miel/caramelo con marrón chocolate oscuro. Su broche de presión metálico en latón antiguo mantiene el contenido siempre seguro sin añadir volumen innecesario en el bolsillo. Cosida punto a punto con técnica tradicional de dos agujas e hilo encerado reforzado para durar décadas.",
    specs: [
      "Elaborada 100% a mano por Jhon Paredes • El Artesano",
      "Cuero vacuno genuino de primera flor con curtido vegetal",
      "Combinación bicolor exclusiva: cuero chocolate profundo y tono caramelo/miel",
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
    name: "Billetera Clásica Bifold Cuero Negro",
    category: "billeteras",
    categoryLabel: "Billeteras de Hombre",
    price: 89,
    tag: "Sello Calato en Relieve",
    image: "assets/img/billetera-negra-calato-exterior.jpg",
    gallery: [
      "assets/img/billetera-negra-calato-exterior.jpg",
      "assets/img/billetera-negra-calato-interior.jpg"
    ],
    shortDesc: "Cuero vacuno legítimo negro con esquinas redondeadas anti-desgaste y sello oficial Calato grabado en bajo relieve. 100% cosida a mano por Jhon Paredes • El Artesano.",
    fullDesc: "Elegancia, sobriedad y máxima durabilidad. Diseñada y elaborada íntegramente a mano por Jhon Paredes • El Artesano con cuero vacuno legítimo de primera flor en tono negro azabache. Cuenta con el emblema circular oficial Calato grabado a fuego/presión en el exterior y firma de marca en el interior. Sus esquinas redondeadas previenen el deterioro al deslizarla en el bolsillo y sus ranuras curvas interiores permiten retirar las tarjetas con suavidad sin esfuerzo.",
    specs: [
      "Elaborada 100% a mano por Jhon Paredes • El Artesano",
      "Cuero legítimo vacuno de primera flor (poro auténtico y tacto firme)",
      "Sello oficial 'Calato' grabado en bajo relieve en exterior e interior",
      "Esquinas redondeadas anatómicas que evitan deformaciones y desgaste",
      "4 ranuras curvas ergonómicas para extracción rápida de tarjetas",
      "2 compartimentos ocultos interiores para billetes doblados y recibos",
      "Capacidad total para 6 a 10 tarjetas y efectivo",
      "Costura artesanal a dos agujas con hilo encerado negro de alta resistencia",
      "Bordes y cantos biselados, teñidos y sellados a mano",
      "Garantía de cuero 100% auténtico peruano"
    ]
  },
  {
    id: 3,
    name: "Tarjetero Bifold Vertical Minimalista",
    category: "tarjeteros",
    categoryLabel: "Tarjeteros de Cuero",
    price: 50,
    tag: "100% Hecho a Mano • Jhon Paredes",
    image: "assets/img/tarjetero-vertical-cognac.jpg",
    gallery: [
      "assets/img/tarjetero-vertical-cognac.jpg"
    ],
    shortDesc: "Tarjetero vertical en cuero vacuno pull-up tono cognac con ranuras ergonómicas onduladas y costura a dos agujas en hilo crema. Hecho 100% a mano por Jhon Paredes.",
    fullDesc: "Máxima practicidad y elegancia en el menor volumen posible. Este tarjetero bifold de orientación vertical está confeccionado artesanalmente a mano por Jhon Paredes con cuero vacuno legítimo de tacto graso / pull-up en tono cognac, que desarrollará una pátina hermosa con el uso diario. Sus ranuras frontales con corte ondulado ergonómico facilitan retirar tus tarjetas de crédito o identificación con suavidad. Cosido punto a punto a mano con técnica tradicional saddle stitch e hilo encerado reforzado.",
    specs: [
      "Elaborado 100% a mano por Jhon Paredes • El Artesano",
      "Cuero vacuno legítimo de primera flor con acabado pull-up color cognac",
      "Orientación vertical compacta: cabe cómodamente en bolsillo delantero de camisa o pantalón",
      "4 ranuras ergonómicas con corte en onda para extracción rápida de tarjetas",
      "2 compartimentos interiores amplios para billetes doblados o tarjetas secundarias",
      "Capacidad recomendada para 4 a 8 tarjetas y efectivo doblado",
      "Costura tradicional a dos agujas con hilo encerado grueso en tono crema",
      "Cantos biselados, bruñidos y sellados a mano con ceras naturales",
      "Garantía de confección artesanal directa de taller Calato Leathers"
    ]
  },
  {
    id: 4,
    name: "Tarjetero Bifold Horizontal Clásico",
    category: "tarjeteros",
    categoryLabel: "Tarjeteros de Cuero",
    price: 50,
    tag: "Cuero Vacuno Pull-up • Jhon Paredes",
    image: "assets/img/tarjetero-horizontal-interior.jpg",
    gallery: [
      "assets/img/tarjetero-horizontal-interior.jpg",
      "assets/img/tarjetero-horizontal-exterior.jpg",
      "assets/img/tarjetero-horizontal-cognac.jpg"
    ],
    shortDesc: "Tarjetero horizontal en cuero vacuno pull-up veteado color cognac. Ranuras semicirculares y costura perimetral artesanal a dos agujas por Jhon Paredes.",
    fullDesc: "Diseño clásico, sobrio y de gran carácter. Elaborado íntegramente a mano por el artesano Jhon Paredes con cuero vacuno auténtico de grano vivo en tono coñac cálido. Su apertura horizontal permite acceso inmediato a tarjetas gracias a sus cortes semicirculares pulidos. El reverso exterior exhibe toda la riqueza natural y el jaspeado del cuero genuino, enmarcado por una sólida costura perimetral a mano con hilo encerado. Delgado, liviano y fabricado para durar toda la vida.",
    specs: [
      "Elaborado 100% a mano por Jhon Paredes • El Artesano",
      "Cuero vacuno auténtico seleccionado con acabado graso y veteado natural",
      "Orientación bifold horizontal ultraplana",
      "Ranuras interiores semicirculares para deslizar y retirar tarjetas con el pulgar",
      "2 bolsillos interiores principales + espacio oculto para billetes doblados",
      "Capacidad recomendada para 4 a 8 tarjetas y billetes",
      "Costura perimetral tradicional a dos agujas con hilo encerado marfil",
      "Bordes y cantos sellados, pulidos y encerados a mano",
      "Hecho a mano en Perú con insumos seleccionados"
    ]
  },
  {
    id: 5,
    name: "Billetera Trifold para Mujer con Monedero",
    category: "billeteras",
    categoryLabel: "Billeteras de Mujer",
    price: 130,
    tag: "Con Monedero • Jhon Paredes",
    image: "assets/img/billetera-mujer-monedero-cerrada.jpg",
    gallery: [
      "assets/img/billetera-mujer-monedero-cerrada.jpg",
      "assets/img/billetera-mujer-monedero-abierta.jpg"
    ],
    shortDesc: "Diseño trifold femenino en cuero vacuno legítimo color miel/caramelo con solapa ondulada, monedero integrado de fuelle y ranuras curvas. Hecha 100% a mano por Jhon Paredes.",
    fullDesc: "Elegancia, versatilidad y practicidad en una sola pieza de autor. Esta billetera trifold para mujer está diseñada y elaborada íntegramente a mano por el artesano Jhon Paredes utilizando cuero vacuno legítimo de primera calidad en tono caramelo miel con acabado encerado pull-up. Su diseño ergonómico incorpora una solapa exterior de corte ondulado con broche de presión metálico seguro. Al abrirse, despliega tres paneles funcionales: compartimento para tarjetas con ranuras onduladas, un monedero central con solapa para monedas o llaves, y un amplio espacio longitudinal para billetes extendidos.",
    specs: [
      "Elaborada 100% a mano por Jhon Paredes • El Artesano",
      "Cuero vacuno legítimo de grano superior en tono caramelo/miel",
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
    name: "Monedero Calato",
    category: "monederos",
    categoryLabel: "Monederos de Cuero",
    price: 18,
    tag: "100% Hecho a Mano • Jhon Paredes",
    image: "assets/img/monedero-calato-1.jpg",
    gallery: [
      "assets/img/monedero-calato-1.jpg",
      "assets/img/monedero-calato-2.jpg",
      "assets/img/monedero-calato-3.jpg",
      "assets/img/monedero-calato-4.jpg"
    ],
    shortDesc: "Monedero de bolsillo en cuero genuino vacuno color chocolate con sello oficial Calato y broche de presión en latón envejecido. Elaborado 100% a mano por Jhon Paredes • El Artesano.",
    fullDesc: "Accesorio compacto, resistente y práctico para el día a día. Elaborado íntegramente a mano por el artesano Jhon Paredes en cuero genuino vacuno de primera flor en tono café chocolate. Cuenta con una solapa triangular con el sello oficial 'CALATO' grabado a presión y broche metálico en latón antiguo para un cierre seguro. Sus laterales están cosidos punto a punto a mano con hilo encerado reforzado y cantos pulidos con ceras naturales.",
    specs: [
      "Elaborado 100% a mano por Jhon Paredes • El Artesano",
      "Cuero genuino vacuno de primera flor en tono chocolate",
      "Sello oficial 'CALATO' grabado en bajo relieve en la tapa",
      "Cierre seguro con broche de presión metálico en latón envejecido",
      "Costura artesanal lateral a dos agujas con hilo encerado de alta resistencia",
      "Cantos biselados, pulidos y sellados a mano",
      "Tamaño de bolsillo ultracompacto para monedas, billetes doblados o llaves",
      "Garantía de confección artesanal directa de taller Calato Leathers"
    ]
  }
];
