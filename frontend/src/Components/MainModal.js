import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import "../Styles/global.css";
import TripAccordion from "./ChildModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export default function NestedModal(props) {
  const handleClose = () => {
    props.setOpen(false);
    if (props.editClickState) {
      props.setEditClickState(false);
    }
  };

  const handleclearmodal = () => {
    props.settableData([]);
    console.log("Data Cleared Successfully");
  };

  const handlesubmitmodal = () => {
    props.setsaveDataParent(props.tableData);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
          }}
          className="boxContainer"
          style={{
            borderRadius: '52px',
            background:props.check ?'linear-gradient(145deg, #151515, #191919)':'linear-gradient(145deg, #e6e6e6, #ffffff)',
          }}
               
          
        >
          <IconButton
            onClick={handleClose}
            aria-label="cancel"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: props.check ? "white" : "black",
            }}
          >
            <CancelIcon />
          </IconButton>
          <h2
            id="parent-modal-title"
            style={{
              fontSize: "1.5rem",
              color: props.check ? "white" : "black",
              textAlign: "center",
              marginBottom: '16px',
            }}
          >
            Plan for {props.dates.length} days
          </h2>
          <Box className="mainBoxContainer">
            <TripAccordion
              tableData={props.tableData}
              settableData={props.settableData}
              dates={props.dates}
              check={props.check}
              editClickState={props.editClickState}
            />
          </Box>
          <div className="btngroup">
            <Button
              className="tablebtn"
              variant="contained"
              onClick={handlesubmitmodal}
              size="medium"
              sx={{
                backgroundColor: props.check ? "white" : "black",
                color: props.check ? "black" : "white",
                borderRadius: "30px",
                ml: 2,
              }}
            >
              Save
            </Button>
            <Button
              className="tablebtn"
              variant="contained"
              size="medium"
              onClick={handleclearmodal}
              sx={{
                backgroundColor: props.check ? "white" : "black",
                color: props.check ? "black" : "white",
                borderRadius: "30px",
                ml: 2,
              }}
            >
              Clear
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
