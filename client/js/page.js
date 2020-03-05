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
    }
}