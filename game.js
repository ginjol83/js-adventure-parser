import { getHandle } from "./src/handlers/getHandle.js";
import { seeHandle as originalSeeHandle, describirUbicacion as originalDescribirUbicacion } from "./src/handlers/seeHandle.js";
import { rooms } from "./src/rooms.js";
import { comandos } from "./src/comands.js";

var estadoJuego = { ubicacion: "Claro en la Niebla", inventario: [] };

const tokenizarEntrada = (entrada) => entrada.trim().toLowerCase().split(/\s+/);

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

export function ejecutarComando(entrada) {
  const tokens = tokenizarEntrada(entrada);
  const { verbo, objeto } = obtenerVerboYObjeto(tokens);

  if (!verbo) {
    agregarSalida("No entiendo ese comando.");
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
      agregarSalida("No sé cómo hacer eso.");
  }
}

function manejarUsar(objeto) {
  if (!objeto) {
    agregarSalida("Usar qué?");
    return;
  }

  if (estadoJuego.inventario.includes(objeto)) {
    agregarSalida(`Usas el/la ${objeto}, pero no pasa nada... por ahora.`);
  } else {
    agregarSalida(`No tienes eso`);
  }
}

function manejarIr(direccion) {
  const salaActual = rooms[estadoJuego.ubicacion];

  if (salaActual.conexiones[direccion]) {
    estadoJuego.ubicacion = salaActual.conexiones[direccion];
    agregarSalida(`Te mueves hacia el ${direccion}.`);
    describirUbicacion();
  } else {
    agregarSalida(`No puedes ir al ${direccion} desde aquí.`);
  }
}

function iniciarJuego() {
  agregarSalida("Bienvenido a la aventura.");
  describirUbicacion(estadoJuego.ubicacion);  // Mostrar descripción inicial
  promptUsuario();
}

function promptUsuario() {
  const inputField = document.getElementById('input');
  inputField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const entrada = inputField.value;
      inputField.value = '';

      // Crea una nueva línea de salida en la "consola"
      agregarSalida(`> ${entrada}`);

      // Procesa el comando y genera la respuesta adecuada
      ejecutarComando(entrada);
    }
  });
}

function agregarSalida(texto) {
  const outputDiv = document.createElement('div');
  outputDiv.textContent = texto;
  document.getElementById('consola').appendChild(outputDiv);
  document.getElementById('consola').scrollTop = document.getElementById('consola').scrollHeight;
}

// Envolver las funciones originales
function seeHandle(objeto, estadoJuego) {
  const resultado = originalSeeHandle(objeto, estadoJuego);
  agregarSalida(resultado);
}

function describirUbicacion(ubicacion) {
  const resultado = originalDescribirUbicacion(ubicacion);
  agregarSalida(resultado);
}

iniciarJuego();

export { agregarSalida };