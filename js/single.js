'use strict';
const url = 'http://10.114.34.40/~jesseraj/Projekti2/wop-projekti/'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// get id from address
const meme_id = getQParam('id');

// select existing html elements
const img = document.querySelector('#image img');

// add existing meme data to form
const getMeme = async (id) => {
  const fetchOptions = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/meme/' + id, fetchOptions);
  const meme = await response.json();
  img.src = `${url}/${meme.filename}`;
  addMarker(JSON.parse(meme.coords));
};

getMeme(meme_id);
