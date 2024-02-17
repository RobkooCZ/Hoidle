document.addEventListener("DOMContentLoaded", function() {
  const savedTheme = localStorage.getItem("theme");

  // Check if the saved theme is light
  if (savedTheme === "light") {
      // Get the current path
      var path = window.location.pathname;
      path = path.substring(0, path.lastIndexOf('/'));

      // Define the base path for images
      var basePath;

      // Check if the current path contains 'picture_info'
      if (path.includes('/picture_info')) {
          // If the current path contains 'picture_info', adjust the basePath accordingly
          basePath = '../../src/assets/images/background/';
      } else {
          // If the current path does not contain 'picture_info', use the default path
          basePath = '../src/assets/images/background/';
      }

      // Define the image names
      var imageNames = [
          'tanksOnTheBeach.jpg',
          'KasierLookingAtTheEiffelTower.jpg',
          'KaiserByTheEiffelTower.jpg',
          'tankBattleOnSnowyPlains.png',
          'submarineBattle.png',
          'tankInNoMansLand.jpg',
          'tanksInTheDesert.png',
          'rocketSilo.jpg',
          'tanksInTheCity.jpg',
          'tanksInTheWinter.jpg',
          'airAndNavyBattle.jpg',
          'airplanesOverAVillage.jpg',
          'tanksInBadWeather.jpg',
          'tanksAndAirCombo.jpg',
          'NuclearAttackOnNYC.jpg',
          'normandyLandings.png',
          'aLoneTank.jpg',
          'airplaneOverDestryoedLand.jpg',
          'tankInSovietWinter.jpg',
      ];

      // Create the full image paths
      var backgroundImages = imageNames.map(function(name) {
          return 'url(' + basePath + name + ')';
      });

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
  }
});


// Array of links with associated weights
var links = [
  { url: "https://galuszka.cz", weight: 1 },
  { url: "https://github.com/KejBeg", weight: 50 },
];

// Function to generate a random link based on weights
function weightedRandom(arr)
{
var weightSum = arr.map(l => l.weight).reduce((a, b) => a + b, 0);
var rand = Math.random() * weightSum;

var accumulated = 0;
for (var i = 0; i < arr.length; i++)
{
  if (rand < accumulated + arr[i].weight)
  {
    return arr[i];
  }
  
  accumulated += arr[i].weight;
}
}

// Function to open a random site
function openSite() {
var link = weightedRandom(links);

var win = window.open(link.url);
win.focus();
}

// Function to perform an experiment
function experiment()
{
var testsCount = 10000;
var counts = {};

for (var i = 0; i < links.length; i++)
{
  counts[links[i].url] = 0;
}

for (var i = 0; i < testsCount; i++)
{
  var link = weightedRandom(links);
  counts[link.url]++;
}
}

experiment(); // Execute the experiment

document.getElementById('settingsButton').addEventListener('click', function() {
  document.getElementById('settingsOverlay').style.display = 'flex';
});

document.getElementById('closeButton').addEventListener('click', function() {
  document.getElementById('settingsOverlay').style.display = 'none';
});
