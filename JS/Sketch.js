// js/sketch.js
import capitulo5Data from '../data/ejercicios.js';

const ejer = capitulo5Data.ejercicioActual;
let puntos = []; 
let puntoSeleccionado = null; 
let radioPunto = 16; // Lo agrandamos un poco más para que sea cómodo tocar con el dedo en el iPad

window.setup = function() {
  let canvas = createCanvas(600, 480);
  canvas.parent('canvas-container');
  
  // CONECTAR LOS BOTONES DEL HTML EN EL ENTORNO DEL IPAD
  document.getElementById('btn-retroceder').addEventListener('click', () => {
    if (puntos.length > 0) puntos.pop(); // Borra el último toque
  });
  
  document.getElementById('btn-limpiar').addEventListener('click', () => {
    puntos = []; // Borra todo el lienzo
  });
};

window.draw = function() {
  background(255); // Fondo blanco puro como el libro del Dr. Alson
  dibujarPlanoCartesiano();
  
  // 1. Dibujar las líneas que unen los puntos que el estudiante va trazando
  if (puntos.length > 1) {
    stroke(0, 102, 204); // Azul Fragata
    strokeWeight(3.5);
    noFill();
    beginShape();
    for (let p of puntos) {
      vertex(mapX(p.x), mapY(p.y));
    }
    endShape();
  }
  
  // 2. Dibujar los vértices interactivos en la pantalla del iPad
  for (let i = 0; i < puntos.length; i++) {
    let p = puntos[i];
    let p5X = mapX(p.x);
    let p5Y = mapY(p.y);
    let d = dist(mouseX, mouseY, p5X, p5Y);
    
    if (d < radioPunto) {
      fill(255, 153, 0); // Naranja de selección activa
      stroke(0); strokeWeight(2);
      ellipse(p5X, p5Y, radioPunto * 1.2, radioPunto * 1.2);
    } else {
      fill(0, 102, 204); // Azul estándar
      noStroke();
      ellipse(p5X, p5Y, radioPunto, radioPunto);
    }
  }
};

// --- CONTROLES DE TOQUE / MOUSE PARA EL IPAD ---

window.mousePressed = function() {
  // Evitar registrar toques fuera del cuadro matemático
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  
  // ¿El usuario tocó un punto existente para moverlo?
  for (let i = 0; i < puntos.length; i++) {
    let p = puntos[i];
    if (dist(mouseX, mouseY, mapX(p.x), mapY(p.y)) < radioPunto) {
      puntoSeleccionado = i;
      return;
    }
  }
  
  // Si no, agregamos un punto nuevo en coordenadas cartesianas
  let cartX = mapP5toX(mouseX);
  let cartY = mapP5toY(mouseY);
  puntos.push(createVector(cartX, cartY));
};

window.mouseDragged = function() {
  if (puntoSeleccionado !== null) {
    puntos[puntoSeleccionado].x = mapP5toX(mouseX);
    puntos[puntoSeleccionado].y = mapP5toY(mouseY);
  }
};

window.mouseReleased = function() {
  puntoSeleccionado = null;
};

// --- HERRAMIENTAS DE GEOMETRÍA ALSON ---
function dibujarPlanoCartesiano() {
  stroke(240); strokeWeight(1);
  // Cuadrícula cuadriculada (Escala de -5 a 5)
  for (let i = -5; i <= 5; i++) {
    line(mapX(i), 0, mapX(i), height);
    line(0, mapY(i), width, mapY(i));
  }
  stroke(120); strokeWeight(2);
  line(width / 2, 0, width / 2, height); // Eje Y
  line(0, height / 2, width, height / 2); // Eje X
}

function mapX(x) { return map(x, -5, 5, 0, width); }
function mapY(y) { return map(y, -5, 5, height, 0); }
function mapP5toX(px) { return map(px, 0, width, -5, 5); }
function mapP5toY(py) { return map(py, height, 0, -5, 5); }
