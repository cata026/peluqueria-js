
document.addEventListener("DOMContentLoaded", function(){

    let turnosGuardados = JSON.parse(localStorage.getItem("turnos")) || []

    turnosGuardados.forEach(turno => {
        mensaje(turno.nombre, turno.fecha, turno.hora, turno.servicio)
    })

}) 


class Turno { constructor( nombre, servicio, fecha, hora){
    this.nombre=nombre;
    this.servicio=servicio;
    this.fecha=fecha;
    this.hora=hora;
    }
}

const formulario=document.getElementById("formTurno")

let botonenviar= document.getElementById("boton")

formulario.addEventListener("submit",function(cliente){
    cliente.preventDefault();
    let nombre = document.getElementById("nombre").value
    let fecha = document.getElementById("fecha").value
    let hora = document.getElementById("hora").value
    let servicio = document.querySelector(
    'input[name="servicio"]:checked'
).value;
    const nuevoTurno= new Turno(nombre,servicio,fecha,hora)
    let turnos = JSON.parse(localStorage.getItem("turnos")) || []

    turnos.push(nuevoTurno)

    localStorage.setItem("turnos", JSON.stringify(turnos))
    
   mensaje(nombre,fecha,hora,servicio)
   formulario.reset()
})

function cancelarTurno(nombre, fecha, hora, servicio){
    let turnos = JSON.parse(localStorage.getItem("turnos")) || []
    turnos = turnos.filter(turno => !(turno.nombre === nombre && turno.fecha === fecha && turno.hora === hora && turno.servicio === servicio))
    localStorage.setItem("turnos", JSON.stringify(turnos))
}

    function mensaje(nombre,fecha,hora,servicio){
    let contenedorTurno = document.createElement("div")
    contenedorTurno.className = "turno"
    contenedorTurno.innerHTML = `
        <div class="turno-info">
            <p><strong>${nombre}</strong></p>
            <p>📅 ${fecha}</p>
            <p>🕐 ${hora}hs</p>
            <p>✂️ ${servicio}</p>
        </div>
        <div class="turno-botones">
            <button class="btn-cancelar" data-fecha="${fecha}" data-hora="${hora}" data-nombre="${nombre}">Cancelar</button>
            <button class="btn-agregar">Agregar Servicio</button>
        </div>
    `
    let listaTurnos = document.getElementById("listaTurnos")
    listaTurnos.appendChild(contenedorTurno)
    
    // Evento para cancelar turno
    contenedorTurno.querySelector(".btn-cancelar").addEventListener("click", function(){
        cancelarTurno(nombre, fecha, hora, servicio)
        contenedorTurno.remove()
    })
    
   
 }

