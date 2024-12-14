#<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Search</title>
</head>
<body>
  <h1>Student Search</h1>
  <label for="index-input">Enter or Select Index Number:</label>
  <input type="text" id="index-input" list="available-indexes">
  <datalist id="available-indexes"></datalist>
  <button id="search-button">Search</button>
  <div id="results">
    <p>GPA: <span id="result-gpa"></span></p>
    <p>Rank: <span id="result-rank"></span></p>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.20.0/xlsx.full.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const indexInput = document.getElementById('index-input');
      const datalist = document.getElementById('available-indexes');
      const resultsDiv = document.getElementById('results');

      // Function to fetch and parse Excel file (same as before)
      function fetchData() {
        fetch('results.xlsx')
          .then(response => response.arrayBuffer())
          .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(worksheet);

            // Function to search for data by index number (same as before)
            function searchData() {
              const index = indexInput.value.trim();
              const studentData = excelData.find(student => student['Index Number'] === index);

              if (studentData) {
                resultsDiv.style.display = 'block'; // Show results container
                document.getElementById('result-gpa').textContent = studentData['GPA'];
                document.getElementById('result-rank').textContent = studentData['Rank'];
              } else {
                resultsDiv.style.display = 'none'; // Hide results container on no match
                alert('No student found with the given index number.');
              }
            }

            // Populate available index numbers list
            const indexOptions = excelData.map(student => student['Index Number']);
            datalist.innerHTML = indexOptions.map(option => `<option value="${option}">`).join('');

            // Attach event listener to the search button (same as before)
            document.getElementById('search-button').addEventListener('click', searchData);

            // Optionally: Set default selection to first available index number
            indexInput.value = indexOptions[0]; 
          })
          .catch(error => console.error('Error loading Excel file:', error));
      }

      fetchData(); // Call function to fetch data initially
      
      // Event listener for user input (optional, for improved UX)
      indexInput.addEventListener('keyup', () => {
        const typedIndex = indexInput.value;
        if (typedIndex.length >= 3) { // Adjust length as needed
          // Implement logic to filter and display relevant available indexes
          // based on the user's typed input (using the datalist element)
          // ... (your filtering logic here) ...
        }
      });
    });
  </script>
</body>
</html>
