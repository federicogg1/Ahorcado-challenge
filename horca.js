//selectores
let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("nuevo-juego").style.display = "none"
let botonDesistir = document.getElementById("desistir").style.display = "none"
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';
let btnNuevoJuego = document.getElementById("nuevo-juego");
let botonDes = document.getElementById("desistir");
let botonCancelar = document.getElementById("can");


var palabras = ["SKIN", "TSUNAMI", "HURACAN", "TERREMOTO", "CSS", "TERMOMETRO", "ESTUDIOS", "CASA", "GOOGLE"];
var tablero = document.querySelector("#forca").getContext("2d");
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8
let letraElegida = []

//Eventos
// captura el id "iniciar-juego" en el click y direcciona el program al método dque inicia el juego
document.getElementById("Iniciar-juego").onclick = () => {
  iniciarJuego();
  console.log("juego comenzado")
}

// captura el id "btn-guardar", guarda la palabra agregada y inicia el juego
document.getElementById("gye").onclick = () => {
  guardarPalabra();
}
//actualiza la pantalla cuando el usuario hace click en el botón "nuevo juego"
btnNuevoJuego.addEventListener("click", function () {
  location.reload();
});
//actualiza la pantalla cuando el usuario hace click en el botón "salir"
botonDes.addEventListener("click", function () {
  location.reload();
});

//sortea la palabra que será usada en el ahorcado
function escogerPalabraSecreta() {
  let palabra = palabras[Math.floor(Math.random() * palabras.length)];
  palabraSecreta = palabra;
  return palabra;
}

//verifica cual es la letra en que el usuario hizo click

function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key)
    return false

  } else {
    letras.push(key)
    return true
  }
}

function adicionarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase()
}

function adicionarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores -= 1
  }
}

function verificarFinJuego(letra) {
  //checa si la letra ha sido incluída en el array de  las letras correctas o incorrectas
  if (letraElegida.length < palabraSecreta.length) {
    //incluye las letras ya digitadas en el array
    letrasIncorrectas.push(letra);


    //valida se el usuário cometió el numero maximo de errores
    if (letrasIncorrectas.length > numeroDeErrores) {
      perdiste()
    } 
    else if (letraElegida.length < palabraSecreta.length) {
      adicionarLetraIncorrecta(letra)
      escribirLetraIncorrecta(letra, errores)
    }
  }
}


//Verifica si el usuario ha ganado
function verificarVencedor(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length === palabraSecreta.length) {

    ganaste()

  }
}


//impide que teclas como shift y otras, sean consideradas errores y sean escritas
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}







//haz con que los botones de la pantalla de home desaparezcan y los de la de agregar palabra aparezcan
function ensenarPantallaDeAgregarPalabra() {
  document.getElementById("div-desaparece").style.display = 'none';
  document.getElementById("agregar-palabra").style.display = "block";

}

// guarda la palabra que el usuario quiere agregar
function guardarPalabra() {

  //captura lo que el usuario ha digitado
  let nuevaPalabra = document.querySelector("#palabra").value;

  // incluye la palabra que el usuario digitó en el array de las palabras a ser en sorteadas
  if (nuevaPalabra !== "") {
    palabras.push(nuevaPalabra.toUpperCase());
    alert('La palabra fue guardada')


    // haz con que los componentes de la pantalla de agregar palabra desaparezcan
    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
  } 
  else {
    alert("Ninguna palabra ha sido digitada")
  }

}



//Iniciar el juego

function iniciarJuego() {
  // hace con que los de iniciar juego e agregar palabra desaparezcan
  document.getElementById("div-desaparece").style.display = 'none';
 
  //llama la función que dibuja el tablero del ahorcado
  dibujarTablero();
  //llama la función que sortea la palabra  
  escogerPalabraSecreta() 
 //llama la función que dibuja las líneas donde el usuario escribirá
 dibujarLineas();
  // hace con que los botones de nuevo juego e salir aparezcan
 document.getElementById("nuevo-juego").style.display = 'block';
 document.getElementById("desistir").style.display = 'block';

// captura la letra que el usuario escribió
  document.onkeydown = (e) => {
     // pone la letra en letra mayuscula
    let letra = e.key.toUpperCase()
    //verifica si el usuario todavia no ha perdido  
    if (letrasIncorrectas.length <= numeroDeErrores) {
      if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escribirLetraCorrecta(i)
              verificarVencedor(letra)

            }
          }

        }
        // si el usuario cometió más errores de los que son permitidos, 
        //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego
        else {
          if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
          dibujarAhorcado(errores)
          verificarFinJuego(letra)
        }
      }
    }
    else {
      alert('has atinado el límite de letras incorrectas')
    }

  };
}