const formLogin=document.getElementById("formlogin"); //agarramos el formulario

if(formLogin){ //si existe
    formLogin.addEventListener("submit", function(c){ //escucha el boton que manda info
        c.preventDefault() //prevenir q la pagina se recargue
        let emailIngresado=document.getElementById("emailLogin").value; //agarramos los elementos necesarios
        let contrasenaIngresada=document.getElementById("contrasenaLogin").value;

        let usuariosGuardados= JSON.parse(localStorage.getItem("usuarios")) || [] //traemos los usuarios guardados en localstorage y los guardamos en una variable
        //json.parse convierte texto en objeto, si no hay nada crea un array vacio

        let usuarioExiste=usuariosGuardados.find( //find metodo para encontrar el 1er elemento q cumpla con una condicion especifica
            usuario => usuario.email === emailIngresado && usuario.contrasena === contrasenaIngresada
            //usuario es el nombre q le damos a c/ elemento de la lista mientras find los revisa
        )
        if(usuarioExiste){
            sessionStorage.setItem("usuarioActivo", "true") //guardamos la sesion activa
            sessionStorage.setItem ("nombreUsuario", usuarioExiste.nombre)
            sessionStorage.setItem("usuarioActivo", emailIngresado)
            sessionStorage.setItem("emailUsuarioActivo", emailIngresado);

            Swal.fire({
                icon: 'okey',
                title: 'Bienvenido/a',
                text: 'Encantados de conocerte'+usuarioExiste.nombre,
                confirmButtonColor: '#d630d6',
                confirmButtonText: 'Ir al inicio'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../templates/inicio.html"; // Lo mando al inicio
                }
            });
            return;
        }else{
            Swal.fire({
                icon: 'warning',
                title: '¡Alto ahí!',
                text: 'Correo o contrasela incorrectos, por favor intente nuevamente',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ir a Iniciar Sesión'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../templates/iniciosesion.html"; // Lo mando al login
                }
            });
        }
    })
}