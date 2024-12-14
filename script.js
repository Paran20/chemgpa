const searchForm = document.getElementById('searchForm');
const resultContainer = document.getElementById('resultContainer');
const resultsTable = document.getElementById('resultsTable');
const errorMessage = document.getElementById('errorMessage');
// Assuming 'results.xlsx' is in the same directory as 'script.js'
const filePath = 'results.xlsx';
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const index = document.getElementById('index').value.trim();

    // Input validation: Check for 6 digits and a letter
    const indexRegex = /^[0-9]{6}[A-Z]$/;
    if (!indexRegex.test(index)) {
        errorMessage.textContent = 'Invalid index format. Please enter 6 digits followed by a letter.';
        resultContainer.style.display = 'none';
        return;
    }

    // Clear previous results and error message
    resultsTable.innerHTML = '';
    errorMessage.textContent = '';

    // Simulate fetching data from results.xlsx (server-side implementation required)
    // Replace with your actual fetching logic
    const studentData = {
        // Example data (replace with your actual data structure)
        index: index,
        name: 'John Doe',
        'SEM 01': 85,
        maths: 90,
        english: 88,
        // ... other subjects and GPA, rank
    };

    if (studentData) {
        // Display results
        resultContainer.style.display = 'block';
        populateTable(studentData);
    } else {
        errorMessage.textContent = 'Student with index "' + index + '" not found.';
    }
});

function populateTable(data) {
    // Create table header row
    const headerRow = document.createElement('tr');
    for (const key in data) {
        if (key !== 'index') { // Exclude index from header
            const headerCell = document.createElement('th');
            headerCell.textContent = key;
            headerRow.appendChild(headerCell);
        }
    }
    resultsTable.appendChild(headerRow);

    // Create data row
    const dataRow = document.createElement('tr');
    for (const key in data) {
        const dataCell = document.createElement('td');
        dataCell.textContent = data[key];
        dataRow.appendChild(dataCell);
    }
    results
