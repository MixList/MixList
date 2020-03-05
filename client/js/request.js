//AJAX
function showList(){
    $.ajax({
        url: 'http://localhost:3000/playlist',
        method: 'GET',
        headers: {token: localStorage.getItem('token')},
        success: function(data){
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

function deleteList(id){
    $.ajax({
        url: `http://localhost:3000/playlist/${id}`,
        method: 'DELETE',
        headers: {token: localStorage.getItem('token')},
        success: function(data){
            setPage('my-list');
        }
    })
}

function findLyric(title, artist){
    $.ajax({
        url: `https://api.lyrics.ovh/v1/${artist}/${title}`,
        method: 'GET',
        success: function(data){
            let lyricContent = data.lyrics
            let lyricSplitted = lyricContent.split('\n')
            
            $('#my-lyric').append(`<h1 class="dataLyric">${title} - ${artist}</h1>`);

            lyricSplitted.forEach(lyricsData => {
                $('#my-lyric').append(`<h3 class="dataLyric">${lyricsData}</h3>`);
            });
            setPage('my-lyric');
        }})
}
const endpoint = 'http://localhost:3000';

function getMusic(search) {
    console.log(search);
    $.ajax({
        method: 'POST',
        url: `${endpoint}/playlist/search`,
        data: JSON.stringify(search),
        contentType: `application/json`
    })
    .then(data => {
        showListMusic(data);
    })
}