
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
})

    function mensaje(nombre,fecha,hora,servicio){
    let contenedorTurno=document.createElement("div")
    contenedorTurno.innerHTML=`<p> El dia ${fecha} a las ${hora}hs, ${nombre} tiene turno para ${servicio}</p>`
        document.body.appendChild(contenedorTurno)
 }

