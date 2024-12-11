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

        // Add Name
        const name = document.createElement('td');
        name.textContent = row.Name || ''; // Replace 'Name' with your column name
        tr.appendChild(name);

        // Add Score (or any other field from your Excel)
        const score = document.createElement('td');
        score.textContent = row.Score || ''; // Replace 'Score' with your column name
        tr.appendChild(score);

        tableBody.appendChild(tr);
    });
}

// Search Functionality
function searchTable() {
    const input = document.getElementById('search');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('results');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(filter)) {
                match = true;
                break;
            }
        }

        rows[i].style.display = match ? '' : 'none';
    }
}
