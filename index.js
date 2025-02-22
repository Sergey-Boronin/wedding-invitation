const scriptURL = 'https://script.google.com/macros/s/AKfycbxYBXRlg2CQBOJ9aMV2LwxzntCB2pJuOSdqai93eVo5GRgYgOhKkmNbVpnBcoYct0-d/exec';

const form = document.getElementById('weddingForm');

form.addEventListener('submit', e => {
  e.preventDefault(); 

  const nameValue = document.getElementById('name').value.trim();
  const yesChecked = document.getElementById('yesCheck').checked;
  const noChecked = document.getElementById('noCheck').checked;

  let attendance = '';
  if (yesChecked && !noChecked) {
    attendance = 'yes';
  } else if (!yesChecked && noChecked) {
    attendance = 'no';
  } else if (yesChecked && noChecked) {
    attendance = 'yes and no';
  } else {
    attendance = 'undecided';
  }


  const data = {
    name: nameValue,
    answer: attendance
  };


  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((res) => {
      console.log('Успех!', res);
      alert('Спасибо! Ваш ответ отправлен.');
      form.reset();
    })
    .catch(error => {
      console.error('Ошибка!', error);
      alert('Произошла ошибка. Попробуйте ещё раз.');
    });
});