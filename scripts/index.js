var searchIcon = document.querySelector(".header nav .header__icon");
searchIcon.addEventListener("click", function () {
    let searchButton = document.querySelector(".search");

    visibility = window.getComputedStyle(searchButton, null).visibility;

    if (visibility == "visible") {
        searchButton.style.maxHeight = "0";
        searchButton.style.visibility = "hidden";

    }
    else if (visibility == "hidden") {
        searchButton.style.maxHeight = "10rem";
        searchButton.style.visibility = "visible";

    }

})