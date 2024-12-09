// script.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('results.csv') // Path to your CSV file
        .then(response => response.text())
        .then(data => populateTable(data));
});

function populateTable(csvData) {
    const rows = csvData.split('\n').slice(1); // Skip header
    const tbody = document.querySelector('#result-table tbody');
    rows.forEach(row => {
        const cols = row.split(',');
        const tr = document.createElement('tr');
        cols.forEach(col => {
            const td = document.createElement('td');
            td.textContent = col.trim();
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function searchTable() {
    const input = document.getElementById('search');
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll('#result-table tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells[1].textContent.toLowerCase().includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}