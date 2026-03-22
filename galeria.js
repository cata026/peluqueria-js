// proyectos.js: genera las "tarjetas" (pins) dentro del contenedor #feed

// Lista de imágenes de ejemplo: cada objeto tiene url y título
const imagenes = [
  { url: "", titulo: "Naturaleza" },
  { url: "../imagenes/cohete.jpg", titulo: "Ciudad" },
  { url: "../imagenes/pagweb.jpg", titulo: "Página Web" },
  { url: "../imagenes/bd.jpg", titulo: "Esquema Base de datos" },
  { url: "../imagenes/prototipocohete.jpg", titulo: "Prototipo Cohete" },
  { url: "../imagenes/coheteespacial.jpg", titulo: "Cohete a escala" },
  { url: "../imagenes/cohete.jpg", titulo: "Moda" },
  { url: "../imagenes/cohete.jpg", titulo: "Animales" }
];

// Referencia al contenedor del feed (donde se van a insertar los pins)
// Es importante que el elemento exista en el DOM; si no, evitamos errores.
const feed = document.getElementById('feed');

if (!feed) {
  // Si no existe el contenedor, mostramos una advertencia para facilitar debug.
  console.warn('proyectos.js: elemento con id "feed" no encontrado.');
}

/**
 * crearPin(imagen)
 * - Crea un elemento DOM .pin a partir de un objeto imagen {url, titulo}
 * - La estructura contiene una imagen y un bloque .info con título y descripción.
 * - Se devuelve el elemento creado para que el llamador pueda insertarlo en el DOM.
 */
function crearPin(imagen) {
  const pin = document.createElement('div');
  pin.className = 'pin';

  // Si la URL está vacía, podemos usar una imagen de reserva o un placeholder
  const src = imagen.url && imagen.url.trim() !== '' ? imagen.url : '../imagenes/placeholder.png';

  pin.innerHTML = `
    <img src="${src}" alt="${imagen.titulo}">
    <div class="info">
      <div class="titulo">${imagen.titulo}</div>
      <p>Descripción de ejemplo.</p>
    </div>
  `;
  return pin;
}

// Insertar las imágenes en el feed (si existe)
if (feed) {
  imagenes.forEach(img => {
    const pin = crearPin(img);
    feed.appendChild(pin);
  });
}