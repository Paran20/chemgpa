document.addEventListener('DOMContentLoaded', () => {
  const indexInput = document.getElementById('index-input');
  const datalist = document.getElementById('available-indexes');
  const resultsDiv = document.getElementById('results');

  fetch('results.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      function searchData() {
        const index = indexInput.value.trim();
        const studentData = excelData.find(student => student['Index Number'] === index);

        if (studentData) {
          resultsDiv.classList.remove('hidden'); // Show results container
          document.getElementById('result-gpa').textContent = studentData['GPA'];
          document.getElementById('result-rank').textContent = studentData['Rank'];
        } else {
          resultsDiv.classList.add('hidden'); // Hide results container on no match
          alert('No student found with the given index number.');
        }
      }

      const indexOptions = excelData.map(student => student['Index Number']);
      datalist.innerHTML = indexOptions.map(option => `<option value="${option}">`).join('');

      document.getElementById('search-button').addEventListener('click', searchData);

      indexInput.value = indexOptions[0]; // Set default selection

      // Basic auto-suggest (improve as needed)
      indexInput.addEventListener('input', () => {
        const typedIndex = indexInput.value.toUpperCase();
        datalist.innerHTML = indexOptions
          .filter(option => option.toUpperCase().startsWith(typedIndex))
          .map(option => `<option value="${option}">`).join('');
      });
    })
    .catch(error => console.error('Error loading Excel file:', error));
});
