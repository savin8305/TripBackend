import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Table from "./TripHomeTable.js";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TripModal from "./MainModal.js";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Grid, FormControl, InputLabel, MenuItem, Select, Checkbox, ListSubheader, ListItemText, InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import SearchIcon from '@mui/icons-material/Search';

const SelectType = [
  { title: "Indivisual", name: 1994 },
  { title: "Group", name: 1972 },
];

const Empid = [
  { title: "67890", name: "Gopal" },
  { title: "98765", name: "Parvati" },
  { title: "45678", name: "Shiva" },
  { title: "87654", name: "Vishnu" },
  { title: "23456", name: "Lakshmi" },
];

const TripPage = (props) => {
  const [employeeID, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [type, setselecttype] = useState("");
  const [dept, setselectdept] = useState("");
  const [srnumber, setsrnumber] = useState("");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [fromLocationList, setFromLocationList] = useState([]);
  const [toLocationList, setToLocationList] = useState([]);
  const [tableData, settableData] = useState([]);
  const [saveDataParent, setsaveDataParent] = useState();
  const [dates, setDates] = useState([new Date()]);
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const formattedData1 = selectedEmployeeIds.map((id) => `${id.title}`).join(", ");
    const formattedData2 = selectedEmployeeIds.map((id) => `${id.name}`).join(", ");
    setEmployeeId(formattedData1);
    setEmployeeName(formattedData2);
  }, [selectedEmployeeIds]);

  const handleChange = (event) => {
    const { value } = event.target;
    setselectdept(value);
  };

  const handleToLocation = (value) => {
    const filteredLocations = toLocationList.filter((item) => item.title !== value);
    setFromLocationList(filteredLocations);
    setselecttype(value);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (dates.length > 1) {
      setOpen(true);
    }
  };
  useEffect(() => {
    const filteredOptions = Empid.filter(option =>
      option.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedOptions(filteredOptions);
  }, [searchText]);

  return (
    <div className="maintripcontainer">
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={2}>
          <div style={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel size="small" id="search-select-label">
                Employee ID
              </InputLabel>
              <Select
                labelId="search-select-label"
                id="search-select"
                multiple
                size="small"
                value={selectedEmployeeIds}
                label="Employee ID"
                renderValue={(selected) => {
                  const selectedOptions = selectedEmployeeIds.map((id) => `${id.title} - ${id.name}`);
                  return selectedOptions.join(", ");
                }}
                onClose={(e) => {
                  const value = e.target.value || ''; // Handle undefined value
                  setSelectedEmployeeIds(
                    value
                      .split(",")
                      .map((id) => {
                        const [title, name] = id.trim().split("-");
                        return { title, name };
                      })
                  );
                }}
                
              >
                <ListSubheader>
                  <TextField
                    size="small"
                    autoFocus
                    placeholder="Type to search..."
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </ListSubheader>
                {displayedOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={option.title}
                    onClick={() => {
                      const currentIndex = selectedEmployeeIds.findIndex(
                        (item) => item.title === option.title
                      );
                      const newSelectedOptions = [...selectedEmployeeIds];
                      if (currentIndex === -1) {
                        newSelectedOptions.push(option);
                      } else {
                        newSelectedOptions.splice(currentIndex, 1);
                      }
                      setSelectedEmployeeIds(newSelectedOptions);
                    }}
                  >
                    <Checkbox
                      checked={
                        selectedEmployeeIds.findIndex(
                          (item) => item.title === option.title
                        ) !== -1
                      }
                    />
                    <ListItemText primary={`${option.title} - ${option.name}`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Grid>

        {/* Other Grid items */}
        <Grid item xs={6} sm={6} md={3} lg={2} xl={2}>
          <Autocomplete
            size="small"
            onChange={(event, value) => handleToLocation(value)}
            id="to-location"
            freeSolo
            options={SelectType.map((option) => option.title)}
            renderInput={(params) => <TextField {...params} label="Select Type" />}
          />
        </Grid>
        {dept === "Services" ? (
          <>
            <Grid item xs={3} sm={4} md={2} lg={2} xl={2}>
              <FormControl fullWidth>
                <InputLabel id="travel-class-label">Select Dept.</InputLabel>
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
                size="small"
                fullWidth
                variant="outlined"
                value={srnumber}
                onChange={(e) => setsrnumber(e.target.value)}
                placeholder="Sr"
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={3} sm={4} md={2} lg={2} xl={2}>
              <FormControl fullWidth>
                <InputLabel id="travel-class-label">Select Dept.</InputLabel>
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
          <div style={{ marginLeft: "10px", zIndex: 1000, width: "140px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0",
              }}
            >
              <DatePicker
                value={dates}
                small
                onChange={setDates}
                format="MMMM DD YYYY"
                sort
                className={props.check ? "bg-dark datePickerAuto " : "datePickerAuto"}
                plugins={[<DatePanel />]}
              />
            </div>
          </div>
        </Grid>
        <IconButton
          variant="contained"
          style={{
            width: "60px",
            minWidth: "40px",
            paddingRight: "0px",
          }}
        >
          <EditCalendarRoundedIcon
            onClick={handleOpen}
            className="editCalendar"
            style={{ fontSize: '50px', width: '50px', height: '50px', left: '0' }}
          />
        </IconButton>
        <Grid item xs={12} sm={12}>
          <TripModal dates={dates} tableData={tableData} settableData={settableData} saveDataParent={saveDataParent} setsaveDataParent={setsaveDataParent} check={props.check} open={open} setOpen={setOpen} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Table check={props.check} tableData={tableData} settableData={settableData} saveDataParent={saveDataParent} setsaveDataParent={setsaveDataParent} employeeID={employeeID} employeeName={employeeName} type={type} dept={dept} srno={srnumber} dates={dates} />
        </Grid>
      </Grid>
    </div>
  );
};

export default TripPage;
