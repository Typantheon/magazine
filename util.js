
// Change whole theme on click, themepath is the relative path to where CSS is located
function changeTheme(themepath, issue){
    if (typeof themepath === 'string'){
        document.getElementById("theme-selector").setAttribute("href", themepath);
        return true;
    }else{
        return false;
    }
}
