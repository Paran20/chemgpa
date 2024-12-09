document.getElementById("file-input").addEventListener("change", handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    populateTable(jsonData);
  };

  reader.readAsArrayBuffer(file);
}

function populateTable(data) {
  const tableBody = document.querySelector("#result-table tbody");
  tableBody.innerHTML = "";

  data.forEach((row, index) => {
    if (index === 0) return; // Skip header row
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell || "";
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}

document.getElementById("search").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  const rows = document.querySelectorAll("#result-table tbody tr");

  rows.forEach(row => {
    const nameCell = row.cells[1]?.textContent.toLowerCase();
    row.style.display = nameCell && nameCell.includes(searchValue) ? "" : "none";
  });
});
