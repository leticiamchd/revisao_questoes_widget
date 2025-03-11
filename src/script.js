document.getElementById('generate').addEventListener('click', function() {
  var total = parseInt(document.getElementById('total').value);
  var correct = parseInt(document.getElementById('correct').value);
  var resultDiv = document.getElementById('result');

  // Validação dos dados de entrada
  if (isNaN(total) || isNaN(correct) || total <= 0 || correct < 0 || correct > total) {
    resultDiv.textContent = 'Por favor, insira números válidos.';
    return;
  }

  // Calcula a porcentagem de acertos
  var percentage = (correct / total) * 100;
  
  // Determina o intervalo de revisão (em dias) com base nas regras:
  // - Até 50%: Revisão em 3 dias
  // - Entre 55% e menos de 60%: Revisão em 8 dias
  // - Entre 60% e menos de 65%: Revisão em 13 dias
  // - Entre 65% e menos de 70%: Revisão em 18 dias
  // - Entre 70% e menos de 75%: Revisão em 23 dias
  // - Entre 75% e menos de 80%: Revisão em 28 dias
  // - 80% ou mais: Revisão em 40 dias
  var daysToReview = 0;
  if (percentage <= 50) {
    daysToReview = 3;
  } else if (percentage < 55) {
    daysToReview = 3;
  } else if (percentage < 60) {
    daysToReview = 8;
  } else if (percentage < 65) {
    daysToReview = 13;
  } else if (percentage < 70) {
    daysToReview = 18;
  } else if (percentage < 75) {
    daysToReview = 23;
  } else if (percentage < 80) {
    daysToReview = 28;
  } else {
    daysToReview = 40;
  }

  // Calcula a próxima data de revisão
  var currentDate = new Date();
  var nextReviewDate = new Date(currentDate);
  nextReviewDate.setDate(currentDate.getDate() + daysToReview);

  // Formata a data da revisão (ex: "25 de julho de 2025")
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var formattedDate = nextReviewDate.toLocaleDateString('pt-BR', options);

  // Exibe o resultado
  resultDiv.innerHTML = 
    "Revisão em <strong>" + daysToReview + " dia(s)</strong><br>" +
    "Próxima revisão: <strong>" + formattedDate + "</strong>";
});
