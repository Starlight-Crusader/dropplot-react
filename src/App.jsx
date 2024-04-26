import React from "react";
import { createContext, useState, useEffect } from "react";

import NewWspaceComponent from "./components/NewWspaceComponent";
import WspaceListComponent from "./components/WspaceListComponent";
import WspaceComponent from "./components/WspaceComponent";

export const WorkspaceContext = createContext("");

function App() {
  const [currentWs, setCurrentWs] = useState("");

  const switchWs = (wsNum) => {
    setCurrentWs(wsNum);
  };

  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setMarginTop(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <WorkspaceContext.Provider value={{ currentWs, switchWs }}>
      <div className="container" style={{ maxWidth: "70vw", height: "100vh" }}>
        <div className="row" style={{ height: "100%" }}>
          <div className="col-md-3 bg-dark text-white">
            <div
              style={{
                position: "relative",
                marginTop: `${marginTop}px`,
              }}
            >
              <div style={{ textAlign: "center", margin: "1vw 0" }}>
                <p style={{ fontSize: "3vw" }}>DropPlot</p>
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
