
let serviciosDisponibles = [];
const diasCerrados = [0, 1]; // Domingo y Lunes

// const horaNum = parseInt(hora.split(":")[0]);

// if (horaNum < 9 || horaNum >= 19) {
//     alert("Solo atendemos de 9 a 19 hs");
//     return;
// }

class Turno { constructor( nombre, servicio, fecha, hora, precioServicio){
    this.nombre=nombre;
    this.servicio=servicio;
    this.fecha=fecha;
    this.hora=hora;
    this.precio=precioServicio
    }
}


document.addEventListener("DOMContentLoaded", function(){
    botones()
    cargarServicios()

    const formulario = document.getElementById("formTurno");
    if (formulario) {
        formulario.addEventListener("submit",function(cliente){
        cliente.preventDefault();
        let fechaSeleccionada = document.getElementById("fecha").value;
        let fechaHoy = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

        if (fechaSeleccionada < fechaHoy) {
            Swal.fire({
                icon: 'error',
                title: 'Fecha inválida',
                text: 'No podés viajar al pasado. Elegí una fecha de hoy en adelante.',
                confirmButtonColor: '#ff7aa2'
        });
            return; // Corta la ejecución y no guarda el turno
        }
        let hora = document.getElementById("hora").value;

        const horaNum = parseInt(hora.split(":")[0]);

        if (horaNum < 9 || horaNum >= 19) {
            Swal.fire({
                icon: 'warning',
                title: '¡Alto ahí!',
                text: 'Solo atendemos de 9:00hs a 19:00hs, cualquier inconveniente contactanos',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ir a Contacto'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../templates/contacto.html"; // Lo mando al login
                }
            });
            return;
        }

        let usuarioLogueado = sessionStorage.getItem("usuarioActivo");

        if (!usuarioLogueado) {
            Swal.fire({
                icon: 'warning',
                title: '¡Alto ahí!',
                text: 'Tenés que iniciar sesión o registrarte para sacar un turno.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ir a Iniciar Sesión'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../templates/iniciosesion.html"; // Lo mando al login
                }
            });
            return; 
        }

        let nombre = document.getElementById("nombre").value
        let fecha = document.getElementById("fecha").value
        hora = document.getElementById("hora").value
        let servicioInput = document.querySelector('input[name="servicio"]:checked');
    
        if(!servicioInput){ 
            Swal.fire({
                icon:'error',
                title: 'Campo vacio',
                text: 'Por favor elige un servicio para continuar',
                confirmButtonColor: '#d33'
            })
            return;
        }

        let nombreServicio = servicioInput.value;
        let servicioEncontrado = serviciosDisponibles.find(s => s.nombre === nombreServicio);
        let precioServicio = servicioEncontrado ? servicioEncontrado.precio : 0;

        const fechaObj = new Date(fecha + 'T00:00:00');
        if (diasCerrados.includes(fechaObj.getDay())) {
            Swal.fire({
                icon:'error',
                title: 'Peluqueria Cerrada',
                text: 'Domingos y Lunes descansamos!! por favor elige otro dia :)',
                confirmButtonColor: '#d33'
            })
            return;
        }

        const emailUsuario=sessionStorage.getItem("emailUsuarioActivo")
        let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
        const ocupado = turnos.some(t => t.fecha === fecha && t.hora === hora);
        if (ocupado) return Swal.fire({
                icon:'error',
                title: 'Horario Reservado',
                text: 'Ese horario ya fue ocupado por otra persona, por favor elige otro',
                confirmButtonColor: '#d33'
            })
        const nuevoTurno= new Turno(nombre,nombreServicio,fecha,hora, precioServicio)
        nuevoTurno.emailCliente=emailUsuario

        turnos.push(nuevoTurno)

        localStorage.setItem("turnos", JSON.stringify(turnos))
    
        mensaje(nombre,fecha,hora,nombreServicio,precioServicio)
        formulario.reset()
    })
    }
    mostrarTurnosGuardados()

})

function DevolverOpcionesServicio(lista) {
    const contenedor = document.getElementById("contenedor-servicios");

    if(!contenedor)return;
    contenedor.innerHTML = "";

        lista.forEach(s => {
            const card = document.createElement("label");
            card.className = "card";
            card.innerHTML = `
                <input type="radio" name="servicio" value="${s.nombre}" required>
                <img src="${s.imagen}" alt="${s.nombre}">
                <p>${s.nombre}<br>$${s.precio}</p>
            `;
            contenedor.appendChild(card);
    });
    }

