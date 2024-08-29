const getHandle = (objeto) => {
    const salaActual = rooms[estadoJuego.ubicacion]
    const indice = salaActual.objetos.indexOf(objeto)
    if (indice !== -1) {
        estadoJuego.inventario.push(objeto)
        salaActual.objetos.splice(indice, 1)
        console.log(`Has tomado el/la ${objeto}.`)
    } else {
        console.log(`No hay un(a) ${objeto} aquí para tomar.`)
    }
}

export { getHandle }