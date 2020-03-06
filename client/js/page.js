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
        if(localStorage.getItem('google')){
            $('#btn-edit-password').hide()
        }else{
            $('#btn-edit-password').show()
        }

        showList()
    } else if(data === 'my-lyric'){
        changePage('my-lyric');
    } else if(data === 'search-data') {
        $('#search-form')[0].reset();
        $('#search-data').empty();
        changePage('search-page');
    } else if (data === 'register') {
        changePage('registerPage')
    } else if (data === 'login') {
        changePage('loginPage')
    }else if(data === 'editPassword'){
        changePage('edit-password')
    }
}