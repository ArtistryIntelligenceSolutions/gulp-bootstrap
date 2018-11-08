var preloader = document.getElementById("preloader");
var fadeIn = document.getElementsByClassName("fadeIn");
var section = document.getElementsByTagName("section");
var scrollTop = document.getElementById("scrollTop");
scrollTop.onclick = scrollToTop;
function scrollToTop() {
    var timeOut;
    if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
        window.scrollBy(0, -50);
        timeOut = setTimeout('scrollToTop()', 10);
    }
    else {
        clearTimeout(timeOut);
    }
}
window.onload = function () {
    preloader.classList.add('hidepreloader');
};
