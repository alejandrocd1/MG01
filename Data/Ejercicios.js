// Data/ejercicios.js

const capitulo5Data = {
  titulo: "Capítulo 5: Inecuaciones por el Método Gráfico",
  
  ejercicioActual: {
    id: "ejercicio_propuesto_1",
    inecuacionTexto: "x < -x + 1",
    f_x_texto: "f(x) = x",
    g_x_texto: "g(x) = -x + 1",
    
    // Funciones matemáticas reales para evaluar
    f: (x) => x,
    g: (x) => -x + 1,
    
    // Punto de corte teórico obtenido del desarrollo analítico (x = 0.5)
    puntoCorteReal: 0.5,
    
    // Respuestas correctas esperadas del estudiante
    intervaloCorrecto: { min: -Infinity, max: 0.5 },
    
    feedbackCorrecto: "¡Excelente! Has moldeado las funciones correctamente e identificado la región en el eje X donde f(x) está por debajo de g(x).",
    feedbackIncorrecto: "Revisa los puntos en el plano. Recuerda que la recta f(x) = x debe quedar por debajo de g(x) = -x + 1."
  }
};

export default capitulo5Data;
