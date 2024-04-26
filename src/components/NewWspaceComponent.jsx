import { useContext } from "react";
import { WorkspaceContext } from "../App";

function NewWspaceComponent() {
  const { currentWs, switchWs } = useContext(WorkspaceContext);

  const handleDragOver = (e) => {
    e.target.style.border = "3px dashed white";
  };

  const handleDragLeave = (e) => {
    e.target.style.border = "none";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.target.style.border = "none";

    const files = Array.from(e.dataTransfer.files);
    const csvFiles = files.filter((file) => file.type === "text/csv");

    if (csvFiles.length !== 1) {
      alert("Please drop only one CSV file at a time!");
      return;
    }

    const file = csvFiles[0];
    const fileName = file.name.slice(0, -4);

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

    const key = "ws-" + fileName;

    if (localStorage.getItem(key) !== null) {
      alert(
        "A workspace with this name already exists, rename/delete it to upload this file!"
      );

      return;
    }

    const workspaceObject = {
      plots: [
        {
          graphs: [
            {
              x,
              y,
            },
          ],
        },
      ],
    };

    localStorage.setItem(key, JSON.stringify(workspaceObject));
    switchWs(key);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        width: "90%",
        height: "4vw",
        textAlign: "center",
        fontSize: "1vw",
        marginTop: "1vw",
        maxWidth: "80%",
      }}
      onDrop={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Drop your file here to upload it...
      </div>
    </div>
  );
}

export default NewWspaceComponent;
