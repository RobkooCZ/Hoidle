// document.addEventListener('DOMContentLoaded', function () {
//   var hasPopupBeenShown = localStorage.getItem('popupShown');
//   var modal = document.getElementById('myModal');
//   var continueButton = document.getElementById('continueButton');

//   if (!hasPopupBeenShown) {
//       // Show the pop-up
//       modal.style.display = 'block';

//       // Set a flag indicating that the pop-up has been shown
//       localStorage.setItem('popupShown', 'true');
//   }

//   // Hide the modal when the "Continue" button is clicked
//   continueButton.addEventListener('click', function () {
//       modal.style.display = 'none';
//   });
// });


console.log('test')
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

var bodyElement = document.body;
var currentIndex = -1;

    
function getRandomIndex() {
    var newIndex;
    do {
        newIndex = Math.floor(Math.random() * backgroundImages.length);
    } while (newIndex === currentIndex);
    currentIndex = newIndex;
    return currentIndex;
}

function changeBackground() {
    var randomIndex = getRandomIndex();
    bodyElement.style.backgroundImage = backgroundImages[randomIndex];
}

  // Change background every 10 seconds (10000 milliseconds)
setInterval(changeBackground, 10000);
