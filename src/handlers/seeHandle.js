import { rooms } from '../rooms.js'

const seeHandle = (objeto,estadoJuego) => {
    const ubicacion =estadoJuego.ubicacion
    if (!objeto) {
        describirUbicacion(ubicacion)
        return
    }

    const salaActual = rooms[ubicacion]
    if (salaActual.objetos.includes(objeto)) {
        console.log(`Ves un(a) ${objeto}.`)
    } else {
        console.log(`No hay un(a) ${objeto} aquí.`)
    }
}

function describirUbicacion(ubicacion) {
    const salaActual = rooms[ubicacion]
    console.log(salaActual.descripcion)
  
    if (salaActual.objetos.length > 0) {
      console.log("Objetos visibles:", salaActual.objetos.join(", "))
    } else {
      console.log("No hay objetos visibles aquí.")
    }
      
  }

export { seeHandle, describirUbicacion }