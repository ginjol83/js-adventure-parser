import { salas } from "./salas.js";

const comandos = {
    mirar: ["mirar", "examinar", "ver"],
    tomar: ["tomar", "coger", "agarrar"],
    usar: ["usar", "utilizar"],
    ir: ["ir", "moverse", "caminar"],
    hablar: ["hablar", "decir", "conversar"],
  };
  
  
  
  const estadoJuego = {
    ubicacion: "Claro en la Niebla",
    inventario: [],
  };
  
  function tokenizarEntrada(entrada) {
    return entrada.trim().toLowerCase().split(/\s+/);
  }
  
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
        manejarMirar(objeto);
        break;
      case "tomar":
        manejarTomar(objeto);
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
  
  function manejarMirar(objeto) {
    if (!objeto) {
      describirUbicacion();
      return;
    }
  
    const salaActual = salas[estadoJuego.ubicacion];
    if (salaActual.objetos.includes(objeto)) {
      console.log(`Ves un(a) ${objeto}.`);
    } else {
      console.log(`No hay un(a) ${objeto} aquí.`);
    }
  }
  
  function manejarTomar(objeto) {
    const salaActual = salas[estadoJuego.ubicacion];
    const indice = salaActual.objetos.indexOf(objeto);
    if (indice !== -1) {
      estadoJuego.inventario.push(objeto);
      salaActual.objetos.splice(indice, 1);
      console.log(`Has tomado el/la ${objeto}.`);
    } else {
      console.log(`No hay un(a) ${objeto} aquí para tomar.`);
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
    const salaActual = salas[estadoJuego.ubicacion];
    
    if (salaActual.conexiones[direccion]) {
      estadoJuego.ubicacion = salaActual.conexiones[direccion];
      console.log(`Te mueves hacia el ${direccion}.`);
      describirUbicacion();
    } else {
      console.log(`No puedes ir al ${direccion} desde aquí.`);
    }
  }
  
  function describirUbicacion() {
    const salaActual = salas[estadoJuego.ubicacion];
    console.log(salaActual.descripcion);
  
    if (salaActual.objetos.length > 0) {
      console.log("Objetos visibles:", salaActual.objetos.join(", "));
    } else {
      console.log("No hay objetos visibles aquí.");
    }
  }
  
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  function iniciarJuego() {
    console.log("Bienvenido a la aventura.");
    describirUbicacion();  // Mostrar descripción inicial
    promptUsuario();
  }
  
  function promptUsuario() {
    readline.question("¿Qué quieres hacer? ", (entrada) => {
      ejecutarComando(entrada);
      promptUsuario();
    });
  }
  
  iniciarJuego();
  