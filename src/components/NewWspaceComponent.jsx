function NewWspaceComponent() {
  const handleDragOver = (e) => {
    e.target.parentNode.style.border = "2px solid white";
  };

  const handleDragLeave = (e) => {
    e.target.parentNode.style.border = "none";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.target.parentNode.style.border = "none";

    const files = Array.from(e.dataTransfer.files);

    if (files.length !== 1) {
      alert("Please drop only one CSV file at a time!");
      return;
    }

    const csvFiles = files.filter((file) => file.type === "text/csv");

    if (csvFiles.length !== 1) {
      alert("Please drop only one CSV file at a time!");
      return;
    }

    const file = csvFiles[0];
    const fileName = file.name;

    const reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", () => {
      const content = reader.result.toString();
      parseCSV(content, fileName);
    });
  };

  const parseCSV = (csvContent, fileName) => {
    const rows = csvContent.trim().split("\n");
    const data = rows.map((row) => row.split(","));
    const x = data[0].map(Number);
    const y = data[1].map(Number);

    const key = "ws." + fileName;

    localStorage.setItem(key, JSON.stringify({ x, y }));
    localStorage.setItem("currentWs", key);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div
      className="row d-flex justify-content-center align-items-center"
      style={{ width: "90%", height: "3vw", borderRadius: "1vw" }}
      onDrop={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
    >
      <img
        src="https://images.vexels.com/media/users/3/223322/isolated/preview/5a5a1248ae05274bd4c8bd32f574f4fd-plus-icon-symbol.png"
        style={{ width: "2vw", height: "2vw", padding: "0" }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
    </div>
  );
}

export default NewWspaceComponent;
