// Fetch the database JSON file
fetch('../src/assets/js/json/database.json')
    .then(response => response.json())
    .then(data => {
        // Now 'data' contains your database as an array of objects
        console.log(data);

        // Assign the fetched data to the database variable
        const database = data;

        // Variable to track guessed nations
        let guessedNations = [];

        // Variable to track if the game has been won
        let gameWon = false;

        // Now you can use this data in your application
        // For example, you can define the searchDatabase function and the rest of your code here
        // Function to search the database based on input and display the result
        function searchDatabase(query) {
            query = query.toLowerCase(); // Convert the query to lowercase for case-insensitive search
            const result = database.find(item =>
                item.name.toLowerCase() === query ||
                (item.otherName && item.otherName.toLowerCase() === query)
            );
            return result;
        }

        // Function to fetch the data for the hidden country
        function fetchHiddenCountryData(hiddenCountry) {
            return new Promise((resolve, reject) => {
                fetch('../src/assets/js/json/database.json')
                    .then(response => response.json())
                    .then(data => {
                        const result = data.find(item => item.name.toLowerCase() === hiddenCountry.toLowerCase());
                        if (result) {
                            resolve(result);
                        } else {
                            reject("Hidden country not found");
                        }
                    })
                    .catch(error => reject(error));
            });
        }

        // Create the input box
        const inputBox = document.createElement('input');
        inputBox.id = 'countryInputBox';
        inputBox.type = 'text';
        inputBox.placeholder = 'Enter a country';

        // Create the button
        const button = document.createElement('button');
        button.id = 'countrySubmitButton';
        button.textContent = 'Submit';

        // Create a container div for input box and button
        const inputContainer = document.createElement('div');
        inputContainer.id = 'input';
        inputContainer.appendChild(inputBox);
        inputContainer.appendChild(button);

        // Append the input container above the content div
        document.body.insertBefore(inputContainer, document.getElementById("content"));

        // Variable to track if headers are already added
        let headersAdded = false;

        // Function to handle button click or Enter key press
        async function handleInput() {
            if (gameWon) {
                // Display message if game is already won
                animateErrorMessage("You already won the game, you can't guess anymore.");
                return;
            }
            const country = inputBox.value.trim(); // Trim any leading or trailing whitespace

            if (guessedNations.includes(country)) {
                // If nation is already guessed, show error message and return
                animateErrorMessage("You've already guessed this nation.");
                return;
            }

            const result = searchDatabase(country);

            if (result) {
                guessedNations.push(country); // Add guessed nation to the list

                // If headers are not added, create and append them
                if (!headersAdded) {
                    const headersElement = document.createElement("div");
                    headersElement.classList.add("result"); // Add CSS class for table row
                    headersElement.innerHTML = `
                <div class="borderBottom">Country</div>
                <div class="borderBottom">Continent</div>
                <div class="borderBottom">Starting Nation</div>
                <div class="borderBottom">Government</div>
                <div class="borderBottom">Strength</div>
                <div class="borderBottom">States</div>
                <div class="borderBottom">Core Population</div>
                `;
                    document.getElementById("content").appendChild(headersElement);
                    headersAdded = true;
                }

                // Display the result
                const resultElement = document.createElement("div");
                resultElement.classList.add("result"); // Add CSS class for table row
                resultElement.innerHTML = `
                <div class="name borders">${result.name}</div>
                <div class="continent borders">${result.continent}</div>
                <div class="startingNation borders">${result.startingNation}</div>
                <div class="government borders">${result.government}</div>
                <div class="strength borders">${result.strength}</div>
                <div class="states borders">${result.states}</div>
                <div class="corePop borders">${result["Core Population"]}</div>
                `;

                // Append the result element to the content div
                document.getElementById("content").appendChild(resultElement);

                // Fetch data for the hidden country
                const hiddenCountry = "Guangxi Clique" // Temporary hidden country
                try {
                    const hiddenCountryData = await fetchHiddenCountryData(hiddenCountry);

                    // Compare the guessed country's data with the hidden country's data and change background colors accordingly
                    compareAndChangeBackgroundColor(resultElement, '.name', result.name, hiddenCountryData.name);
                    compareAndChangeBackgroundColor(resultElement, '.continent', result.continent, hiddenCountryData.continent);
                    compareAndChangeBackgroundColor(resultElement, '.startingNation', result.startingNation, hiddenCountryData.startingNation);
                    compareAndChangeBackgroundColor(resultElement, '.government', result.government, hiddenCountryData.government);
                    compareAndChangeBackgroundColor(resultElement, '.strength', result.strength, hiddenCountryData.strength);
                    compareAndChangeBackgroundColor(resultElement, '.states', result.states, hiddenCountryData.states);
                    compareAndChangeBackgroundColor(resultElement, '.corePop', result["Core Population"], hiddenCountryData["Core Population"]);

                    // Check if the guessed country matches the hidden country
                    if (result.name.toLowerCase() === hiddenCountry.toLowerCase()) {
                        // If the guessed country matches, show a window in the middle of the screen
                        const windowElement = document.createElement("div");
                        windowElement.classList.add("window");

                        // Create the close button
                        const closeButton = document.createElement("img");
                        const theme = localStorage.getItem("theme") || "light"; // Get theme from localStorage or default to light
                        closeButton.src = (theme === "dark") ? "../src/assets/images/icons/x-white.png" : "../src/assets/images/icons/x.png";
                        closeButton.alt = "Close";
                        closeButton.classList.add("close-button");

                        console.log("Close button image path:", closeButton.src);

                        // Create the content element
                        const contentElement = document.createElement("div");
                        contentElement.classList.add("window-content");
                        contentElement.textContent = `You won! Correct nation: ${hiddenCountry}`;

                        // Append the close button and content to the window element
                        windowElement.appendChild(closeButton);
                        windowElement.appendChild(contentElement);

                        // Append the window element to the body
                        document.body.appendChild(windowElement);

                        // Add event listener to close the window when the close button is clicked
                        closeButton.addEventListener("click", () => {
                            document.body.removeChild(windowElement);
                            document.body.style.backgroundColor = ""; // Reset background color
                        });

                        // Set gameWon flag to true
                        gameWon = true;

                        // Fade the background
                        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                    }


                } catch (error) {
                    console.error('Error fetching hidden country data:', error);
                }

                // Reset input box background color and placeholder text
                inputBox.style.backgroundColor = '';
                inputBox.placeholder = 'Enter a country';
                inputBox.value = ''; // Clear input after submission
            } else {
                // If the country is not found
                animateErrorMessage('Country not found');
            }
        }

        // Function to animate error message
        function animateErrorMessage(message) {
            const errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            errorElement.textContent = message;
            document.body.appendChild(errorElement);

            // Use setTimeout to add the 'hidden' class after 2 seconds
            setTimeout(() => {
                errorElement.classList.add('hidden');
                // Use another setTimeout to remove the error element from the DOM after the transition
                setTimeout(() => {
                    document.body.removeChild(errorElement);
                }, 500); // Adjust the time to match the transition duration in CSS
            }, 2000);
        }

        // Add event listener for button click
        button.addEventListener('click', handleInput);

        // Add event listener for Enter key press
        inputBox.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleInput();
            }
        });

        
