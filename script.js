// Function to fetch and populate the table
function populateTable() {
  const tableBody = document.querySelector("#result-table tbody"); // Get the table body

  // Fetch the CSV file
  fetch("results.csv")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch the file. Please check the file path.");
      }
      return response.text(); // Parse response as text
    })
    .then((data) => {
      const rows = data.trim().split("\n"); // Split CSV data into rows

      rows.forEach((row, index) => {
        const cells = row.split(","); // Split each row into cells (assuming comma-separated values)
        const newRow = document.createElement("tr"); // Create a new table row

        // Add cells to the row
        cells.forEach((cell) => {
          const newCell = document.createElement("td");
          newCell.textContent = cell.trim(); // Add plain text to the cell
          newRow.appendChild(newCell);
        });

        // Append row to table body
        tableBody.appendChild(newRow);
      });
    })
    .catch((error) => {
      console.error("Error loading data:", error.message);
    });
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", populateTable);
