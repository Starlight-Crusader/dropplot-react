import React, { useRef, useContext, useState, useEffect } from "react";
import { ThemeContext, WorkspaceContext } from "../App";
import WspaceItemComponent from "./WspaceItemComponent";

const WspaceComponent = () => {
  const { currentWs, switchWs } = useContext(WorkspaceContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [rerenderWs, setRerenderWs] = useState(true);

  const renameBtnRef = useRef(null);
  const deleteBtnRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    setRerenderWs(false);
  }, [rerenderWs]);

  const handleDeleteClick = (e) => {
    deleteBtnRef.current.style.border = "none";
    localStorage.removeItem(currentWs);
    switchWs("");
  };

  const handleRenameClick = (e) => {
    const newName = nameInputRef.current.value;

    if (newName.trim() === "") {
      alert("Workspace name must be at least 1 character long!");
      return;
    }

    const newKey = "ws-" + newName;

    if (localStorage.getItem(newKey) === null) {
      localStorage.setItem(newKey, localStorage.getItem(currentWs));
      localStorage.removeItem(currentWs);
      switchWs(newKey);
    } else {
      alert("A workspace with this name already exists!");
    }
  };

  const handleBtnMouseOver = (e) => {
    e.currentTarget.style.border = "3px solid #222222";
  };

  const handleBtnMouseOut = (e) => {
    e.currentTarget.style.border = "none";
  };

  const handleDragOver = (e) => {
    e.target.style.border = "3px dashed";
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

    const reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", () => {
      const content = reader.result.toString();
      parseCSV(content);
    });
  };

  const parseCSV = (csvContent) => {
    const rows = csvContent.trim().split("\n");
    const data = rows.map((row) => row.split(","));
    const x = data[0].map(Number);
    const y = data[1].map(Number);

    const workspaceObject = JSON.parse(localStorage.getItem(currentWs));

    workspaceObject.plots.push({
      graphs: [
        {
          x,
          y,
        },
      ],
    });
    localStorage.setItem(currentWs, JSON.stringify(workspaceObject));

    setRerenderWs(true);
  };

  const mainContainerRef = useRef(null);
  const dropSpaceRef = useRef(null);

  useEffect(() => {
    if (!theme) {
      if (mainContainerRef.current) {
        mainContainerRef.current.style.backgroundColor = "white";

        mainContainerRef.current.style.borderLeft = "5px #222222 solid";
        mainContainerRef.current.style.borderRight = "5px #222222 solid";
      }

      if (dropSpaceRef.current) {
        dropSpaceRef.current.style.border = "white";
      }
    } else {
      if (mainContainerRef.current) {
        mainContainerRef.current.style.backgroundColor = "#222222";

        mainContainerRef.current.style.borderLeft = "5px white solid";
        mainContainerRef.current.style.borderRight = "5px white solid";
      }

      if (dropSpaceRef.current) {
        dropSpaceRef.current.style.border = "#222222";
      }
    }
  }, [theme, currentWs]);

  if (currentWs != "") {
    const storedData = JSON.parse(localStorage.getItem(currentWs));
    const plots = storedData ? storedData.plots : [];

    return (
      <div
        onDrop={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        className="d-flex flex-column align-items-center"
        style={{ backgroundColor: "white", height: "100%" }}
        ref={mainContainerRef}
      >
        <div
          className="d-flex flex-row align-items-center"
          style={{ margin: "1.5vw 0" }}
        >
          <input
            type="text"
            maxLength="8"
            style={{ width: "12vw", marginRight: "1vw", padding: "0.5vw" }}
            placeholder={currentWs.substring(3)}
            ref={nameInputRef}
            className="form-control"
          />

          <div
            ref={renameBtnRef}
            onClick={handleRenameClick}
            onMouseOver={handleBtnMouseOver}
            onMouseOut={handleBtnMouseOut}
            style={{
              height: "3vw",
              width: "3vw",
              margin: "0.5vw",
              borderRadius: "2vw",
              backgroundColor: "white",
            }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <img
              src="https://cdn.icon-icons.com/icons2/1769/PNG/512/4115228-accept-checklist-checkmark-yes_114037.png"
              style={{ width: "80%", height: "80%" }}
            />
          </div>

          <div
            ref={deleteBtnRef}
            onMouseOver={handleBtnMouseOver}
            onMouseOut={handleBtnMouseOut}
            onClick={handleDeleteClick}
            style={{
              height: "3vw",
              width: "3vw",
              margin: "0.5vw",
              borderRadius: "2vw",
              backgroundColor: "white",
            }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <img
              src="https://static-00.iconduck.com/assets.00/trash-bin-icon-2048x2048-duca73jv.png"
              style={{ width: "60%", height: "60%" }}
            />
          </div>
        </div>

        <div className="d-flex flex-column align-items-center">
          {plots.map((_, index) => (
            <WspaceItemComponent key={"plot" + index} index={index} />
          ))}
        </div>

        <div
          ref={dropSpaceRef}
          style={{
            margin: "2vw",
            maxWidth: "70%",
            textAlign: "center",
            padding: "1vw",
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          Drop another file here to add a graph...
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{ margin: "10vw 0", textAlign: "center" }}
        className="d-flex flex-row justify-content-center align-items-center"
      >
        <p style={{ fontSize: "1.1vw", maxWidth: "70%" }}>
          Upload some data (drop a file on the left) to plot or pick an existing
          workspace...
        </p>
      </div>
    );
  }
};

export default WspaceComponent;
