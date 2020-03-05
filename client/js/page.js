//GANTI PAGE

function changePage(data){
    $('.allPages').hide();
    $(`#${data}`).show();
}

function setPage(data){
    if(data === 'my-list'){
        $('.dataLyric').empty();
        $('.list-content').empty();
        changePage('my-list');
        showList()
    } else if(data === 'my-lyric'){
        changePage('my-lyric');
    } else if(data === 'search-data') {
        $('#search-form')[0].reset();
        $('#search-data').empty();
        changePage('search-page');
    }
}