//AJAX
const endpoint = 'http://localhost:3000';
let url = "http://localhost:3000"
let token = localStorage.getItem('token')

function showList() {
  $.ajax({
    url: 'http://localhost:3000/playlist',
    method: 'GET',
    headers: { token: localStorage.getItem('token') },
    success: function (data) {
      data.forEach(todos => {
        $('#table-list').append(`   <tr class="list-content">
          <td>${todos.title}</td>
          <td>${todos.artist}</td>
          <td>
          <button data-id="${todos.id}" class="btn-delete">REMOVE FROM LIST</button>
          <button data-title="${todos.title}" data-artist="${todos.artist}" class="btn-lyric">FIND LYRIC</button>
          </td>
          </tr>`);

      });

      $('#table-list')
    }
  })
}

function deleteList(id) {
  $.ajax({
    url: `http://localhost:3000/playlist/${id}`,
    method: 'DELETE',
    headers: { token: localStorage.getItem('token') },
    success: function (data) {
      setPage('my-list');
    }
  })
}

function findLyric(title, artist) {
  $.ajax({
    url: `https://api.lyrics.ovh/v1/${artist}/${title}`,
    method: 'GET',
    success: function (data) {
      let lyricContent = data.lyrics
      let lyricSplitted = lyricContent.split('\n')

      $('#my-lyric').append(`<h1 class="dataLyric">${title} - ${artist}</h1>`);

      lyricSplitted.forEach(lyricsData => {
        $('#my-lyric').append(`<h3 class="dataLyric">${lyricsData}</h3>`);
      });
      setPage('my-lyric');
    }
  })
}

function getMusic(search) {
  $.ajax({
    method: 'POST',
    url: `${endpoint}/playlist/search`,
    data: JSON.stringify(search),
    contentType: `application/json`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      showListMusic(data);
    }).fail(err => {
      console.log(err);
    })
}

function addPlaylist(title, artist) {
  let obj = {
    title,
    artist
  }
  $.ajax({
    method: 'POST',
    url: `${endpoint}/playlist`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: JSON.stringify(obj),
    contentType: `application/json`
  })
    .done(data => {
      setPage('my-list');
    }).fail(err => {
      console.log(err);
    });
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  // console.log(id_token); 
  $.ajax({
    url: `${url}/users/googleLogin`,
    method: "POST",
    data: {
      token: id_token,
    },
  })
    .done(data => {
      console.log(data);
      token = localStorage.setItem('token', data)
      setPage('my-list')
    })
    .catch(err => {
      console.log(err);
    })
}

function register() {
  console.log($('#usernameReg').val(),
    $('#emailReg').val(),
    $('#passwordReg').val());

  $.ajax({
    url: `${url}/users/register`,
    method: "POST",
    data: {
      username: $('#usernameReg').val(),
      email: $('#emailReg').val(),
      password: $('#passwordReg').val()
    }
  })
    .done(data => {
      console.log(data);
      localStorage.setItem("token", data)
      token = localStorage.getItem("token")
      setPage('my-list')
    })
}

function login() {
  $.ajax({
    url: `${url}/users/login`,
    method: "POST",
    data: {
      username: $('#usernameLog').val(),
      email: $('#emailLog').val(),
      password: $('#passwordLog').val(),
    },
  })
    .done(data => {
      // console.log(data);
      localStorage.setItem("token", data)
      token = localStorage.getItem("token")
      setPage('my-list')
    })
}

function logout() {
  localStorage.removeItem('token')
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  setPage('login')
}