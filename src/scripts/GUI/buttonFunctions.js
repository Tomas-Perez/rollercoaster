function toggleMenu(idBtn, idMenu, path) {
    $('#' + idMenu).toggle("slide", {
        direction: "right"
    }, 1000);
    btnCooldown(idBtn, path)
}

function btnCooldown(idbtn, path){
    $('#' + idbtn).prop('disabled',true);
    window.setTimeout(function(){
        $('#' + idbtn).prop('src', path);
        $('#' + idbtn).prop('disabled',false);
    },1500);
}
