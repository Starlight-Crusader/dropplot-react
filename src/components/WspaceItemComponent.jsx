import React, { useEffect, useState, useContext } from "react";
import Plot from "react-plotly.js";
import { Row, Col } from "react-bootstrap";
import { WorkspaceContext } from "../App";

const WspaceItemComponent = ({ index }) => {
  const { currentWs, switchWs } = useContext(WorkspaceContext);
  const [rerenderPlot, setRerenderPlot] = useState(false);

  const [graphsData, setGraphsData] = useState([]);
  const [plotName, setPlotName] = useState("New Plot");
  const [xlabel, setXlabel] = useState("X");
  const [ylabel, setYlabel] = useState("Y");

  const plotColors = ["blue", "red", "green", "yellow", "purple"];

  const [rootWidth, setRootWidth] = useState(
    document.documentElement.clientWidth
  );

  useEffect(() => {
    setRerenderPlot(false);

    setPlotName("New Plot");
    setXlabel("X Label");
    setYlabel("Y Label");

    const storedData = JSON.parse(localStorage.getItem(currentWs));
    if (storedData == null) {
      setPlots({});
      return;
    }

    // Process each canvas data to create Plot traces
    const graphsDataData = storedData.plots[index].graphs.map(
      (graph, graphIdx) => {
        return {
          x: graph.x,
          y: graph.y,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: plotColors[graphIdx] },
        };
      }
    );

    setGraphsData(graphsDataData);
  }, [currentWs, rerenderPlot]);

  useEffect(() => {
    const handleResize = () => {
      setRootWidth(document.documentElement.clientWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDragOver = (e) => {
    e.target.style.border = "2px dashed black";
  };

  const handleDragLeave = (e) => {
    e.target.style.border = "none";
  };

  const handleDrop = (e) => {
    e.pre;
    e.preventDefault();
    e.target.style.border = "none";

    const files = Array.from(e.dataTransfer.files);

    if (files.length !== 1) {
      alert("Please upload only CSV files!");
      return;
    }

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

    workspaceObject.plots[index].graphs.push({ x, y });
    localStorage.setItem(currentWs, JSON.stringify(workspaceObject));

    setRerenderPlot(true);
  };

  return (
    <>
      <div
        className="d-flex flex-row align-items-center"
        style={{
          borderRight: "2px solid black",
          borderLeft: "2px solid black",
        }}
        onDrop={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
      >
        <div>
          <Plot
            data={graphsData}
            layout={{
              width: rootWidth * 0.35,
              height: rootWidth * 0.2,
              title: plotName ? { text: plotName } : {},
              xaxis: { title: xlabel },
              yaxis: { title: ylabel },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div
          style={{ height: "100%" }}
          className="d-flex flex-column justify-content-center"
          onDrop={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
        >
          <Row
            style={{ marginBottom: "10px" }}
            className="d-flex flex-column align-items-center"
          >
            <Col md={10}>
              <input
                type="text"
                value={plotName}
                onChange={(e) => setPlotName(e.target.value)}
                placeholder="Plot Name"
                className="form-control"
              />
            </Col>
          </Row>

          <Row
            style={{ marginBottom: "10px" }}
            className="d-flex flex-column align-items-center"
          >
            <Col md={10}>
              <input
                type="text"
                value={xlabel}
                onChange={(e) => setXlabel(e.target.value)}
                placeholder="X Label"
                className="form-control"
              />
            </Col>
          </Row>

          <Row
            style={{ marginBottom: "10px" }}
            className="d-flex flex-column align-items-center"
          >
            <Col md={10}>
              <input
                type="text"
                value={ylabel}
                onChange={(e) => setYlabel(e.target.value)}
                placeholder="Y Label"
                className="form-control"
              />
            </Col>
          </Row>
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            onDrop={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
          >
            <div
              style={{
                marginTop: "5%",
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
        </div>
      </div>
    </>
  );
};

export default WspaceItemComponent;
