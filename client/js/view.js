//TAMPILIN SESUATU

function showListMusic(data) {
    $('#search-data').empty();
    $('#search-head').empty();
    $('#search-head').append(`
            <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Action</th>
        </tr>
    `);
    data.forEach(x => {
        $('#search-data').append(`
            <tr>
                <td>${x.name}</td>
                <td>${x.artist}</td>
                <td><button onclick="addPlaylist('${x.name}', '${x.artist}')">Add To My Playlist</button></td>
            </tr>
        `)
    });
}