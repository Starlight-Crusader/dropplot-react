import React from "react";
import { createContext, useState } from "react";

import NewWspaceComponent from "./components/NewWspaceComponent";
import WspaceListComponent from "./components/WspaceListComponent";
import WspaceComponent from "./components/WspaceComponent";

export const WorkspaceContext = createContext("");

function App() {
  const [currentWs, setCurrentWs] = useState("");

  const switchWs = (wsNum) => {
    setCurrentWs(wsNum);
  };

  return (
    <WorkspaceContext.Provider value={{ currentWs, switchWs }}>
      <div
        className="container"
        style={{ maxWidth: "70vw", height: "100vh", backgroundColor: "white" }}
      >
        <div className="row" style={{ height: "100%" }}>
          <div className="col-md-3 bg-dark text-white">
            <div style={{ textAlign: "center", margin: "1vw 0" }}>
              <p style={{ fontSize: "3vw" }}>FastPlot</p>
            </div>

            <div
              style={{
                height: "5px",
                background: "white",
                borderRadius: "5px",
              }}
            ></div>

            <div
              className="container d-flex flex-column justify-content-center align-items-center"
              style={{ margin: "1vw 0" }}
            >
              <p style={{ fontSize: "2vw" }}>Workspaces:</p>
              <WspaceListComponent />
              <NewWspaceComponent />
            </div>
          </div>

          <div className="col-md-9 d-flex flex-column align-items-center">
            <WspaceComponent />
          </div>
        </div>
      </div>
    </WorkspaceContext.Provider>
  );
}

export default App;
