document.addEventListener("DOMContentLoaded", function() { 
    const themeSwitch = document.getElementById("theme-switch");
    const themeLink = document.getElementById("theme-link");
    const closeButton = document.getElementById("closeButton");
    const img = closeButton.querySelector("img");

    // Check if there's a saved theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");

    // Set the initial theme based on the saved preference, or default to light theme
    if (savedTheme === "dark") {
        themeSwitch.checked = true;
        themeLink.setAttribute("href", "../../src/assets/css/legacy-darkInfoStyle.css");
        img.setAttribute("src", "../../src/assets/images/icons/x-white.png");
    }

    // Event listener for theme switch
    themeSwitch.addEventListener("change", function() {
        location.reload();
        if (themeSwitch.checked) {
            themeLink.setAttribute("href", "../../src/assets/css/legacy-darkInfoStyle.css");
            img.setAttribute("src", "../../src/assets/images/icons/x-white.png");
            // Save theme preference to localStorage
            localStorage.setItem("theme", "dark");
        } else {
            themeLink.setAttribute("href", "../../src/assets/css/legacy-lightInfoStyle.css");
            img.setAttribute("src", "../../src/assets/images/icons/x.png");
            // Save theme preference to localStorage
            localStorage.setItem("theme", "light");
        }
    });
});
