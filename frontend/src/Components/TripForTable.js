import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import DialogBox from './NestedForm.js';
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
export default function NestedModal(props) {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        if (props.editClickState) {
            props.setEditClickState(false);
        }
    };
    const handleOpen = () => {
        setOpen(true);
    }
    const handleclearmodal = () => {
        props.settableData([]);
        console.log("Data Cleared Successfully")
    }
    const handlesubmitmodal = () => {
        props.setsaveDataParent(props.tableData)
        handleClose()
    }
    return (
        <div>
            {
                props.dates.length >= 1 ? (
                    <IconButton variant="contained" style={{ marginLeft: "10px" }}>
                        {(props.type !== "doNotOpen") && (props.dates.length >= 1) ? (
                            <EditCalendarRoundedIcon
                                onClick={handleOpen}
                                style={{ fontSize: '40px', width: '40px', height: '40px', margin: "4px", position: 'absolute', top: '0', left: '0' }}
                            />
                        ) : ("")}
                    </IconButton>
                ) : ("")
            }
            <Modal
                open={open || props.editClickState}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box
                    sx={{
                        ...style,
                        width: 1000,
                        height: 500,
                        boxShadow: "0 0 10px 0 white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    className="modalparent"
                >
                    <h2 id="parent-modal-title" style={{ fontSize: "3rem", color: props.check ? "white" : "black" }}>
                        Plan
                    </h2>
                    <Box
                        style={{
                            width: "95%",
                            height: "85%",
                            overflowY: "none",
                            overflowX: "none",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <DialogBox
                            idforEdit={props.idforEdit}
                            Country={props.Country}
                            State={props.State}
                            City={props.City}
                            Client={props.ClientName}
                            Purpose={props.Purpose}
                            Remarks={props.Remarks}
                            tableData={props.tableData}
                            settableData={props.settableData}
                            date={props.dates}
                            day={props.days}
                            editClickState={props.editClickState}
                            setEditClickState={props.setEditClickState}
                            type={"updatedata"}
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
                                borderRadius: "30px  ",
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
                                borderRadius: "30px  ",
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
