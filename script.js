document.addEventListener('DOMContentLoaded', () => {
  const indexInput = document.getElementById('index-input');
  const datalist = document.getElementById('available-indexes');
  const resultsDiv = document.getElementById('results');
  const resultsTable = document.getElementById('results-table');

  fetch('results.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      const indexOptions = excelData.map(student => student['Index Number']);

      function updateSuggestions() {
        const typedIndex = indexInput.value.toUpperCase();
        datalist.innerHTML = indexOptions
          .filter(option => option.toUpperCase().startsWith(typedIndex))
          .map(option => `<option value="${option}">`).join('');
      }

      function searchData() {
        const index = indexInput.value.trim();
        const studentData = excelData.find(student => student['Index Number'] === index);

        if (studentData) {
          resultsDiv.classList.remove('hidden');

          // Clear existing table rows
          resultsTable.innerHTML = '';

          // Create table headers
          const headerRow = document.createElement('tr');
          for (const key in studentData) {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
          }
          resultsTable.appendChild(headerRow);

          // Create table row for student data
          const dataRow = document.createElement('tr');
          for (const value of Object.values(studentData)) {
            const td = document.createElement('td');
            td.textContent = value;
            dataRow.appendChild(td);
          }
          resultsTable.appendChild(dataRow);

        } else {
          resultsDiv.classList.add('hidden');
          alert('No student found with the given index number.');
        }
      }

      datalist.innerHTML = indexOptions.map(option => `<option value="${option}">`).join('');
      indexInput.value = indexOptions[0]; // Set default selection

      indexInput.addEventListener('input', updateSuggestions);
      document.getElementById('search-button').addEventListener('click', searchData);

    })
    .catch(error => {
      console.error('Error loading Excel file:', error);
      alert('Error loading Excel file. Please check the file path and try again.'); 
    });
});
