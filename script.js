class Usuario {
    constructor(nombre, email, contrasena, telefono) {
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.telefono=telefono
    }
}

const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
    formRegistro.addEventListener("submit", function(e) {
        e.preventDefault(); // Evitar que la página se recargue

        let nombre = document.getElementById("nombreRegistro").value;
        let email = document.getElementById("emailRegistro").value;
        let contrasena = document.getElementById("contrasenaRegistro").value;
        let telefono=parseInt( document.getElementById("telefonoRegistro").value);

        // Traemos los usuarios guardados o creamos un array vacío
        let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Validamos que el email no esté registrado ya
        const usuarioExiste = usuariosGuardados.some(u => u.email === email);
        if (usuarioExiste) {
            Swal.fire({
                icon:'error',
                title: 'Email Registrado',
                text: 'Este email ya está registrado, cambialo o inicia sesion',
                confirmButtonColor: '#d33'
            })
            return;
        }

        // Creo el usuario nuevo
        const nuevoUsuario = new Usuario(nombre, email, contrasena, telefono);
        usuariosGuardados.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

        Swal.fire({
                icon:'okey',
                title: 'Email Registrado correctamente',
                text: 'Ya eres parte de esta comunidad',
                confirmButtonColor: 'rgb(32, 80, 25)'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../templates/iniciosesion.html"; // Lo mando al login
                }
            });
            return;
    });
}