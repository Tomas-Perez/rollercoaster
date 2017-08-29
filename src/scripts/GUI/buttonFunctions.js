function toggleMenu(idBtn, idMenu) {
    $('#' + idMenu).toggle("slide", {
        direction: "right"
    }, 1000);
    btnCooldown(idBtn)
}

function btnCooldown(idbtn){
    $('#' + idbtn).prop('disabled',true);
    window.setTimeout(function(){
        $('#' + idbtn).prop('disabled',false);
    },1500);
}
