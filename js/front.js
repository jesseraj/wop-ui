'use strict';
const url = 'http://10.114.34.40/~jesseraj/Projekti/wop-projekti/'; // change url when uploading to server

// select existing html elements
const ul = document.querySelector('.meemilista');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

// create meme cards
const createMemeCards = (memes) => {
  // clear ul
  ul.innerHTML = '';
  memes.forEach((meme) => {
    // create li with DOM methods
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + meme.filename;
    img.alt = meme.name;
    img.classList.add('meemi');

    // open image in single.html
    img.addEventListener('click', () => {
      location.href = 'single.html?id=' + meme.meme_id;
    });

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.classList.add('meemiOtsikko');
    h2.innerHTML = user.name;

    const p1 = document.createElement('p');
    p1.classList.add('meemiTiedot');
    p1.innerHTML = `Meemin-nimi: ${meme.name}`;

    const p2 = document.createElement('p');
    p2.classList.add('meemiTiedot');
    p2.innerHTML = `Description: ${meme.description}`;

    const p3 = document.createElement('p');
    p3.classList.add('meemiTiedot');
    p3.innerHTML = `Owner: ${user.name}`;

    const li = document.createElement('li');
    li.classList.add('postaus');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    ul.appendChild(li);
    if (user.role === 0 || user.user_id === meme.owner) {
      // link to modify form
      const modButton = document.createElement('a');
      modButton.innerHTML = 'Modify';
      modButton.href = `modify-meme.html?id=${meme.meme_id}`;
      modButton.classList.add('modbutton');

      // delete selected meme
      const delButton = document.createElement('button');
      delButton.innerHTML = 'Delete';
      delButton.classList.add('delbutton');
      delButton.addEventListener('click', async () => {
        const fetchOptions = {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        };
        try {
          const response = await fetch(
            url + '/meme/' + meme.meme_id,
            fetchOptions
          );
          const json = await response.json();
          console.log('delete response', json);
          getMeme();
        } catch (e) {
          console.log(e.message);
        }
      });

      li.appendChild(modButton);
      li.appendChild(delButton);
    }
  });
};

// AJAX call
const getMeme = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/meme', fetchOptions);
    const memes = await response.json();
    createMemeCards(memes);
  } catch (e) {
    console.log(e.message);
  }
};
getMeme();
