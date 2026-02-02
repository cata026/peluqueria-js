
let servicios=["Corte", "Alisado", "Tintura"]
let precios = [5000, 10000, 15000]

function calcularTotal(precioRecibido, cantidadRecibida){
    let resultado= precioRecibido * cantidadRecibida
    return resultado
}

function turno(){
    servicio = "Ingrese el numero del servicio a realizar\n"
    for(let i=0; i< servicios.length; i++){
        servicio = servicio + (i+1) + "-" + servicios[i] + " ($" + precios[i] + ")\n"
    }
    let elegirServicio = parseInt(prompt(servicio));
    if( elegirServicio >=1 && elegirServicio <= servicios.length){
        let indice=elegirServicio -1
        let cantidad = parseInt(prompt("¿Cuantos " + servicios[indice] + " quiere?"))

        //ahora le pasamos los datos a la funcion para calcular el precio

        let total= calcularTotal(precios[indice], cantidad)

        totalapagar = alert("El total a pagar es: $" + total) 
    }else{
        alert("no valido")
    }
}

function saludar(){
   nombre = prompt("Ingrese su nombre: ")
    deseaTurno = confirm("Bienvenida/o " + nombre + "!! Quiere solicitar un turno?")
   if(deseaTurno){
   let seguir= true
    do {
        turno()
        seguir=confirm("Desea sacar otro turno " + nombre + "?")
    } while (seguir){
        alert("¡Gracias por su visita!")
    }
    }else{
        alert("Nos vemos pronto")
    }
}


saludar()



  