const buscador = document.getElementById("buscador");
if(buscador){
    buscador.addEventListener("input", () => {
        const textoBuscado = buscador.value.toLowerCase();
        // Filtramos el array global según lo que el usuario escribe
        const serviciosFiltrados = serviciosDisponibles.filter(servicio => 
            servicio.nombre.toLowerCase().includes(textoBuscado)
        );
        // Volvemos a dibujar solo los que coinciden
        DevolverOpcionesServicio(serviciosFiltrados);
    });
}   

async function cargarServicios() {
    const rta = await fetch('../servicios.json');
    serviciosDisponibles = await rta.json();
    DevolverOpcionesServicio(serviciosDisponibles); // Genera los botones dinámicamente
}

function filtrarPorPrecio(maxPrecio) {
    const filtrados = serviciosDisponibles.filter(s => s.precio <= maxPrecio);
    DevolverOpcionesServicio(filtrados);
}

const formulario=document.getElementById("formTurno")

    function mensaje(nombre,fecha,hora,servicio,precio){
    let contenedorTurno = document.createElement("div")
    contenedorTurno.className = "turno"

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Limpiamos la hora para comparar solo fechas
    
    const fechaTurno = new Date(fecha + "T00:00:00"); 

    if (fechaTurno < hoy) {
        contenedorTurno.classList.add("pasado"); // Si ya pasó, le pongo la clase gris
    }

    contenedorTurno.innerHTML = `
        <div class="turno-info">
            <p><strong>${nombre}</strong></p>
            <p>📅 ${fecha} | 🕐 ${hora}hs</p>
            <p>✂️ ${servicio} | $ ${precio}</p>
        </div>
        <button class="btn-cancelar">Cancelar</button>
    `
    let listaTurnos = document.getElementById("listaTurnos")
    if(listaTurnos){
        listaTurnos.appendChild(contenedorTurno)
    }
    // Evento para cancelar turno
    const btnCancel = contenedorTurno.querySelector(".btn-cancelar");
    if (btnCancel) {
    contenedorTurno.querySelector(".btn-cancelar").addEventListener("click", function(){
        cancelarTurno(nombre, fecha, hora, servicio)
        contenedorTurno.remove()
        })
    }
 }

 function cancelarTurno(nombre, fecha, hora, servicio){
    let turnos = JSON.parse(localStorage.getItem("turnos")) || []
    turnos = turnos.filter(turno => !(turno.nombre === nombre && turno.fecha === fecha && turno.hora === hora && turno.servicio === servicio))
    localStorage.setItem("turnos", JSON.stringify(turnos))
}

const btnProximos = document.getElementById("botonproxturno");
if (btnProximos) {
  btnProximos.addEventListener("click", function() {
    window.location.href = "misturnos.html";
  });
}

function mostrarTurnosGuardados() {
  const listaTurnos = document.getElementById("listaTurnos");
  if (!listaTurnos) return;

  const todosLosTurnos = JSON.parse(localStorage.getItem("turnos")) || [];
    const emailLogueado = sessionStorage.getItem("emailUsuarioActivo");

    // Solo los turnos que pertenecen al que inició sesión
    const turnos = todosLosTurnos.filter(t => t.emailCliente === emailLogueado);

  listaTurnos.innerHTML = "";
  if (turnos.length === 0) {
    listaTurnos.textContent = "No hay próximos turnos.";
    return;
  }

  turnos.forEach(turno =>
    mensaje(turno.nombre, turno.fecha, turno.hora, turno.servicio, turno.precio || 0)
  );
}


function botones (){
    const btnLogin=document.getElementById("loginlinks")
    const usuarioLogueado = sessionStorage.getItem ("usuarioActivo")

    if(usuarioLogueado&&btnLogin){
        btnLogin.textContent = "Cerrar Sesion"
        btnLogin.href="#"
        btnLogin.addEventListener ("click", (e) =>{
            e.preventDefault()
            sessionStorage.clear()
            window.location.href = "../templates/iniciosesion.html"
        })
    }
}

