const scriptURL = 'https://script.google.com/macros/s/AKfycbzgkAKEdNsHkyWEMnfqIZCV7rJy5g4e0-HNnSKxZjl35tntH8LW0fQKosc5ILNkJA2A/exec';

const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');
const nameInput = document.getElementById('name');
const radioInputs = document.querySelectorAll('input[name="answer"]');
const responseMessage = document.getElementById('responseMessage');

// Изначально кнопка неактивна
submitBtn.disabled = true;

// Функция проверки заполненности обязательных полей
function checkFormValidity() {
  const isNameFilled = nameInput.value.trim() !== "";
  const isRadioSelected = Array.from(radioInputs).some(radio => radio.checked);
  submitBtn.disabled = !(isNameFilled && isRadioSelected);
}

// Обработчики событий для обновления статуса кнопки
nameInput.addEventListener('input', checkFormValidity);
radioInputs.forEach(radio => {
  radio.addEventListener('change', checkFormValidity);
});

form.addEventListener('submit', e => {
  e.preventDefault();

  // Сброс сообщений
  responseMessage.textContent = '';

  // Проверяем, выбран ли вариант ответа
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
    responseMessage.textContent = 'Пожалуйста, выберите вариант ответа.';
    return;
  }

  // Блокируем кнопку и показываем лоадер
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Отправка...';

  const nameValue = nameInput.value.trim();
  const answer = selectedOption.value;

  const data = {
    name: nameValue,
    answer: answer
  };

  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((res) => {
      console.log('Успех!', res);
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Отправить';
      responseMessage.textContent = 'Спасибо! Ваш ответ отправлен.';
      form.reset();
      // После сброса обновляем статус кнопки
      checkFormValidity();
    })
    .catch(error => {
      console.error('Ошибка!', error);
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Отправить';
      responseMessage.textContent = 'Произошла ошибка. Попробуйте ещё раз.';
    });
});