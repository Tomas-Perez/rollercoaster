function toggleMenu(idBtn, idMenu) {
    $('#' + idMenu).toggle("slide", {
        direction: "right"
    }, 1500);
    btnCooldown(idBtn)
}

function btnCooldown(idbtn){
    $('#' + idbtn).prop('disabled',true)
    window.setTimeout(function(){
        $('#' + idbtn).prop('disabled',false);
    },2500);
}
