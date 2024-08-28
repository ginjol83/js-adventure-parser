const salas = {
    "Claro en la Niebla": {
      descripcion: "Un lugar en el bosque envuelto en niebla. Árboles sombríos y una figura encapuchada en la distancia al norte.",
      objetos: ["Objeto misterioso"],
      personajes: [],
      conexiones: {
        norte: "El Encuentro con el Pasado"
      }
    },
    "El Encuentro con el Pasado": {
      descripcion: "Un espacio abstracto, con fragmentos de recuerdos flotando en el aire. La figura encapuchada está frente a tí.",
      objetos: ["monstruo"],
      personajes: ["figura encapuchada"],
      conexiones: {
        sur: "Claro en la Niebla",
       // este: "biblioteca"
      }
    }
  }
  
  export { salas }