// Function to compare the guessed country's data with the hidden country's data and change background colors accordingly
function compareAndChangeBackgroundColor(resultElement, selector, guessedValue, hiddenValue) {
    const element = resultElement.querySelector(selector);
    const theme = localStorage.getItem("theme") || "light"; // Get theme from localStorage or default to light

    if (element.textContent.toLowerCase() === guessedValue.toLowerCase() && guessedValue.toLowerCase() === hiddenValue.toLowerCase()) {
        element.style.backgroundColor = (theme === "dark") ? 'darkgreen' : 'green';
    } else {
        element.style.backgroundColor = (theme === "dark") ? 'darkred' : 'red';
    }
    element.style.backgroundImage = 'none'; // Ensure no background image is applied

    if (selector === '.states' || selector === '.corePop') {
        const guessedNumber = parseInt(guessedValue.replace(/\D/g, ''), 10); // Extract number from the guessed value
        const hiddenNumber = parseInt(hiddenValue.replace(/\D/g, ''), 10); // Extract number from the hidden value

        if (!isNaN(guessedNumber) && !isNaN(hiddenNumber)) {
            if (guessedNumber > hiddenNumber) {
                const downArrowPath = (theme === "dark") ? 'url(../src/assets/images/icons/downArrow-dark.png)' : 'url(../src/assets/images/icons/downArrow.png)';
                element.style.backgroundImage = downArrowPath;
                // opacity of the image to 50%
            } else if (guessedNumber < hiddenNumber) {
                const upArrowPath = (theme === "dark") ? 'url(../src/assets/images/icons/upArrow-dark.png)' : 'url(../src/assets/images/icons/upArrow.png)';
                element.style.backgroundImage = upArrowPath;
                element.style.backgroundImage.opacity = '0.5';
            } else {
                // If the values are the same, turn the background green and remove the arrow
                element.style.backgroundImage = 'none';
                element.style.backgroundColor = (theme === "dark") ? 'darkgreen' : 'green';
            }
            element.style.backgroundRepeat = 'no-repeat';
            element.style.backgroundPosition = 'center';
            element.style.backgroundSize = '50%';
        }
        // Zoom in a bit more for corePop
        if (selector === '.corePop') {
            element.style.backgroundSize = '24%';
        }
    }
}




    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
