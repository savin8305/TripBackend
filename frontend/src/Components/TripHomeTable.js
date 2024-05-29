import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripModal from "./TripForTable.js";

const BasicTable = (props) => {
  const [details, setDetails] = React.useState([]);
  const [filteredDetails, setFilteredDetails] = React.useState([]);
  const [searchPlanId, setSearchPlanId] = React.useState("");
  const [editClickState, setEditClickState] = React.useState(false);
  const [editDate, setEditDate] = React.useState("");
  const [editDay, setEditDay] = React.useState("");
  const [editCountry, setEditCountry] = React.useState("");
  const [editState, setEditState] = React.useState("");
  const [editCity, setEditCity] = React.useState("");
  const [editClientName, setEditClientName] = React.useState("");
  const [editPurpose, setEditPurpose] = React.useState("");
  const [editRemarks, setEditRemarks] = React.useState("");
  const [editisDelete, setEditIsDelete] = React.useState(false);
  const [idforEdit, setId] = React.useState("");
  const [planid, setPlanid] = React.useState("");

  React.useEffect(() => {
    fetchData();
  }, [props.tableData]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getdata`);
      setDetails(response.data);
      setFilteredDetails(response.data);
      if (response.data.length > 0) {
        const lastPlanId = response.data[response.data.length - 1].PlanId;
        const incrementedPlanId = incrementPlanId(lastPlanId);
        setPlanid(incrementedPlanId);
        console.log("PlanId:", incrementedPlanId);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const incrementPlanId = (planId) => {
    const numericPart = parseInt(planId.substring(3));
    const nextNumericPart = numericPart + 1;
    return `Pl-${nextNumericPart.toString().padStart(4, '0')}`;
  };

  const deleteData = async (id, plan) => {
    try {
      await axios.delete(`http://localhost:4000/deletedata/${id}`);
      setDetails(details.filter((item) => item._id !== id));
      setFilteredDetails(filteredDetails.filter((item) => item._id !== id));
      toast.success(`🎉✨ Your plan ID ${plan} has been successfully deleted! ✨🎉`);
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchPlanId(value);
    
    const filteredData = details.filter(item => 
      item.PlanId && item.PlanId.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredDetails(filteredData);
  };
  

  const submitTableData = async () => {
    try {
      const tripTableData = convertToObjects(props.saveDataParent);
      const {
        employeeID: employee,
        employeeName: employeename,
        type,
        dept: department,
        srno: sno,
      } = props;
      await axios.post("http://localhost:4000/tripData", {
        tripTableData,
        employee,
        employeename,
        type,
        department,
        sno,
      });
      toast.success(`✨ Your plan ID ${planid} has been generated successfully! 🎉`);
      fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data. Please try again.");
    }
    props.settableData([]);
    props.setsaveDataParent([]);
  };

  const convertToObjects = (array) => {
    const objeArray = [];
    for (let i = 0; i < array.length; i++) {
      const innerArray = array[i];
      const obj = {};
      for (let j = 0; j < innerArray.length; j++) {
        switch (j) {
          case 0:
            obj.Date = innerArray[j];
            break;
          case 1:
            obj.Country = innerArray[j];
            break;
          case 2:
            obj.State = innerArray[j];
            break;
          case 3:
            obj.City = innerArray[j];
            break;
          case 4:
            obj.ClientName = innerArray[j];
            break;
          case 5:
            obj.Purpose = innerArray[j];
            break;
          case 6:
            obj.Remarks = innerArray[j];
            break;
          case 7:
            obj.Day = innerArray[j];
            break;
        }
      }
      objeArray.push(obj);
    }
    return objeArray;
  };

  const handleEdit = async (row) => {
    const {
      Date,
      Day,
      Country,
      State,
      City,
      ClientName,
      Purpose,
      Remarks,
      isDelete,
      _id,
    } = row;
    setEditDate(Date);
    setEditDay(Day);
    setEditCountry(Country);
    setEditState(State);
    setEditCity(City);
    setEditClientName(ClientName);
    setEditPurpose(Purpose);
    setEditRemarks(Remarks);
    setEditIsDelete(isDelete);
    setId(_id);
    setEditClickState(true);
  };

  const updateTableData = async (updatedData) => {
    try {
      await axios.put(`http://localhost:4000/updatedata/${idforEdit}`, updatedData);
      toast.success("Data updated successfully!");
      setEditClickState(false);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data. Please try again.");
    }
  };

  React.useEffect(() => {
    console.log("props.check:", props.check);
  }, [props.check]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TextField
        label="Search by PlanId"
        variant="outlined"
        value={searchPlanId}
        onChange={handleSearch}
        style={{ marginBottom: "1rem" }}
      />
      <div
        className="maintTripHomeTable"
        style={{
          margin: "1rem",
          overflowY: "hidden",
          overflowX: "auto",
          width: "70%",
        }}
      >
        <TableContainer component={Paper} style={{ maxHeight: "400px", background: props.check ? "" : "#f2f2f2" }}>
          <Table aria-label="simple table" size="small">
            <TableHead style={{ backgroundColor: props.check ? "black" : "#F4F6F6 " }}>
              <TableRow>
                {["Sr", "Date", "Day", "Country", "State", "City", "ClientName", "Purpose", "Remarks", "isDelete", "Actions"].map((header, index) => (
                  <TableCell
                    key={index}
                    align="left"
                    style={{
                      border: "1px solid #ddd",
                      fontWeight: "bold",
                      padding: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDetails.map((row, index) =>
                !row.isDelete ? (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    {[row.SRNumber, row.Date, row.Day, row.Country, row.State, row.City, row.ClientName, row.Purpose, row.Remarks, row.isDelete.toString()].map(
                      (data, dataIndex) => (
                        <TableCell
                          key={dataIndex}
                          align="left"
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            maxWidth: "100px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {data}
                        </TableCell>
                      )
                    )}
                    <TableCell
                      align="left"
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      <IconButton color="primary">
                        <EditIcon
                          style={{ color: props.check ? "white" : "black" }}
                          onClick={() => handleEdit(row)}
                        />
                        <TripModal
                          idforEdit={idforEdit}
                          dates={editDate}
                          days={editDay}
                          Country={editCountry}
                          State={editState}
                          City={editCity}
                          ClientName={editClientName}
                          Purpose={editPurpose}
                          Remarks={editRemarks}
                          isDelete={editisDelete}
                          check={props.check}
                          tableData={props.tableData}
                          settableData={props.settableData}
                          editClickState={editClickState}
                          setEditClickState={setEditClickState}
                          updateTableData={updateTableData}
                          type={"doNotOpen"}
                          types={"newthing"}
                        />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        onClick={() => deleteData(row._id, row.PlanId)}
                      >
                        <DeleteIcon
                          style={{ color: props.check ? "white" : "black" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "space-between", margin: "15px" }}>
        <Button
          style={{ backgroundColor: props.check ? "white" : "black" }}
          variant="contained"
          onClick={submitTableData}
          size="medium"
        >
          Submit
        </Button>
        <Button
          style={{ marginLeft: "20px", backgroundColor: props.check ? "white" : "black" }}
          variant="contained"
          size="medium"
          onClick={() => props.setsaveDataParent([])}
        >
          Clear
        </Button>
      </div>
      <ToastContainer style={{ marginTop: "5rem" }} />
    </div>
  );
};

export default BasicTable;
