// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
//Comienzo del project con git//
// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};
// Esta función va a chequear el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
  return grillaGanadora();
}
function grillaGanadora(){
  var posicionInicialFila = grilla.length;
  var posicionInicialColumna = grilla[0].length;

  var ordenActual = 0;
  var mezclaActualPiezas = 0;

  for(var fila=0; fila < posicionInicialFila; fila++){
    for(var columna=0; columna < posicionInicialColumna; columna++){
    mezclaActualPiezas=grilla[fila][columna];
    if(mezclaActualPiezas < ordenActual)
    return false;
  ordenActual = mezclaActualPiezas;
}
}
  return true;
}
// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
function saludar(mensaje){
    var mensaje =  alert('Felicitaciones, GANASTE');
  }
  return saludar();
  }

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  grilla[fila1][columna1] = pieza2;
  grilla[fila2][columna2] = pieza1;

  var piezaJuego1=document.getElementById('piece' + pieza1);
  var piezaJuego2=document.getElementById('piece' + pieza2);

  var padre=piezaJuego1.parentNode;
  var clonPiezaJuego1=piezaJuego1.cloneNode(true);
  var clonPiezaJuego2=piezaJuego2.cloneNode(true);
  padre.replaceChild(clonPiezaJuego1, piezaJuego2);
  padre.replaceChild(clonPiezaJuego2, piezaJuego1);
}
// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}
// Para chequear si la posicón está dentro de la grilla.*/
function posicionValida(fila, columna){
  return(fila >= 0 && fila <= 2)&&(columna >= 0 && columna <=2);
}
// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){
  var nuevaFilaPiezaHueca;
  var nuevaColumnaPiezaHueca;
  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaHueca = posicionVacia.fila-1;
    nuevaColumnaPiezaHueca = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaHueca = posicionVacia.fila+1;
    nuevaColumnaPiezaHueca = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaHueca = posicionVacia.fila;
    nuevaColumnaPiezaHueca = posicionVacia.columna-1;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaHueca = posicionVacia.fila;
    nuevaColumnaPiezaHueca = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaHueca, nuevaColumnaPiezaHueca)){
      intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
      nuevaFilaPiezaHueca, nuevaColumnaPiezaHueca);
      actualizarPosicionVacia(nuevaFilaPiezaHueca, nuevaColumnaPiezaHueca);
    }
  }
  // Extras, ya vienen dadas
  function mezclarPiezas(veces){
    if(veces<=0){return;}
    var direcciones = [40, 38, 39, 37];
    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
    moverEnDireccion(direccion);

    setTimeout(function(){
      mezclarPiezas(veces-1);
    },100);
  }

  function capturarTeclas(){
    document.body.onkeydown = (function(evento) {
      if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
        moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if(gano){
          setTimeout(function(){
            mostrarCartelGanador();
          },500);
        }
        evento.preventDefault();
      }
    });
  }

  function iniciar(){
    mezclarPiezas(60);
    capturarTeclas();
  }


  iniciar();
