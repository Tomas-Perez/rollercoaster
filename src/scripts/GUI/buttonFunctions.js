var isVarMenuOpen = false;
var isExpMenuOpen = false;
var varMenu = "varRightMenu";
var expMenu = "expRightMenu";

function toggleMenu(idBtn, idMenu, path) {
    closeOpened(idMenu);
    if(idMenu == varMenu)
        isVarMenuOpen = !isVarMenuOpen;
    if(idMenu == expMenu)
        isExpMenuOpen = !isExpMenuOpen;
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
    },1250);
}

function closeOpened(idMenu){
    if(isVarMenuOpen && idMenu != varMenu){
        isVarMenuOpen = false;
        $('#'+varMenu).toggle("slide", {
            direction: "right"
        }, 1000);
    }
    if(isExpMenuOpen && idMenu != expMenu){
        isExpMenuOpen = false;
        $('#'+expMenu).toggle("slide", {
            direction: "right"
        }, 1000);
    }
}
