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
  }
];
