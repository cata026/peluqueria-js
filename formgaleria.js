const modal = document.getElementById("modalFormulario");

function abrirFormulario() {
  modal.style.display = "block";
}

function cerrarModal() {
  modal.style.display = "none";
}

// Cierra el modal si el usuario hace clic fuera del contenido
window.onclick = function(event) {
  if (event.target === modal) {
    cerrarModal();
  }
}

// Captura y procesa los datos del formulario
document.getElementById("formularioProyecto").addEventListener("submit", function(e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("imagen").value;
  const categoria = document.getElementById("categoria").value;

  // Aquí puedes agregar lógica para mostrar el nuevo proyecto en el grid
  console.log("Nuevo proyecto:", {
    titulo,
    descripcion,
    imagen,
    categoria
  });

  cerrarModal();
});

function mostrarVistaPrevia() {
  const url = document.getElementById('imagen').value;
  const preview = document.getElementById('preview');

  if (url && url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
    preview.src = url;
    preview.style.display = 'block';
  } else {
    preview.style.display = 'none';
  }
}
