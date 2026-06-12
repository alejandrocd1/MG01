// js/sketch.js
import capitulo5Data from '../data/ejercicios.js';

const ejer = capitulo5Data.ejercicioActual;
let puntos = []; 
let puntoSeleccionado = null; 
let radioPunto = 16; 

// Estado de la evaluación pedagógica
let modoEvaluacion = false;
let graficoEsCorrecto = false;
let mensajeFeedback = "";

window.setup = function() {
  let canvas = createCanvas(600, 480);
  canvas.parent('canvas-container');
  
  // BOTONES EXISTENTES
  document.getElementById('btn-retroceder').addEventListener('click', () => {
    if (puntos.length > 0) puntos.pop();
    modoEvaluacion = false;
    graficoEsCorrecto = false;
  });
  
  document.getElementById('btn-limpiar').addEventListener('click', () => {
    puntos = [];
    modoEvaluacion = false;
    graficoEsCorrecto = false;
  });

  // Botón para evaluar el gráfico del alumno en el iPad
  let barra = document.querySelector('.barra-herramientas');
  let btnEvaluar = document.createElement('button');
  btnEvaluar.className = 'btn btn-accion';
  btnEvaluar.style.backgroundColor = '#28a745'; 
  btnEvaluar.innerText = '✅ Verificar Gráfico';
  btnEvaluar.addEventListener('click', validarGraficoEstudiante);
  barra.appendChild(btnEvaluar);
};

window.draw = function() {
  background(255); 
  
  // 1. SI EL GRÁFICO ES CORRECTO, SOMBREAMOS LA SOLUCIÓN ANALÍTICA EN EL PLANO
  if (modoEvaluacion && graficoEsCorrecto) {
    dibujarSombreadoSolucion();
  }

  dibujarPlanoCartesiano();
  
  // 2. Si está en modo evaluación (correcto o errado), mostramos las guías tenues del libro
  if (modoEvaluacion) {
    dibujarCurvaTeorica(ejer.f, color(0, 102, 204, 80)); // f(x) azul
    dibujarCurvaTeorica(ejer.g, color(204, 0, 0, 80));   // g(g) rojo
    
    // Feedback pedagógico en la parte inferior del lienzo
    fill(graphicsColorFeedback()); 
    noStroke(); fontSize(14); fontStyle(BOLD); textAlign(CENTER);
    text(mensajeFeedback, width / 2, height - 20);
  }
  
  // 3. Dibujar trazo interactivo del alumno
  if (puntos.length > 1) {
    stroke(0, 102, 204); 
    strokeWeight(3.5);
    noFill();
    beginShape();
    for (let p of puntos) vertex(mapX(p.x), mapY(p.y));
    endShape();
  }
  
  // 4. Dibujar vértices interactivos
  textAlign(LEFT); fontStyle(NORMAL);
  for (let i = 0; i < puntos.length; i++) {
    let p = puntos[i];
    let p5X = mapX(p.x);
    let p5Y = mapY(p.y);
    if (dist(mouseX, mouseY, p5X, p5Y) < radioPunto) {
      fill(255, 153, 0); stroke(0); strokeWeight(2);
      ellipse(p5X, p5Y, radioPunto * 1.2, radioPunto * 1.2);
    } else {
      fill(0, 102, 204); noStroke();
      ellipse(p5X, p5Y, radioPunto, radioPunto);
    }
  }
};

// --- FUNCIÓN PEDAGÓGICA: SOMBREADO DE LA SOLUCIÓN ---
function dibujarSombreadoSolucion() {
  noStroke();
  // Usamos un color verde/marrón muy translúcido para el fondo del intervalo (-inf al punto de corte)
  fill(40, 167, 69, 35); 
  
  let xLimiteIzquierdo = mapX(-5); // El inicio del plano físico (-5)
  let xLimiteDerecho = mapX(ejer.puntoCorteReal); // El punto de corte real (0.5)
  
  // Pintamos el rectángulo que representa visualmente el intervalo solución en el plano
  rect(xLimiteIzquierdo, 0, xLimiteDerecho - xLimiteIzquierdo, height);
  
  // Línea indicadora del borde del intervalo crítico
  stroke(133, 100, 4, 150); strokeWeight(2);
  line(xLimiteDerecho, 0, xLimiteDerecho, height);
}

// --- LOGICA DE VALIDACIÓN ---
function validarGraficoEstudiante() {
  if (puntos.length < 2) {
    mensajeFeedback = "⚠️ Alson dice: Debes trazar al menos dos puntos para representar la función.";
    graficoEsCorrecto = false;
    modoEvaluacion = true;
    return;
  }

  let aciertos = 0;
  for (let p of puntos) {
    let valorEsperadoF = ejer.f(p.x);
    if (abs(p.y - valorEsperadoF) < 0.3) aciertos++;
  }

  let porcentajeAcierto = aciertos / puntos.length;
  if (porcentajeAcierto >= 0.8) {
    mensajeFeedback = "🎉 " + ejer.feedbackCorrecto;
    graficoEsCorrecto = true;
  } else {
    mensajeFeedback = "❌ " + ejer.feedbackIncorrecto;
    graficoEsCorrecto = false;
  }
  modoEvaluacion = true;
}

// Retorna el color del texto según los estándares de Fragata
function graphicsColorFeedback() {
  return graficoEsCorrecto ? color(21, 87, 36) : color(114, 28, 36);
}

function dibujarCurvaTeorica(funcionMatematica, colorLinea) {
  stroke(colorLinea); strokeWeight(2); noFill();
  beginShape();
  for (let cx = -5; cx <= 5; cx += 0.1) vertex(mapX(cx), mapY(funcionMatematica(cx)));
  endShape();
}

function dibujarPlanoCartesiano() {
  stroke(240); strokeWeight(1);
  for (let i = -5; i <= 5; i++) {
    line(mapX(i), 0, mapX(i), height); line(0, mapY(i), width, mapY(i));
  }
  stroke(120); strokeWeight(2);
  line(width / 2, 0, width / 2, height); line(0, height / 2, width, height / 2);
}

function mapX(x) { return map(x, -5, 5, 0, width); }
function mapY(y) { return map(y, -5, 5, height, 0); }
function mapP5toX(px) { return map(px, 0, width, -5, 5); }
function mapP5toY(py) { return map(py, height, 0, -5, 5); }

// EVENTOS DE CONTROL MOUSE/TACTIL
window.mousePressed = function() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  for (let i = 0; i < puntos.length; i++) {
    if (dist(mouseX, mouseY, mapX(puntos[i].x), mapY(puntos[i].y)) < radioPunto) {
      puntoSeleccionado = i; return;
    }
  }
  puntos.push(createVector(mapP5toX(mouseX), mapP5toY(mouseY)));
};
window.mouseDragged = function() {
  if (puntoSeleccionado !== null) {
    puntos[puntoSeleccionado].x = mapP5toX(mouseX);
    puntos[puntoSeleccionado].y = mapP5toY(mouseY);
  }
};
window.mouseReleased = function() { puntoSeleccionado = null; };
