import React, { useEffect, useState, useRef, useContext } from "react";
import Plot from "react-plotly.js";
import { Row, Col } from "react-bootstrap";
import { WorkspaceContext } from "../App";

const WspaceItemComponent = ({ index }) => {
  const { currentWs, switchWs } = useContext(WorkspaceContext);

  const [graphsData, setGraphsData] = useState([]);
  const [plotName, setPlotName] = useState("New Plot");
  const [xlabel, setXlabel] = useState("X");
  const [ylabel, setYlabel] = useState("Y");

  const plotColors = ["blue", "red", "green", "yellow", "purple"];

  const [rootWidth, setRootWidth] = useState(
    document.documentElement.clientWidth
  );

  useEffect(() => {
    setPlotName("New Plot");
    setXlabel("X Label");
    setYlabel("Y Label");

    const storedData = JSON.parse(localStorage.getItem(currentWs));
    if (storedData == null) {
      setPlots({});
      return;
    }

    // Process each canvas data to create Plot traces
    const graphsDataData = storedData.plots[index].graphs.map((graph, _) => {
      return {
        x: graph.x,
        y: graph.y,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: plotColors[index] },
      };
    });

    setGraphsData(graphsDataData);
  }, [currentWs]);

  useEffect(() => {
    const handleResize = () => {
      setRootWidth(document.documentElement.clientWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div style={{ border: "2px solid black", flex: "1" }}>
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
          style={{ height: "100%", borderRight: "2px solid black" }}
          className="d-flex flex-column justify-content-center"
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
        </div>
      </div>
    </>
  );
};

export default WspaceItemComponent;
