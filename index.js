const scriptURL = 'https://script.google.com/macros/s/AKfycbzgkAKEdNsHkyWEMnfqIZCV7rJy5g4e0-HNnSKxZjl35tntH8LW0fQKosc5ILNkJA2A/exec';

const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Проверяем, выбран ли вариант ответа
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
    responseMessage.textContent = 'Пожалуйста, выберите вариант ответа.';
    responseMessage.style.color = '#eb2020';
    return;
  }

  // Блокируем кнопку и показываем лоадер
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span>';

  const nameValue = document.getElementById('name').value.trim();
  const answer = selectedOption.value;

  const data = {
    name: nameValue,
    answer: answer
  };

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((res) => {
      console.log('Успех!', res);
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Отправить';
      responseMessage.textContent = 'Спасибо! Ваш ответ отправлен.';
      responseMessage.style.color = '#292524';
      form.reset();
    })
    .catch(error => {
      console.error('Ошибка!', error);
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Отправить';
      responseMessage.textContent = 'Произошла ошибка. Попробуйте ещё раз.';
    });
});
