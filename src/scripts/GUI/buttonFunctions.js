function toggleVarMenu(idbtn) {
    $('#varRightMenu').toggle("slide", {
        direction: "right"
    }, 2000);
    btnCooldown(idbtn)
}

function toggleExpMenu() {
    $('#expRightMenu').toggle("slide", {
        direction: "right"
    }, 2000);
}

function btnCooldown(idbtn){
    $('#' + idbtn).prop('disabled',true)
    window.setTimeout(function(){
        $('#' + idbtn).prop('disabled',false);
    },5000);
}
