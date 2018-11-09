
var preloader = document.getElementById("preloader");
var fadeIn = document.getElementsByClassName("fadeIn");
var section = document.getElementsByTagName("section");
var scrollBtn = document.getElementById("scrollTop");

scrollBtn.onclick = scrollToTop;

function scrollToTop() {
    let timeOut;
    if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0) {
        window.scrollBy(0,-50);
        timeOut = setTimeout('scrollToTop()',10);
    } else {
        clearTimeout(timeOut);
    }
}
window.addEventListener("scroll", function (event) {
    var scroll = this.scrollY;
    console.log(scroll)
    if (scroll === 0 ) {
        scrollBtn.style.display = "none";
    } else {
        scrollBtn.style.display = "block";
    }
});

window.onload = function() {
    preloader.classList.add('hidepreloader');
}