var expect = chai.expect;

describe('Creación', function() {
    'use strict';

describe('Juego', function() {
    it('El Objeto Juego está definido', function(done) {
      if (!window.Juego){
        done(err);
      }
      else{
        done();
      }
    });
});
describe('Atributos', function(){
  before(function(){
    Juego.actualizarPosicionVacia(2,2);
  });
});
describe('filaPosicionVacia', function(){
  it('El atributo filaPosicionVacia está definido', function(done){
    if(!Juego.filaPosicionVacia){
      done(err);
    } else {
      done();
    }
  });
});
describe('columnaPosicionVacia', function(){
  it('El atributo columnaPosicionVacia está definido', function(done){
    if(!Juego.columnaPosicionVacia){
      done(err);
    } else {
      done();
    }
  });
});
describe('posicionVacia', function(){
  it('La posición vacía se actualiza correctamente', function(done){
    if(!Juego.columnaPosicionVacia !=2 && Juego.filaPosicionVacia !=2){
      done(err);
      } else {
        done();
      }
    });
});
desccribe('posicionValida', function(){
  it('Se verifica correctamente que la posición sea válida', function(done){
    Juego.cantidadDePiezasPorLado= 3;
    if(Juego.posicionValida(2,3)|| !Juego.posicionValida(2,2)|| Juego.posicionValida(-1,0)){
      done(err);
    } else {
      done();
    }
  });
});
describe('crearPieza', function(){
  it('Hay que las posiciones originales de la pieza', function(done){
    var pieza = Juego.crearPieza(2, 2);
    if (!pieza.x || !pieza.y) {
      done(err);
    } else {
      done();
    }
});
  it('Hay que guardar la posción actual de la pieza', function(done){
    var pieza = Juego.crearPieza(2, 2);
    if(pieza.sx != 2 || pieza.sy != 2){
      done(err);
    } else {
      done();
    }
  });
 });
);
describe('Tamaño de la grilla', function() {
    it('La grilla tiene el tamaño correcto', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadDePiezasPorLado = 5;
      Juego.crearGrilla();
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Juego.grilla.length).to.equal(Juego.cantidadDePiezasPorLado);
      expect(Juego.grilla[0].length).to.equal(Juego.cantidadDePiezasPorLado);
    });
  });
});

describe('Canvas', function(){
  describe('Definición del canvas', function(){
    it('El atributo configurarCanvas está definido', function(done){
      if(!Juego.configuracionCanvas){
        done(err);
      } else {
        done();
      }
    });
  });
});
