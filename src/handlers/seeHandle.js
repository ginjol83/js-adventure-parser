const seeHandle = (objeto) => {
    if (!objeto) {
        describirUbicacion();
        return;
    }

    const salaActual = rooms[estadoJuego.ubicacion];
    if (salaActual.objetos.includes(objeto)) {
        console.log(`Ves un(a) ${objeto}.`);
    } else {
        console.log(`No hay un(a) ${objeto} aquí.`);
    }
}

export { seeHandle }