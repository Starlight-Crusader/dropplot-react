import React, { useRef } from "react";
import { createContext, useState, useEffect } from "react";

import NewWspaceComponent from "./components/NewWspaceComponent";
import WspaceListComponent from "./components/WspaceListComponent";
import WspaceComponent from "./components/WspaceComponent";

export const WorkspaceContext = createContext("");
export const ThemeContext = createContext(false);

function App() {
  const [currentWs, setCurrentWs] = useState("");

  const switchWs = (wsNum) => {
    localStorage.setItem("currentWs", wsNum);
    setCurrentWs(wsNum);
  };

  const [theme, setTheme] = useState(false);

  const switchTheme = () => {
    setTheme(!theme);
  };

  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setMarginTop(scrollPosition + 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("currentWs")) {
      switchWs(localStorage.getItem("currentWs"));
    } else {
      switchWs("");
    }
  }, []);

  const wsListContainer = useRef(null);
  const themeBtn = useRef(null);
  const wsSpace = useRef(null);

  useEffect(() => {
    console.log("Dark theme: ", theme);

    if (!theme) {
      document.body.style.backgroundColor = "#efefef";

      wsListContainer.current.style.borderLeft = "none";
      wsListContainer.current.style.borderRight = "none";

      themeBtn.current.src =
        "https://pixsector.com/cache/afa23d3a/av1c12f667576e96088e6.png";

      wsSpace.current.style.color = "black";
    } else {
      document.body.style.backgroundColor = "#222222";

      wsListContainer.current.style.borderLeft = "5px solid white";
      wsListContainer.current.style.borderRight = "5px solid white";

      themeBtn.current.src =
        "https://www.iconpacks.net/icons/2/free-sun-icon-3337-thumb.png";

      wsSpace.current.style.color = "white";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <WorkspaceContext.Provider value={{ currentWs, switchWs }}>
        <div
          className="container"
          style={{ maxWidth: "70vw", height: "100vh" }}
        >
          <div className="row" style={{ height: "100%" }}>
            <div
              className="col-md-3 text-white"
              ref={wsListContainer}
              style={{ backgroundColor: "#222222" }}
            >
              <div
                style={{
                  position: "relative",
                  marginTop: `${marginTop}px`,
                }}
              >
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ marginTop: "2vw" }}
                >
                  <div
                    style={{
                      width: "15%",
                      aspectRatio: 1 / 1,
                      backgroundColor: "white",
                      borderRadius: "50px",
                    }}
                    onClick={() => switchTheme()}
                    className="d-flex flex-column align-items-center justify-content-center"
                  >
                    <img style={{ width: "90%" }} ref={themeBtn}></img>
                  </div>
                </div>

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

            <div
              className="col-md-9 d-flex flex-column align-items-center"
              ref={wsSpace}
            >
              <WspaceComponent />
            </div>
          </div>
        </div>
      </WorkspaceContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
