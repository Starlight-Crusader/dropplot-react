import React, { useState, useEffect, useContext } from "react";
import { WorkspaceContext } from "../App";

const WspaceListComponent = () => {
  const { currentWs, switchWs } = useContext(WorkspaceContext);

  const [workspaceList, setWorkspaceList] = useState(
    Object.keys(localStorage).filter((key) => key.startsWith("ws."))
  );

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const filteredKeys = keys.filter((key) => key.startsWith("ws."));
    setWorkspaceList(filteredKeys);
  }, [currentWs]);

  const handleItemClick = (key) => {
    switchWs(key);
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
      className="d-flex flex-column justify-content-center align-items-start"
      style={{ marginBottom: "0.5vw" }}
    >
      {workspaceList.map((key, index) => (
        <div
          className="d-flex align-items-start"
          key={index}
          onClick={() => handleItemClick(key)}
          onMouseOver={handleItemMouseOver}
          onMouseLeave={handleItemMouseOut}
          style={{
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
