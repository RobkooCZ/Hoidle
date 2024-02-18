// Fetch the database JSON file
fetch('../src/assets/js/json/database.json')
    .then(response => response.json())
    .then(data => {
        // Now 'data' contains your database as an array of objects
        console.log(data);

        // Assign the fetched data to the database variable
        const database = data;

        // Now you can use this data in your application
        // For example, you can define the searchDatabase function and the rest of your code here
        // Function to search the database based on input and display the result
        function searchDatabase(query) {
            query = query.toLowerCase(); // Convert the query to lowercase for case-insensitive search
            const result = database.find(item => item.name.toLowerCase() === query);
            return result;
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

        // Function to handle button click or Enter key press
        function handleInput() {
            const country = inputBox.value.trim(); // Trim any leading or trailing whitespace
            const result = searchDatabase(country);

            if (result) {
                // Display the result
                const resultElement = document.createElement("div");
                resultElement.textContent = `Country: ${result.name}, Continent: ${result.continent}, Starting Nation: ${result.startingNation}, Government: ${result.government}, Strength: ${result.strength}`;
                document.getElementById("content").appendChild(resultElement);
            } else {
                // If the country is not found
                const errorElement = document.createElement("div");
                errorElement.textContent = "Country not found.";
                document.getElementById("content").appendChild(errorElement);
            }

            // Clear the input box value
            inputBox.value = '';
        }

        // Add event listener for button click
        button.addEventListener('click', handleInput);

        // Add event listener for Enter key press
        inputBox.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleInput();
            }
        });

        // Append the input box and button to the document body
        document.getElementById("content").appendChild(inputBox);
        document.getElementById("content").appendChild(button);
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
