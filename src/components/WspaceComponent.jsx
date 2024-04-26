import React, { useEffect, useState, useRef } from "react";
import Plot from "react-plotly.js";
import { Row, Col } from "react-bootstrap";

const MyPlotComponent = () => {
  const deleteBtnRef = useRef(null);
  const [plotData, setPlotData] = useState({});
  const [plotName, setPlotName] = useState("New Plot");
  const [xlabel, setXlabel] = useState("X");
  const [ylabel, setYlabel] = useState("Y");

  window.addEventListener("storage", (e) => {
    setPlotName("New Plot");
    setXlabel("X");
    setYlabel("Y");

    const storedData = JSON.parse(
      localStorage.getItem(localStorage.getItem("currentWs"))
    );

    if (storedData === null) {
      return;
    }

    const trace = {
      x: storedData.x,
      y: storedData.y,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "blue" },
    };

    setPlotData([trace]);
  });

  const handleDeleteClick = (e) => {
    deleteBtnRef.current.style.border = "none";
    localStorage.removeItem(localStorage.getItem("currentWs"));
    localStorage.setItem("currentWs", "");
    setPlotData({});
    window.dispatchEvent(new Event("storage"));
  };

  const handleDeleteMouseOver = (e) => {
    e.currentTarget.style.border = "3px solid black";
  };

  const handleDeleteMouseOut = (e) => {
    e.currentTarget.style.border = "none";
  };

  if (localStorage.getItem("currentWs") != "") {
    return (
      <>
        <div
          ref={deleteBtnRef}
          onMouseOver={handleDeleteMouseOver}
          onMouseOut={handleDeleteMouseOut}
          onClick={handleDeleteClick}
          style={{
            height: "4vw",
            width: "4vw",
            margin: "2vw",
            borderRadius: "2vw",
          }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <img
            src="https://static-00.iconduck.com/assets.00/trash-bin-icon-2048x2048-duca73jv.png"
            style={{ width: "70%", height: "70%" }}
          />
        </div>
        <div style={{ border: "3px solid black" }}>
          <Plot
            data={plotData}
            layout={{
              width: "700",
              height: "400",
              title: plotName ? { text: plotName } : {},
              xaxis: { title: xlabel },
              yaxis: { title: ylabel },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div style={{ margin: "2vw" }}>
          <Row style={{ margin: "1vw 0" }}>
            <Col md={6}>
              <p style={{ fontSize: "1.1vw" }}>Plot name:</p>
            </Col>
            <Col md={6}>
              <input
                type="text"
                value={plotName}
                onChange={(e) => setPlotName(e.target.value)}
                placeholder="Plot Name"
                className="form-control"
              />
            </Col>
          </Row>

          <Row style={{ margin: "1vw 0" }}>
            <Col md={6}>
              <p style={{ fontSize: "1.1vw" }}>X Label:</p>
            </Col>
            <Col md={6}>
              <input
                type="text"
                value={xlabel}
                onChange={(e) => setXlabel(e.target.value)}
                placeholder="X Label"
                className="form-control"
              />
            </Col>
          </Row>

          <Row style={{ margin: "1vw 0" }}>
            <Col md={6}>
              <p style={{ fontSize: "1.1vw" }}>Y Label:</p>
            </Col>
            <Col md={6}>
              <input
                type="text"
                value={ylabel}
                onChange={(e) => setYlabel(e.target.value)}
                placeholder="Y Label"
                className="form-control"
              />
            </Col>
          </Row>
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
          Upload some data (drop a file on the puls icon) to plot or pick an
          existing workspace...
        </p>
      </div>
    );
  }
};

export default MyPlotComponent;
