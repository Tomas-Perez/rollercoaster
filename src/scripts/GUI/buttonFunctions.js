function toggleVarMenu(btnid) {
    $('#varRightMenu').toggle("slide", {
        direction: "right"
    }, 2000);
}

function toggleExpMenu() {
    $('#expRightMenu').toggle("slide", {
        direction: "right"
    }, 2000);
}

function btnCooldown(btnid){
    $('#' + btnid).prop('disabled',true)
    window.setTimeout(function(){
        $(btnid).prop('disabled',false);
    },2000);
}
