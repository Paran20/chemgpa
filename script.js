// Load the data from the results.xlsx file
function loadData(filePath) {
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];

  const reader = new FileReader();
  reader.onload = function(event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    populateTable(jsonData);
  };

  reader.readAsArrayBuffer(file);
}

// Populate the table with data from the Excel file
function populateTable(data) {
  const tableBody = document.getElementById("result-table").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";  // Clear existing table rows

  data.forEach((row, index) => {
    const tr = document.createElement("tr");

    // Add rank (index + 1 for 1-based indexing)
    const rank = document.createElement("td");
    rank.textContent = index + 1;
    tr.appendChild(rank);

    // Add Name
    const name = document.createElement("td");
    name.textContent = row[1] || "";
    tr.appendChild(name);

    // Add GPA
    const gpa = document.createElement("td");
    gpa.textContent = row[2] || "";
    tr.appendChild(gpa);

    // Add CGPA
    const cgpa = document.createElement("td");
    cgpa.textContent = row[3] || "";
    tr.appendChild(cgpa);

    tableBody.appendChild(tr);
  });
}

// Search function that filters rows based on the input value
function searchTable() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const table = document.getElementById("result-table");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rank = row.cells[0].textContent.toLowerCase();

    if (rank.indexOf(searchInput) > -1) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}

// Load the data automatically when the page is loaded (assuming the file is provided in the system)
window.onload = function () {
  loadData('results.xlsx'); // You can replace with the correct file path if necessary
};
