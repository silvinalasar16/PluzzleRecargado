var Juego = {


  cantidadDePiezasPorLado: null,
  anchoDeRompecabezas: 0,
  altoDeRompecabezas: 0,
  imagen: null,
  piezas: [],
  anchoPiezas: 0,
  altoPiezas: 0,
  grilla: [],
  contexto: null,
  filaPosicionVacia: null,
  columnaPosicionVacia: null,
  contadorDeMovimientos: null,
  movimientosTotales: null,


  crearGrilla: function() {
    for (var i = 0; i < this.cantidadDePiezasPorLado; i++) {
      var fila = []
      for (var j = 0; j < this.cantidadDePiezasPorLado; j++) {
        fila.push((i * this.cantidadDePiezasPorLado) + j);
      }
      this.grilla.push(fila);
    }
  },

  grillaOrdenada: function() {
    var cantidadFilas = this.grilla.length;
    var cantidadColumnas = this.grilla[0].length;

    var ultimoValorVisto = 0;
    var valorActual = 0;
    // recorre cada fila columna por columna chequeando el orden de sus elementos
    for (var fila = 0; fila < cantidadFilas; fila++) {
      for (var columna = 0; columna < cantidadColumnas; columna++) {
        valorActual = this.grilla[fila][columna]
        // si el valorActual es menor al ultimoValorVisto entonces no esta ordenada
        if (valorActual < ultimoValorVisto) return false;

        // actualizamos el valor del ultimoValorVisto
        ultimoValorVisto = valorActual;
      }
    }
    return true;
  },

  //funcion creada en el rompecabezas original
  chequearSiGano: function() {
    return this.grillaOrdenada();
  },

  mostrarCartelGanador: function() {
    var self = this;
    $(document).ready(function() {
      swal({
          title: "Felicitaciones ¡Ganaste!",
          text: "Juego nuevo",
          type: "success"
        },
        function() {
          self.iniciar(self.movimientosTotales);
        })
    });
  },
  mostrarCartelPerdedor: function() {
    var self = this;
    $(document).ready(function() {
      sweetAlert({
          title: "¡Ups! Perdiste",
          text: "¿Quieres volver a intentarlo?",
          type: "error"
        
        },
        function() {
          self.iniciar(self.movimientosTotales);
        }
      )
    });
},
  intercambiarPosiciones: function(fila1, columna1, fila2, columna2) {
    // Intercambio posiciones en la grilla
    var posPieza1 = this.grilla[fila1][columna1];
    var posPieza2 = this.grilla[fila2][columna2];
    this.grilla[fila1][columna1] = posPieza2;
    this.grilla[fila2][columna2] = posPieza1;

    var pieza1 = this.piezas[posPieza1];
    var pieza2 = this.piezas[posPieza2];

    var sx1 = pieza1.sx
    var sy1 = pieza1.sy
    var sx2 = pieza2.sx
    var sy2 = pieza2.sy

      pieza1.sx = sx2
      pieza1.sy = sy2

      pieza2.sx = sx1
      pieza2.sy = sy1

      this.piezas[posPieza1] = pieza1;
      this.piezas[posPieza2] = pieza2;


    this.contexto.drawImage(this.imagen, pieza2.x, pieza2.y, this.anchoPiezas, this.altoPiezas, pieza2.sx, pieza2.sy, this.anchoPiezas, this.altoPiezas);

    this.contexto.fillStyle = "white";
    this.contexto.fillRect(pieza1.sx, pieza1.sy, this.anchoPiezas, this.altoPiezas);
  },


  actualizarPosicionVacia: function(nuevaFila, nuevaColumna) {
      this.filaPosicionVacia = nuevaFila;
      this.columnaPosicionVacia = nuevaColumna;
  },

  posicionValida: function(fila, columna) {
      return (fila >= 0 && fila < this.cantidadDePiezasPorLado) && (columna >= 0 && columna < this.cantidadDePiezasPorLado);
  },


  moverEnDireccion: function(direccion) {

    var nuevaFilaPiezaBlanca;
    var nuevaColumnaPiezaBlanca;



    if (direccion == 40) {
      nuevaFilaPiezaBlanca = this.filaPosicionVacia - 1;
      nuevaColumnaPiezaBlanca = this.columnaPosicionVacia;
    }

    else if (direccion == 38) {
      nuevaFilaPiezaBlanca = this.filaPosicionVacia + 1;
      nuevaColumnaPiezaBlanca = this.columnaPosicionVacia;

    }

    else if (direccion == 39) {
      nuevaFilaPiezaBlanca = this.filaPosicionVacia;
      nuevaColumnaPiezaBlanca = this.columnaPosicionVacia - 1;

    }


    else if (direccion == 37) {
      nuevaFilaPiezaBlanca = this.filaPosicionVacia;
      nuevaColumnaPiezaBlanca = this.columnaPosicionVacia + 1;
    }

    if (this.posicionValida(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca)) {
          this.intercambiarPosiciones(this.filaPosicionVacia, this.columnaPosicionVacia,
            nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
          this.actualizarPosicionVacia(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
    }
  },

  mezclarPiezas: function(veces) {
    var that = this;
    if (veces <= 0) {
      that.capturarTeclas();
      return;
    }
    var direcciones = [40, 38, 39, 37];
    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
      this.moverEnDireccion(direccion);
      setTimeout(function() {
        that.mezclarPiezas(veces - 1);
    }, 1);
  },

  capturarTeclas: function() {
    var that = this;
      document.body.onkeydown = (function(evento) {
        if (evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37) {
          that.moverEnDireccion(evento.which);
          that.restarMovimientoYverSiGano();
      }
    });
  },

  //funcion que captura el click del mouse y mueve la pieza que se clickea siempre y cuando se pueda intercambiar con la blanca
  capturarMouse: function(event) {
      event = event || window.event;
        x = event.offsetX,
        y = event.offsetY;
    //se verifica que la posicion que se clickea sea una pieza valida para mover
    var nuevaFilaPiezaBlanca;
    var nuevaColumnaPiezaBlanca;
    var cambioAlgo = false;
      if (y > this.filaPosicionVacia * this.altoPiezas && y < (this.filaPosicionVacia * this.altoPiezas + this.altoPiezas)) {
        if (x > (this.columnaPosicionVacia * this.anchoPiezas - this.anchoPiezas) && x < this.columnaPosicionVacia * this.anchoPiezas) {
          this.moverEnDireccion(39);
          cambioAlgo = true;
        } else if (x > (this.columnaPosicionVacia * this.anchoPiezas + this.anchoPiezas) && x < (this.columnaPosicionVacia * this.anchoPiezas + 2 * this.anchoPiezas)) {
          this.moverEnDireccion(37);
          cambioAlgo = true;
      }
    }
      if (x > this.columnaPosicionVacia * this.anchoPiezas && x < (this.columnaPosicionVacia * this.anchoPiezas + this.anchoPiezas)) {
        if (y > this.filaPosicionVacia * this.anchoPiezas - this.anchoPiezas && y < this.filaPosicionVacia * this.anchoPiezas) {
          this.moverEnDireccion(40);
          cambioAlgo = true;
        } else if (y > (this.filaPosicionVacia * this.anchoPiezas + this.anchoPiezas) && y < (this.filaPosicionVacia * this.anchoPiezas + 2 * this.anchoPiezas)) {
          this.moverEnDireccion(38);
        cambioAlgo = true;
      }
    }


    if (cambioAlgo) {
      this.restarMovimientoYverSiGano();
    }
  },

  restarMovimientoYverSiGano: function() {
    this.contadorDeMovimientos--;
    document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
    if (this.contadorDeMovimientos == 0) {
      this.mostrarCartelPerdedor();
    }
    var gano = this.chequearSiGano();
    var that = this;
    if (gano) {
      setTimeout(function() {
        that.mostrarCartelGanador();
      }, 500);
    }
  },
  crearPieza: function(xPos, yPos) {
    var pieza = {};
    pieza.x = xPos;
    pieza.y = yPos;
    pieza.sx = xPos;
    pieza.sy = yPos;
    return pieza;
  },


  construirPiezas: function() {
    var i;
    var pieza;
    var xPos = 0;
    var yPos = 0;
    for (i = 0; i < this.cantidadDePiezasPorLado * this.cantidadDePiezasPorLado; i++) {
      var pieza = this.crearPieza(xPos, yPos);
      this.piezas.push(pieza);

      xPos += this.anchoPiezas;
      if (xPos >= this.anchoDeRompecabezas) {
        //cuando se llega al ancho del rompecabezas se pasa a la fila siguiente
        xPos = 0;
        yPos += this.altoPiezas;
      }
    }
    //se crea la pieza blanca y se la ubica en la ultima posicion del rompecabezas
    this.contexto.fillStyle = "white";
    this.contexto.fillRect(this.piezas[this.filaPosicionVacia * this.cantidadDePiezasPorLado + this.columnaPosicionVacia].sx, this.piezas[this.filaPosicionVacia * this.cantidadDePiezasPorLado + this.columnaPosicionVacia].sy, this.anchoPiezas, this.altoPiezas)
  },

  cargarImagen: function(e) {
    //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600).
    this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);

    this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
    this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
    this.configurarCanvas();
  },

  configurarCanvas: function() {
    var canvas = document.getElementById('canvas');
    //se llama al contexto del elemento canvas del HMTL
    this.contexto = canvas.getContext('2d');
    //se define el ancho y alto del canvas
    canvas.width = this.anchoDeRompecabezas;
    canvas.height = this.altoDeRompecabezas;

    this.contexto.drawImage(this.imagen, 0, 0, this.anchoDeRompecabezas, this.altoDeRompecabezas, 0, 0, this.anchoDeRompecabezas, this.altoDeRompecabezas);
  },

  //funcion que carga la imagen
  iniciarImagen: function(callback) {
    this.imagen = new Image();
    var self = this;
    //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
    this.imagen.addEventListener('load', function() {
      self.cargarImagen.call(self);
      callback();
    }, false);
    this.imagen.src = "images/imagen.jpg";
  },


  iniciar: function(cantMovimientos) {

    this.movimientosTotales = cantMovimientos;
    this.contadorDeMovimientos = cantMovimientos;
    this.piezas = [];
    this.grilla = [];
    document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
    this.cantidadDePiezasPorLado = document.getElementById("cantidadPiezasPorLado").value;

    var self = this;
    this.crearGrilla();

    this.filaPosicionVacia = this.cantidadDePiezasPorLado - 1;
    this.columnaPosicionVacia = this.cantidadDePiezasPorLado - 1;

 this.iniciarImagen(function() {
      self.construirPiezas();
      var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
      self.mezclarPiezas(cantidadDeMezclas);
    });
  }

}
