'use strict';
const url = 'http://10.114.34.40/~jesseraj/Projekti/wop-projekti/'; // change url when uploading to server

// select existing html elements
const addForm = document.querySelector('#addMemeForm');
const userList = document.querySelector('.add-owner');

// submit add meme form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch(url + '/meme', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'front.html';
});
