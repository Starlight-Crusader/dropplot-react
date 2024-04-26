import React, { useState, useEffect } from "react";

const WspaceListComponent = () => {
  const [workspaceList, setWorkspaceList] = useState(
    Object.keys(localStorage).filter((key) => key.startsWith("ws."))
  );

  window.addEventListener("storage", (e) => {
    const keys = Object.keys(localStorage);
    const filteredKeys = keys.filter((key) => key.startsWith("ws."));
    setWorkspaceList(filteredKeys);
  });

  const handleItemClick = (key) => {
    localStorage.setItem("currentWs", key);
    window.dispatchEvent(new Event("storage"));
  };

  const handleItemMouseOver = (e) => {
    e.currentTarget.style.cursor = "default";
    e.currentTarget.style.borderBottom = "2px solid white";
  };

  const handleItemMouseOut = (e) => {
    e.currentTarget.style.border = "none";
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ marginBottom: "2vw" }}
    >
      {workspaceList.map((key, index) => (
        <div
          className="d-flex align-items-center"
          key={index}
          onClick={() => handleItemClick(key)}
          onMouseOver={handleItemMouseOver}
          onMouseLeave={handleItemMouseOut}
          style={{
            width: "85%",
            height: "2vw",
          }}
        >
          <p style={{ fontSize: "1.5vw", margin: "0" }}>
            {index + 1 + ". " + key.substring(3)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WspaceListComponent;
