import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import AccordionTable from "./TableContainer.js";
import HomeEditTable from "./HomeEditTable.js";

const MultipleAccordions = (props) => {
  const [expandedPanel, setExpandedPanel] = useState(null);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <div className="mainTable">
      {props.dates && props.dates.map((item, key) => (
        <Accordion
          key={key}
          expanded={expandedPanel === key}
          onChange={handleChange(key)}
          className={
            (expandedPanel && expandedPanel === key) ? "basic expandedAccordion" : "basic expandedContent"
          }
        >
          <AccordionSummary >
            <Typography
              variant="h7"
              style={{ text: "center", fontWeight: 500, fontSize: "1.5rem" }}
            >
              {`Day ${key + 1}`}  {item.format("DD-MM-YYYY")}
            </Typography>
            <HomeEditTable
              tableData={props.tableData}
              settableData={props.settableData}
              date={item.format("DD-MM-YYYY")}
              day={key + 1}
              type={"newdata"}
              editClickState={props.editClickState}
              setEditClickState={props.setEditClickState}
            />
          </AccordionSummary>
          <AccordionDetails
            className="expandedContent mainAccordin2"
          >
            <AccordionTable tableData={props.tableData} date={item.format("DD-MM-YYYY")} settableData={props.settableData} check={props.check} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MultipleAccordions;
