let serviciosGlobales = [];
const diasCerrado = [0, 1];

function iniciarSesion(nombreUsuario) {
    // Guardamos el nombre del usuario en el LocalStorage de su navegador
    localStorage.setItem('usuarioLogueado', nombreUsuario); 
    // Mostramos una alerta (acá podrías meter SweetAlert2 después)
    alert(`¡Bienvenida/o a Debora World, ${nombreUsuario}!`); 
    // Recargamos la interfaz para que se habiliten las reservas
    verificarEstadoSesion(); 
}