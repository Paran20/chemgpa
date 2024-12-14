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
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      // Function to search for data by index number
      function searchData() {
        const indexInput = document.getElementById('index-input').value.trim();

        // Find the student's record based on index number
        const studentData = excelData.find(student => student['Index Number'] === indexInput);

        if (studentData) {
          // Extract GPA and Rank
          const gpa = studentData['GPA'];
          const rank = studentData['Rank'];

          // Display the results
          document.getElementById('result-gpa').textContent = gpa;
          document.getElementById('result-rank').textContent = rank;
        } else {
          // Handle case where no matching record is found
          alert('No student found with the given index number.');
        }
      }

      // Attach event listener to the search button
      document.getElementById('search-button').addEventListener('click', searchData);
    })
    .catch(error => console.error('Error loading Excel file:', error));
});
