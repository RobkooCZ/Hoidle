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
    'url(../src/assets/images/background/qQiK21B.jpg)',
    'url(../src/assets/images/background/steamuserimages-a.akamaihd.jpg)',
    'url(../src/assets/images/background/luxa.org-opacity-changed-wallpaper (1).jpg)',
    'url(../src/assets/images/background/wp4001641-hoi4-wallpapers.png)',
    'url(../src/assets/images/background/wp4001645-hoi4-wallpapers.png)',
    'url(../src/assets/images/background/wp4568090-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615565-hoi4-wallpapers.png)',
    'url(../src/assets/images/background/wp4615570-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615571-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615572-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615573-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615575-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615589-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615591-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615596-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615602-hoi4-wallpapers.png)',
    'url(../src/assets/images/background/wp4615603-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615636-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/wp4615637-hoi4-wallpapers.jpg)',
    'url(../src/assets/images/background/RDT_20231223_155818285154863569026849.jpg)',
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

var links = [
    { url: "https://galuszka.cz", weight: 1 },
    { url: "https://github.com/KejBeg", weight: 50 },
  ];
  
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
  
  function openSite() {
    var link = weightedRandom(links);
    
    var win = window.open(link.url);
    win.focus();
  }
  
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
    
    console.log(counts);
  }
  
  experiment();


  // Array of image information
var images = [
  { 
      url: '../images/screenshots/hoi4_gerworldconq.png',
      title: 'Germany World Conquest',
      description: 'This is a screenshot from the game Hearts of Iron IV depicting a world conquest by Germany.'
  },
  // Add more images here
];

// Function to create image elements
function createImageElement(imageInfo) {
  var imageElement = document.createElement('div');
  imageElement.className = 'parent';

  var imageContainer = document.createElement('div');
  imageContainer.className = 'image';

  var imageLink = document.createElement('a');
  imageLink.href = imageInfo.url;
  imageLink.target = '_blank';

  var image = document.createElement('img');
  image.className = 'img';
  image.src = imageInfo.url;
  image.alt = imageInfo.title;

  imageLink.appendChild(image);
  imageContainer.appendChild(imageLink);

  var basicInfoContainer = document.createElement('div');
  basicInfoContainer.className = 'basicInfo';

  var title = document.createElement('h2');
  title.textContent = imageInfo.title;

  var description = document.createElement('p');
  description.textContent = imageInfo.description;

  basicInfoContainer.appendChild(title);
  basicInfoContainer.appendChild(description);

  imageElement.appendChild(imageContainer);
  imageElement.appendChild(basicInfoContainer);

  return imageElement;
}

// Function to initialize gallery
function initializeGallery() {
  var galleryImages = document.querySelectorAll('.image-container img');

  galleryImages.forEach(function(image) {
      image.addEventListener('click', function() {
          var imageTitle = this.alt;
          var imageSrc = this.parentElement.href;

          // You can customize the URL format according to your needs
          var imageUrl = '../imageInfoDesign/' + encodeURIComponent(imageTitle) + '.html';
          
          window.location.href = imageUrl;
      });
  });
}

// Call the initializeGallery function to generate the gallery
initializeGallery();
