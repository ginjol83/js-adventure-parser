import { rooms } from "./src/rooms.js";
import { comandos } from "./src/comands.js";
import { seeHandle,describirUbicacion } from "./src/handlers/seeHandle.js";
import { getHandle } from "./src/handlers/getHandle.js";

import readline from 'readline';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


var estadoJuego = { ubicacion: "Claro en la Niebla", inventario: [] }

const tokenizarEntrada = (entrada) => entrada.trim().toLowerCase().split(/\s+/)


function obtenerVerboYObjeto(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    for (const [verbo, sinónimos] of Object.entries(comandos)) {
      if (sinónimos.includes(tokens[i])) {
        const objeto = tokens.slice(i + 1).join(" ");
        return { verbo, objeto };
      }
    }
  }
  return { verbo: null, objeto: null };
}

function ejecutarComando(entrada) {
  const tokens = tokenizarEntrada(entrada);
  const { verbo, objeto } = obtenerVerboYObjeto(tokens);

  if (!verbo) {
    console.log("No entiendo ese comando.");
    return;
  }

  switch (verbo) {
    case "mirar":
      seeHandle(objeto, estadoJuego);
      break;
    case "tomar":
      estadoJuego = getHandle(objeto, estadoJuego);
      break;
    case "usar":
      manejarUsar(objeto);
      break;
    case "ir":
      manejarIr(objeto);
      break;
    default:
      console.log("No sé cómo hacer eso.");
  }
}





function manejarUsar(objeto) {

  if (!objeto) {
    console.log("Usar qué?");
    return;
  }

  if (estadoJuego.inventario.includes(objeto)) {
    console.log(`Usas el/la ${objeto}, pero no pasa nada... por ahora.`);
  } else {
    console.log(`No tienes eso`);
  }


}

function manejarIr(direccion) {
  const salaActual = rooms[estadoJuego.ubicacion];

  if (salaActual.conexiones[direccion]) {
    estadoJuego.ubicacion = salaActual.conexiones[direccion];
    console.log(`Te mueves hacia el ${direccion}.`);
    describirUbicacion();
  } else {
    console.log(`No puedes ir al ${direccion} desde aquí.`);
  }
}




function iniciarJuego() {
  console.log("Bienvenido a la aventura.");
  describirUbicacion(estadoJuego.ubicacion);  // Mostrar descripción inicial
  promptUsuario();
}

function promptUsuario() {
  rl.question("¿Qué quieres hacer? ", (entrada) => {
    ejecutarComando(entrada);
    promptUsuario();
  });
}

iniciarJuego();
