// LÓGICA DE VALIDACIÓN PARA EL PANEL ANALÍTICO (Izquierda)
document.getElementById('btn-validar-analitica').addEventListener('click', () => {
  const ecuacionUser = document.getElementById('input-ecuacion').value.trim().replace(/\s+/g, '');
  const corteUser = document.getElementById('input-corte').value.trim();
  const intervaloUser = document.getElementById('input-intervalo').value.trim().toLowerCase().replace(/\s+/g, '');
  
  const feedbackDiv = document.getElementById('feedback-analitico');
  
  // Respuestas esperadas simplificadas para el modelo
  const ecuacionCorrecta = "x=-x+1";
  const corteCorrecto = "0.5";
  const corteCorrectoFraccion = "1/2";
  const intervaloCorrecto = "(-inf,0.5)";

  // Validación por descarte
  if (ecuacionUser !== ecuacionCorrecta) {
    feedbackDiv.className = "feedback-caja fragata-errado";
    feedbackDiv.innerText = "❌ La ecuación asociada es incorrecta. Recuerda igualar f(x) y g(x) para buscar dónde se cruzan.";
    return;
  }
  
  if (corteUser !== corteCorrecto && corteUser !== corteCorrectoFraccion) {
    feedbackDiv.className = "feedback-caja fragata-errado";
    feedbackDiv.innerText = "❌ El punto de corte no es correcto. Despeja la ecuación asociada x = -x + 1.";
    return;
  }
  
  if (intervaloUser !== intervaloCorrecto) {
    feedbackDiv.className = "feedback-caja fragata-errado";
    feedbackDiv.innerText = "❌ El intervalo de la solución es errado. Mira el gráfico: ¿en qué tramo del eje X la recta f(x) camina por debajo de g(x)?";
    return;
  }

  // ¡Si pasa todos los filtros, es correcto (Estilo Verde Fragata)!
  feedbackDiv.className = "feedback-caja fragata-correcto";
  feedbackDiv.innerText = "🎉 ¡Excelente análisis! Has determinado correctamente el punto crítico analítico y el intervalo solución.";
});
// LÓGICA DE VALIDACIÓN PARA EL PANEL ANALÍTICO (Izquierda)
document.getElementById('btn-validar-analitica').addEventListener('click', () => {
  const ecuacionUser = document.getElementById('input-ecuacion').value.trim().replace(/\s+/g, '');
  const corteUser = document.getElementById('input-corte').value.trim();
  const intervaloUser = document.getElementById('input-intervalo').value.trim().toLowerCase().replace(/\s+/g, '');
  
  const feedbackDiv = document.getElementById('feedback-analitico');
  
  // Respuestas esperadas simplificadas para el modelo
  const ecuacionCorrecta = "x=-x+1";
  const corteCorrecto = "0.5";
  const corteCorrectoFraccion = "1/2";
  const intervaloCorrecto = "(-inf,0.5)";

  // Validación por descarte
  if (ecuacionUser !== ecuacionCorrecta) {
    feedbackDiv.className = "feedback-caja fragata-errado";
    feedbackDiv.innerText = "❌ La ecuación asociada es incorrecta. Recuerda igualar f(x) y g(x) para buscar dónde se cruzan.";
    return;
  }
  
  if (corteUser !== corteCorrecto && corteUser !== corteCorrectoFraccion) {
    feedbackDiv.className = "feedback-caja fragata-errado";
    feedbackDiv.innerText = "❌ El punto de corte no es correcto. Despeja la ecuación asociada x = -x + 1.";
    return;
  }
  
  if (intervaloUser !== intervaloCorrecto) {
    feedbackDiv.className = "feedback-caja fragata-errado";
    feedbackDiv.innerText = "❌ El intervalo de la solución es errado. Mira el gráfico: ¿en qué tramo del eje X la recta f(x) camina por debajo de g(x)?";
    return;
  }

  // ¡Si pasa todos los filtros, es correcto (Estilo Verde Fragata)!
  feedbackDiv.className = "feedback-caja fragata-correcto";
  feedbackDiv.innerText = "🎉 ¡Excelente análisis! Has determinado correctamente el punto crítico analítico y el intervalo solución.";
});
