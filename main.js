
let serviciosDisponibles = [];
const diasCerrados = [0, 1]; // Domingo y Lunes


class Turno { constructor( nombre, servicio, fecha, hora, precioServicio){
    this.nombre=nombre;
    this.servicio=servicio;
    this.fecha=fecha;
    this.hora=hora;
    this.precio=precioServicio
    }
}


document.addEventListener("DOMContentLoaded", function(){

    // let turnosGuardados = JSON.parse(localStorage.getItem("turnos")) || []

    // turnosGuardados.forEach(turno => {
    //     mensaje(turno.nombre, turno.fecha, turno.hora, turno.servicio)
    // });

    cargarServicios()

    const formulario = document.getElementById("formTurno");
    if (formulario) {
        formulario.addEventListener("submit",function(cliente){
        cliente.preventDefault();
        let nombre = document.getElementById("nombre").value
        let fecha = document.getElementById("fecha").value
        let hora = document.getElementById("hora").value
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

        let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
        const ocupado = turnos.some(t => t.fecha === fecha && t.hora === hora);
        if (ocupado) return alert("Ese horario ya está reservado por otro cliente.");
        const nuevoTurno= new Turno(nombre,nombreServicio,fecha,hora, precioServicio)

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
    contenedor.innerHTML = ""; // Limpiamos el contenedor antes de dibujar

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
buscador.addEventListener("input", () => {
    const textoBuscado = buscador.value.toLowerCase();
    // Filtramos el array global según lo que el usuario escribe
    const serviciosFiltrados = serviciosDisponibles.filter(servicio => 
        servicio.nombre.toLowerCase().includes(textoBuscado)
    );
    // Volvemos a dibujar solo los que coinciden
    DevolverOpcionesServicio(serviciosFiltrados);
});

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
    contenedorTurno.innerHTML = `
        <div class="turno-info">
            <p><strong>${nombre}</strong></p>
            <p>📅 ${fecha} | 🕐 ${hora}hs</p>
            <p>✂️ ${servicio} | $ ${precio}</p>
        </div>
        <button class="btn-cancelar">Cancelar</button>
    `
    let listaTurnos = document.getElementById("listaTurnos")
    listaTurnos.appendChild(contenedorTurno)
    
    // Evento para cancelar turno
    contenedorTurno.querySelector(".btn-cancelar").addEventListener("click", function(){
        cancelarTurno(nombre, fecha, hora, servicio)
        contenedorTurno.remove()
    })
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
  listaTurnos.innerHTML = "";

  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  if (turnos.length === 0) {
    listaTurnos.textContent = "No hay próximos turnos.";
    return;
  }

  turnos.forEach(turno =>
    mensaje(turno.nombre, turno.fecha, turno.hora, turno.servicio, turno.precio || 0)
  );
}
