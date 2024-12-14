const XLSX = require('xlsx'); // Assuming you've installed SheetJS

function readExcelData(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); 
    return data;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return null; 
  }
}

// Assuming 'results.xlsx' is in the same directory as 'script.js'
const filePath = 'results.xlsx'; 

const searchForm = document.getElementById('searchForm');
const resultContainer = document.getElementById('resultContainer');
const resultsTable = document.getElementById('resultsTable');
const errorMessage = document.getElementById('errorMessage');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const index = document.getElementById('index').value.trim();

    // Input validation
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
    readExcelData(filePath)
      .then(data => {
        if (data && data.length > 0) {
          // Filter data based on the entered index
          const filteredData = data.find(row => row[0] === index); 

          if (filteredData) {
            resultContainer.style.display = 'block';
            populateTable(filteredData); 
          } else {
            errorMessage.textContent = 'Student with index "' + index + '" not found.';
          }
        } else {
          errorMessage.textContent = 'Error loading or parsing data from Excel file.';
        }
      })
      .catch(error => {
        errorMessage.textContent = 'Error loading data from Excel file: ' + error.message;
        resultContainer.style.display = 'none';
      });
});

function populateTable(data) {
    const headerRow = document.createElement('tr');
    data.forEach((value, index) => { 
      const headerCell = document.createElement('th');
      headerCell.textContent = index; 
      headerRow.appendChild(headerCell);
    });
    resultsTable.appendChild(headerRow);

    const dataRow = document.createElement('tr');
    data.forEach(value => {
      const dataCell = document.createElement('td');
      dataCell.textContent = value;
      dataRow.appendChild(dataCell);
    });
    resultsTable.appendChild(dataRow);
}
