// Tasas de cambio de ejemplo (fijas para el sketch)
const exchangeRates = {
  USD: { EUR: 0.92, ARS: 1000, MXN: 17.1, USD: 1 },
  EUR: { USD: 1.09, ARS: 1085, MXN: 18.5, EUR: 1 },
  ARS: { USD: 0.001, EUR: 0.00092, MXN: 0.017, ARS: 1 },
  MXN: { USD: 0.058, EUR: 0.054, ARS: 58.5, MXN: 1 }
};

// Referencias del DOM
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const resultText = document.getElementById('result-text');
const notesInput = document.getElementById('notes-input');
const historyList = document.getElementById('history-list');

function updateConversion() {
  const amount = parseFloat(amountInput.value) || 0;
  const from = fromSelect.value;
  const to = toSelect.value;

  // Calcular resultado
  const rate = exchangeRates[from][to];
  const total = (amount * rate).toFixed(2);

  // Mostrar en pantalla el resultado principal
  resultText.textContent = `${total} ${to}`;

  // Formato de texto para el registro
  const timeString = new Date().toLocaleTimeString();
  const logText = `[${timeString}] Conversión: ${amount} ${from} ➔ ${total} ${to}`;

  // 1. Escribir / actualizar en el área principal de notas
  notesInput.value = `Nota de cálculo:\nSe convirtieron ${amount} ${from} obteniendo ${total} ${to} (Tasa aprox: ${rate}).\n\n--- Anotaciones Adicionales ---\n`;

  // 2. Agregar ítem al historial rápido
  const newHistoryItem = document.createElement('div');
  newHistoryItem.className = 'note-item';
  newHistoryItem.textContent = logText;

  // Limitar a los últimos 3 registros
  if (historyList.children.length >= 3) {
    historyList.removeChild(historyList.lastChild);
  }
  historyList.prepend(newHistoryItem);
}

// Escuchar eventos de cambio de input y select
amountInput.addEventListener('input', updateConversion);
fromSelect.addEventListener('change', updateConversion);
toSelect.addEventListener('change', updateConversion);

// Ejecución inicial al cargar
updateConversion();
