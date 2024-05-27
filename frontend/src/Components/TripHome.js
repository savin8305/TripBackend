import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Table from "./TripHomeTable.js";
import Autocomplete from "@mui/material/Autocomplete";
import TripModal from "./MainModal.js";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Grid, Box, FormControl, useMediaQuery, InputLabel, MenuItem, Select, Popover, Checkbox, Button } from "@mui/material";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import axios from "axios";

const SelectType = [
  { title: "Individual", name: 1994 },
  { title: "Group", name: 1972 },
];

const TripPage = (props) => {
  const [employeeID, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [type, setselecttype] = useState("");
  const [dept, setselectdept] = useState("");
  const [srnumber, setsrnumber] = useState("");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fromLocationList, setFromLocationList] = useState([]);
  const [toLocationList, setToLocationList] = useState([]);
  const [tableData, settableData] = useState([]);
  const [saveDataParent, setsaveDataParent] = useState();
  const [dates, setDates] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/employee');
        const employeeData = response.data;
        const formattedEmployeeData = employeeData.map(emp => ({
          title: emp.EmployeeId,
          name: emp.EmployeeName
        }));

        const Empid = formattedEmployeeData[0].title.map((title, index) => ({
          title,
          name: formattedEmployeeData[0].name[index]
        }));

        setEmployeeOptions(Empid);
        console.log("data from backend ", Empid);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    fetchEmployeeData();
  }, []);

  const handleOpenAutoComplete = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAutoComplete = () => {
    setAnchorEl(null);
  };
  const handleAutocompleteChange = (event, value) => {
    setSelectedEmployeeIds(value);
  };
  useEffect(() => {
    console.log("Selected Employee IDs:", selectedEmployeeIds);
    if (selectedEmployeeIds.length === 1) {
      setselecttype("Individual");
    } else if (selectedEmployeeIds.length >= 2) {
      setselecttype("Group");
    } else {
      setselecttype("");
    }

    console.log("Type:", type);
  }, [selectedEmployeeIds, type]);


  const handleChange = (event) => {
    const { value } = event.target;
    setselectdept(value);
  };

  const handleToLocation = (value) => {
    const filteredLocations = toLocationList.filter((item) => item.title !== value);
    setFromLocationList(filteredLocations);
    setselecttype(value);
  };

  const employeedata = [employeeID, employeeName, type, dept, srnumber];
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTab = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isTv = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (dates.length >= 1) {
      setOpen(true);
    }
  };
  useEffect(() => {
    const employeeIds = selectedEmployeeIds.map(employee => employee.title);
    const employeeNames = selectedEmployeeIds.map(employee => employee.name);
    console.log("employeeid triphome", employeeIds);
    console.log("employeename triphome", employeeNames);
    setEmployeeId(employeeIds.join(", "));
    setEmployeeName(employeeNames.join(", "));
    console.log("employeeid triphome2", employeeIds.join(", "));
    console.log("employeename triphome2", employeeNames.join(", "));
  }, [selectedEmployeeIds, employeeID, employeeName]);
  return (
    <div className="maintripcontainer">
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={2}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: props.check ? "white" : "black",
              },
              "& .MuiInputBase-input": {
                color: props.check ? "white" : "black",
              },
              "& .MuiInputLabel-root": {
                color: props.check ? "white" : "black",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: props.check ? "white" : "black",
              },
            }}
            size="small"
            autoFocus
            fullWidth
            label="Search by Employee Ids"
            onClick={handleOpenAutoComplete}
            value={selectedEmployeeIds.map((id) => `${id.title}-${id.name}`).join(", ")}
            onChange={(e) => {
              const value = e.target.value;
              if (!value) {
                setSelectedEmployeeIds([]);
              } else {
                const ids = value.split(",").map((id) => {
                  const [title, name] = id.trim().split("-");
                  return { title, name };
                }).filter((item) => item.title && item.name);
                setSelectedEmployeeIds(ids);
              }
            }}
            className="firstAutoC"
          />
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseAutoComplete}
            anchorOrigin={{
              vertical: "bottom",
            }}
            transformOrigin={{
              vertical: "top",
            }}
          >
            <Autocomplete
              multiple
              size="small"
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: props.check ? "white" : "black",
                },
                "& .MuiInputBase-input": {
                  color: props.check ? "white" : "black",
                },
                "& .MuiInputLabel-root": {
                  color: props.check ? "white" : "black",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: props.check ? "white" : "black",
                },
              }}
              fullWidth
              options={employeeOptions}
              getOptionLabel={(option) =>`${option.title}-${option.name}`}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox style={{ marginRight: 2 }} checked={selected} />
                  {`${option.title}-${option.name}`}
                </li>
              )}
              value={selectedEmployeeIds}
              onChange={handleAutocompleteChange}
              renderInput={(params) => (
                <TextField
                  className="firstBox"
                  {...params}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: props.check ? "white" : "black",
                    },
                    "& .MuiInputBase-input": {
                      color: props.check ? "white" : "black",
                    },
                    "& .MuiInputLabel-root": {
                      color: props.check ? "white" : "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: props.check ? "white" : "black",
                    },
                  }}
                  placeholder="Search"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <p variant="outlined" label={`${option.title}-${option.name}`} {...getTagProps({ index })} />
                ))
              }
            />
          </Popover>
        </Grid>

        <Grid className="thirdBox" item xs={6} sm={6} md={3} lg={2} xl={2}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: props.check ? "white" : "black",
              },
              "& .MuiInputBase-input": {
                color: props.check ? "white" : "black",
              },
              "& .MuiInputLabel-root": {
                color: props.check ? "white" : "black",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: props.check ? "white" : "black",
              },
            }}
            size="small"
            onChange={(event, value) => handleToLocation(value)}
            id="to-location"
            freeSolo
            options={SelectType.map((option) => option.title)}
            value={type}
            className="secondAutoC"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Type"
                InputLabelProps={{
                  style: { color: props.check ? "white" : "black" },
                }}
              />
            )}
          />
        </Grid>
        {dept === "Services" ? (
          <>
            <Grid item xs={3} sm={4} md={2} lg={2} xl={2}>
              <FormControl sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: props.check ? "white" : "black",
                },
                "& .MuiInputBase-input": {
                  color: props.check ? "white" : "black",
                },
                "& .MuiInputLabel-root": {
                  color: props.check ? "white" : "black",
                },
              }} fullWidth className="serviceFormC">
                <InputLabel
                  size="small"
                  id="travel-class-label"
                  style={{ color: props.check ? "white" : "black" }}
                >
                  Select Dept.
                </InputLabel>
                <Select

                  size="small"
                  labelId="travel-class-label"
                  id="demo-simple-select"
                  value={dept}
                  label="Select Dept"
                  onChange={(event) => handleChange(event)}
                >
                  <MenuItem value={"Sales"}>Sales</MenuItem>
                  <MenuItem value={"Operation"}>Operations</MenuItem>
                  <MenuItem value={"Services"}>Services</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} sm={2} md={1} lg={1} xl={2}>
              <TextField
                className="serviceForm2"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: props.check ? "white" : "black",
                  },
                  "& .MuiInputBase-input": {
                    color: props.check ? "white" : "black",
                  },
                  "& .MuiInputLabel-root": {
                    color: props.check ? "white" : "black",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: props.check ? "white" : "black",
                  },
                }}
                size="small"
                fullWidth
                variant="outlined"
                value={srnumber}
                onChange={(e) => setsrnumber(e.target.value)}
                placeholder="Sr"
                style={{ width: '90%' }}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={3} sm={4} md={2} lg={2} xl={2}>
              <FormControl
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: props.check ? "white" : "black",
                  },
                  "& .MuiInputBase-input": {
                    color: props.check ? "white" : "black",
                  },
                  "& .MuiInputLabel-root": {
                    color: props.check ? "white" : "black",
                  },
                }}
                className="serviceBig"
              >
                <InputLabel
                  size="small"
                  id="travel-class-label"
                  style={{ color: props.check ? "white" : "black" }}
                >
                  Select Dept.
                </InputLabel>
                <Select
                  size="small"
                  labelId="travel-class-label"
                  id="demo-simple-select"
                  value={dept}
                  label="Select Dept"
                  onChange={(event) => handleChange(event)}
                >
                  <MenuItem value={"Sales"}>Sales</MenuItem>
                  <MenuItem value={"Operation"}>Operations</MenuItem>
                  <MenuItem value={"Services"}>Services</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        )}

        <Grid item xs={6} sm={6} md={3} lg={3} xl={2}>
          <div style={{ marginLeft: "8px", zIndex: 1000, width: "170px" }}>
            <div
              className={dept === "Services" ? "whenService" : 'serviceDatePicker'}
              style={{
                display: "flex",
                alignItems: "center",
                width: "75%",
                padding: "0",
              }}
            >
              <DatePicker
                value={dates}
                small
                onChange={setDates}
                format="MMMM DD YYYY"
                sort
                className={props.check ? "bg-dark datePickerAuto" : "datePickerAuto"}
                plugins={[<DatePanel />]}
                style={{
                  height: "32px",
                  backgroundColor: props.check ? "#222222" : "#ffffff",
                  color: props.check ? "#ffffff" : "#333333",
                  width: "90%",
                  zIndex: 1000,
                  height: isMobile
                    ? "4vh"
                    : isTab
                      ? "35px"
                      : isTv
                        ? "35px"
                        : isLaptop
                          ? "35px"
                          : "4.9vh",
                  width: isMobile
                    ? "95%"
                    : isTab
                      ? "40vw"
                      : isLaptop
                        ? "200px"
                        : isTv
                          ? "350px"
                          : "200px",
                }}
              />
              <EditNoteOutlinedIcon
                onClick={handleOpen}
                className={dept === "services" ? "" : "calendareditChild"}
                style={{ fontSize: '30px', width: '34px', height: '30px', color: props.check ? "white" : "black", background:props.check ? "black" : "white"}}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <h1 style={{ textAlign: "center" }}>Trip Plan</h1>
          <TripModal
            dates={dates}
            tableData={tableData}
            settableData={settableData}
            saveDataParent={saveDataParent}
            setsaveDataParent={setsaveDataParent}
            check={props.check}
            open={open}
            setOpen={setOpen}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Table
            check={props.check}
            tableData={tableData}
            settableData={settableData}
            saveDataParent={saveDataParent}
            setsaveDataParent={setsaveDataParent}
            employeedata={employeedata}
            employeeID={employeeID}
            employeeName={employeeName}
            selectedEmployeeIds={selectedEmployeeIds}
            type={type}
            dept={dept}
            srno={srnumber}
            dates={dates}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TripPage;