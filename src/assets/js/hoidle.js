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

        // Create a container div for input box and button
        const inputContainer = document.createElement('div');
        inputContainer.appendChild(inputBox);
        inputContainer.appendChild(button);

        // Append the input container above the content div
        document.body.insertBefore(inputContainer, document.getElementById("content"));

        // Variable to track if headers are already added
        let headersAdded = false;

        // Function to handle button click or Enter key press
        function handleInput() {
            const country = inputBox.value.trim(); // Trim any leading or trailing whitespace
            const result = searchDatabase(country);

            if (result) {
                // If headers are not added, create and append them
                if (!headersAdded) {
                    const headersElement = document.createElement("div");
                    headersElement.classList.add("result"); // Add CSS class for table row
                    headersElement.innerHTML = `
                        <div>Country</div>
                        <div>Continent</div>
                        <div>Starting Nation</div>
                        <div>Government</div>
                        <div>Strength</div>
                        <div>States</div>
                        <div>Core Population</div>
                    `;
                    document.getElementById("content").appendChild(headersElement);
                    headersAdded = true;
                }
                
                // Display the result
                const resultElement = document.createElement("div");
                resultElement.classList.add("result"); // Add CSS class for table row
                resultElement.innerHTML = `
                    <div>${result.name}</div>
                    <div>${result.continent}</div>
                    <div>${result.startingNation}</div>
                    <div>${result.government}</div>
                    <div>${result.strength}</div>
                    <div>${result.states}</div>
                    <div>${result["Core Population"]}</div>
                `;
                
                // Append the result element to the content div
                document.getElementById("content").appendChild(resultElement);
                
                // Reset input box background color and placeholder text
                inputBox.style.backgroundColor = '';
                inputBox.placeholder = 'Enter a country';
            } else {
                // If the country is not found
                inputBox.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'; // Change background color
                inputBox.placeholder = 'Country not found'; // Change placeholder text
            }
        }

        // Add event listener for button click
        button.addEventListener('click', handleInput);

        // Add event listener for Enter key press
        inputBox.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleInput();
            }
        });
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
