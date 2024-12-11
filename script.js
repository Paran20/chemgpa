document.addEventListener('DOMContentLoaded', () => {
    // Fetch and parse the Excel file
    fetch('results.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            // Read the Excel file
            const workbook = XLSX.read(data, { type: 'array' });

            // Get the first sheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert the sheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            console.log(jsonData);

            // Populate the table with the parsed data
            populateTable(jsonData);
        })
        .catch(error => console.error('Error loading the Excel file:', error));
});

function populateTable(data) {
    const tableBody = document.getElementById('results').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing table rows

    data.forEach((row, index) => {
        const tr = document.createElement('tr');

        // Add rank (index + 1 for 1-based indexing)
        const rank = document.createElement('td');
        rank.textContent = index + 1;
        tr.appendChild(rank);

        // Add Name (assuming the JSON data has a 'Name' field)
        const name = document.createElement('td');
        name.textContent = row.Name || '';
        tr.appendChild(name);

        // Add other fields as needed
        tableBody.appendChild(tr);
    });
}
