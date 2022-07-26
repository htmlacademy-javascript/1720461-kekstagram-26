// функция получения данных
function getData (functionOnSuccess, functionOnFail) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      functionOnSuccess(data);
    }).catch(() => functionOnFail());
}


// функция отправки данных
function sendData (functionOnSuccess, functionOnFail, requestBody) {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: requestBody,
    },
  ).then((response) => {
    if (response.ok) {
      functionOnSuccess();
    } else {
      functionOnFail();

    }
  }).catch(() => functionOnFail());
}


export {getData, sendData};
