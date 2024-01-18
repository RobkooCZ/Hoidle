document.addEventListener('DOMContentLoaded', function () {
    var hasPopupBeenShown = localStorage.getItem('popupShown');
    var modal = document.getElementById('myModal');
    var continueButton = document.getElementById('continueButton');

    if (!hasPopupBeenShown) {
        // Show the pop-up
        modal.style.display = 'block';

        // Set a flag indicating that the pop-up has been shown
        localStorage.setItem('popupShown', 'true');
    }

    // Hide the modal when the "Continue" button is clicked
    continueButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Hide the modal when clicking outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

var backgroundImages = [
    'url(images/qQiK21B.jpg)',
    'url(images/steamuserimages-a.akamaihd.jpg)',
    'url(images/luxa.org-opacity-changed-wallpaper (1).jpg)',
    'url(images/wp4001641-hoi4-wallpapers.png)',
    'url(images/wp4001645-hoi4-wallpapers.png)',
    'url(images/wp4568090-hoi4-wallpapers.jpg)',
    'url(images/wp4615565-hoi4-wallpapers.png)',
    'url(images/wp4615570-hoi4-wallpapers.jpg)',
    'url(images/wp4615571-hoi4-wallpapers.jpg)',
    'url(images/wp4615572-hoi4-wallpapers.jpg)',
    'url(images/wp4615573-hoi4-wallpapers.jpg)',
    'url(images/wp4615575-hoi4-wallpapers.jpg)',
    'url(images/wp4615589-hoi4-wallpapers.jpg)',
    'url(images/wp4615591-hoi4-wallpapers.jpg)',
    'url(images/wp4615596-hoi4-wallpapers.jpg)',
    'url(images/wp4615602-hoi4-wallpapers.png)',
    'url(images/wp4615603-hoi4-wallpapers.jpg)',
    'url(images/wp4615636-hoi4-wallpapers.jpg)',
    'url(images/wp4615637-hoi4-wallpapers.jpg)',
    'url(images/RDT_20231223_155818285154863569026849.jpg)',
];

// Get reference to the body element of the HTML document
var bodyElement = document.body;

// Initialize currentIndex to keep track of the current background index
var currentIndex = -1;

// Function to generate a random index for the backgroundImages array
function getRandomIndex() {
    var newIndex;
    
    // Ensure the new index is different from the current index
    do {
        newIndex = Math.floor(Math.random() * backgroundImages.length);
    } while (newIndex === currentIndex);
    
    // Update currentIndex with the new index
    currentIndex = newIndex;
    
    // Return the new index
    return currentIndex;
}

// Function to change the background of the body element
function changeBackground() {
    // Get a random index using the getRandomIndex function
    var randomIndex = getRandomIndex();
    
    // Set the background image of the body element to the selected image
    bodyElement.style.backgroundImage = backgroundImages[randomIndex];
}

// Change the background every 10 seconds (10000 milliseconds) using setInterval
setInterval(changeBackground, 10000);

