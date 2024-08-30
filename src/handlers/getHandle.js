import { rooms } from '../rooms.js'
import { toLowerCase } from '../utils/stringsUtils.js'

const getHandle = (objeto,estadoJuego) => {
    const cad = toLowerCase(objeto)

    const salaActual = rooms[estadoJuego.ubicacion]
    const lowObjets = salaActual.objetos.map(toLowerCase)
    const indice = lowObjets.indexOf(cad)
    const result = salaActual.objetos[indice]

    if (indice !== -1) {
        estadoJuego.inventario.push(result)
        salaActual.objetos.splice(indice, 1)
        console.log(`Has tomado el/la ${result}.`)
    } else {
        console.log(`No hay un(a) ${result} aquí para tomar.`)
    }
    return estadoJuego
}

export { getHandle }