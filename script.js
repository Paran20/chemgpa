const XLSX = require('xlsx'); // Assuming you've installed SheetJS

function readExcelData(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet); 
    return data;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return null; // Or handle the error differently
  }
}

// Assuming 'results.xlsx' is in the same directory as 'script.js'
const filePath = 'results.xlsx'; 

const searchForm = document.getElementById('searchForm');
const resultContainer = document.getElementById('resultContainer');
const resultsTable = document.getElementById('resultsTable');
const errorMessage = document.getElementById('errorMessage');

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

    // Fetch data from Excel file
    const studentData = readExcelData(filePath); 

    if (studentData && studentData.length > 0) { 
      // Filter data based on the entered index
      const filteredData = studentData.find(row => row.index === index); 

      if (filteredData) {
        // Display results
        resultContainer.style.display = 'block';
        populateTable(filteredData); 
      } else {
        errorMessage.textContent = 'Student with index "' + index + '" not found.';
      }
    } else {
      errorMessage.textContent = 'Error loading data from Excel file.';
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
    resultsTable.appendChild(dataRow);
}
