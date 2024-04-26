import React, { useRef, useContext } from "react";
import { WorkspaceContext } from "../App";
import WspaceItemComponent from "./WspaceItemComponent";

const WspaceComponent = () => {
  const { currentWs, switchWs } = useContext(WorkspaceContext);

  const deleteBtnRef = useRef(null);
  const nameInputRef = useRef(null);

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
    e.currentTarget.style.border = "3px solid black";
  };

  const handleBtnMouseOut = (e) => {
    e.currentTarget.style.border = "none";
  };

  if (currentWs != "") {
    const storedData = JSON.parse(localStorage.getItem(currentWs));
    const plots = storedData ? storedData.plots : [];

    return (
      <>
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
          />

          <div
            onClick={handleRenameClick}
            onMouseOver={handleBtnMouseOver}
            onMouseOut={handleBtnMouseOut}
            style={{
              height: "3vw",
              width: "3vw",
              margin: "0.5vw",
              borderRadius: "2vw",
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
      </>
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
