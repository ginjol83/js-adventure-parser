import { rooms } from '../rooms.js';
import { agregarSalida } from '../../game.js'; // Asegúrate de que la ruta sea correcta

const seeHandle = (objeto, estadoJuego) => {
    const ubicacion = estadoJuego.ubicacion;
    if (!objeto) {
        describirUbicacion(ubicacion);
        return;
    }

    const salaActual = rooms[ubicacion];
    if (salaActual.objetos.includes(objeto)) {
        agregarSalida(`Ves un(a) ${objeto}.`);
    } else {
        agregarSalida(`No hay un(a) ${objeto} aquí.`);
    }
}

function describirUbicacion(ubicacion) {
    const salaActual = rooms[ubicacion];
    agregarSalida(salaActual.descripcion);

    if (salaActual.objetos.length > 0) {
        agregarSalida("Objetos visibles: " + salaActual.objetos.join(", "));
    } else {
        agregarSalida("No hay objetos visibles aquí.");
    }
}

export { seeHandle, describirUbicacion };