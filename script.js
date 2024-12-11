let excelData = []; // Store the parsed Excel data

document.addEventListener('DOMContentLoaded', () => {
    // Fetch and parse the Excel file
    fetch('results.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            // Get the first sheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert the sheet to JSON
            excelData = XLSX.utils.sheet_to_json(worksheet);
            console.log('Excel Data:', excelData);
        })
        .catch(error => console.error('Error loading Excel file:', error));
});

// Function to search data by index number
function searchData() {
    const indexInput = document.getElementById('index-input').value.trim();
    const table = document.getElementById('results');
    const headerRow = document.getElementById('header-row');
    const dataRow = document.getElementById('data-row');

    // Clear previous data
    headerRow.innerHTML = '';
    dataRow.innerHTML = '';

    if (!indexInput) {
        alert('Please enter an index number!');
        table.style.display = 'none';
        return;
    }

    // Find the matching row based on index number
    const matchingRow = excelData.find(row => row['Index Number'] == indexInput);

    if (matchingRow) {
        // Populate table headers dynamically
        Object.keys(matchingRow).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });

        // Populate table row dynamically
        Object.values(matchingRow).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            dataRow.appendChild(td);
        });

        // Show the table
        table.style.display = 'table';
    } else {
        alert('No data found for the provided index number!');
        table.style.display = 'none';
    }
}
