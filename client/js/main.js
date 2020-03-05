// BUAT EVENT LISTENER BUTTON (on click dll)
$(document).ready(function(){
    if(localStorage.getItem('token')){
        setPage('my-list');
    }else{
        //Login
    }

    $(document).on('click', '.btn-delete', function(){
        let idDelete = $(this).data('id');

        deleteList(idDelete);
    })

    $(document).on('click', '.btn-lyric', function(){
        let title = $(this).data('title');
        let artist = $(this).data('artist');

        findLyric(title, artist);
    })

    $('#btn-back-lyric').on('click', function(){
        setPage('my-list');
    })
})