import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import Box from '@mui/material/Box';
import EditIcon from "@mui/icons-material/Edit";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const ButtonDialog = (props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [globalCountryData, setGlobalCountryData] = useState([]);
  const [globalStateData, setGlobalStateData] = useState([]);
  const [globalCityData, setGlobalCityData] = useState([]);
  const [clientName, setClientName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [remarks, setRemarks] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [iso2Code, setIso2Code] = useState("");

  const apiKey = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==";

  const fetchCountries = async () => {
    try {
      const apiUrl = "https://api.countrystatecity.in/v1/countries";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSCAPI-KEY": apiKey,
        },
      });
      const data = await response.json();
      setGlobalCountryData(data);
      setCountries(data.map((option) => option.name));
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (iso2) => {
    try {
      const apiUrl = `https://api.countrystatecity.in/v1/countries/${iso2}/states`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSCAPI-KEY": apiKey,
        },
      });
      const data = await response.json();
      setGlobalStateData(data);
      setStates(data.map((state) => state.name));
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (countryIso2, stateIso2) => {
    try {
      const apiUrl = `https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateIso2}/cities`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSCAPI-KEY": apiKey,
        },
      });
      const data = await response.json();
      setGlobalCityData(data);
      setCities(data.map((city) => city.name));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = async (e, value) => {
    setSelectedCountry(value);
    if (value) {
      const country = globalCountryData.find((item) => item.name === value);
      setIso2Code(country.iso2);
      await fetchStates(country.iso2);
      setSelectedState("");
      setSelectedCity("");
    } else {
      setStates([]);
      setCities([]);
      setSelectedState("");
      setSelectedCity("");
      setIso2Code("");
    }
  };

  const handleStateChange = async (e, value) => {
    setSelectedState(value);
    if (value) {
      const state = globalStateData.find((item) => item.name === value);
      await fetchCities(iso2Code, state.iso2);
      setSelectedCity("");
    } else {
      setCities([]);
      setSelectedCity("");
    }
  };

  const handleCityChange = (e, value) => {
    setSelectedCity(value);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const country = globalCountryData.find((item) => item.name === selectedCountry);
      if (country) {
        fetchStates(country.iso2);
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const state = globalStateData.find((item) => item.name === selectedState);
      if (state) {
        fetchCities(iso2Code, state.iso2);
      }
    }
  }, [selectedState]);

  const handleOpen = async () => {
    if (props.type === "updatedata") {
      setSelectedCountry(props.row[1]);
      setSelectedState(props.row[2]);
      setSelectedCity(props.row[3]);
      setClientName(props.row[4]);
      setPurpose(props.row[5]);
      setRemarks(props.row[6]);
      if (props.row[1]) {
        const country = globalCountryData.find((item) => item.name === props.row[1]);
        if (country) {
          setIso2Code(country.iso2);
          await fetchStates(country.iso2);
        }
      }
      if (props.row[2]) {
        const country = globalCountryData.find((item) => item.name === props.row[1]);
        const state = globalStateData.find((item) => item.name === props.row[2]);
        if (state) {
          await fetchCities(country.iso2, state.iso2);
        }
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset the form fields on close
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
    setClientName("");
    setPurpose("");
    setRemarks("");
  };

  const handleClearInput = () => {
    setClientName('');
  };

  const handleClearPurpose = () => {
    setPurpose('');
  };

  const handleClearRemarks = () => {
    setRemarks('');
  };

  const handleSubmitDialog = () => {
    const datadialog = [
      props.date,
      selectedCountry,
      selectedState,
      selectedCity,
      clientName,
      purpose,
      remarks,
      props.day,
    ];
    props.settableData([...props.tableData, datadialog]);
    handleClose();
  };

  const handleUpdateDialog = () => {
    const index = props.tableData.findIndex((datarow) => datarow === props.row);
    var row = [
      (props.tableData[index][0] = props.date),
      (props.tableData[index][1] = selectedCountry),
      (props.tableData[index][2] = selectedState),
      (props.tableData[index][3] = selectedCity),
      (props.tableData[index][4] = clientName),
      (props.tableData[index][5] = purpose),
      (props.tableData[index][6] = remarks),
    ];
    if (index !== -1) {
      const updatedData = [...props.tableData];
      updatedData[index] = row;
      props.settableData(updatedData);
    }
    handleClose();
  };

  const getColor = () => (theme.palette.mode === 'dark' ? 'white' : 'black');

  return (
    <div>
      {props.type === "newdata" ? (
        <AddCircleOutlineOutlinedIcon onClick={handleOpen} />
      ) : (
        <IconButton onClick={handleOpen} color="primary">
          <EditIcon style={{ color: getColor() }} />
        </IconButton>
      )}
      <Dialog open={open}>
        <DialogTitle style={{ display: "flex", alignItems: "center" }}>
          <IconButton style={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: getColor(),
          }} edge="start" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          {`Day-${props.day} ${props.date}`}
        </DialogTitle>
        <DialogContent>
          <form style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: getColor(),
                    },
                    "& .MuiInputBase-input": {
                      color: getColor(),
                    },
                    "& .MuiInputLabel-root": {
                      color: getColor(),
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: getColor(),
                    },
                  }}
                  size="small"
                  disablePortal
                  id="combo-box-country"
                  options={countries}
                  getOptionLabel={(option) => option}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a country"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: getColor(),
                    },
                    "& .MuiInputBase-input": {
                      color: getColor(),
                    },
                    "& .MuiInputLabel-root": {
                      color: getColor(),
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: getColor(),
                    },
                  }}
                  disablePortal
                  size="small"
                  id="combo-box-state"
                  options={states}
                  getOptionLabel={(option) => option}
                  value={selectedState}
                  onChange={handleStateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a state"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: getColor(),
                    },
                    "& .MuiInputBase-input": {
                      color: getColor(),
                    },
                    "& .MuiInputLabel-root": {
                      color: getColor(),
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: getColor(),
                    },
                  }}
                  disablePortal
                  size="small"
                  id="combo-box-city"
                  options={cities}
                  getOptionLabel={(option) => option}
                  value={selectedCity}
                  onChange={handleCityChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a city"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: getColor(),
                      },
                      "& .MuiInputBase-input": {
                        color: getColor(),
                      },
                      "& .MuiInputLabel-root": {
                        color: getColor(),
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: getColor(),
                      },
                    }}
                    size="small"
                    fullWidth
                    label="Client"
                    onChange={(e) => setClientName(e.target.value)}
                    value={clientName}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" aria-label="delete" onClick={handleClearInput}>
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: getColor(),
                      },
                      "& .MuiInputBase-input": {
                        color: getColor(),
                      },
                      "& .MuiInputLabel-root": {
                        color: getColor(),
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: getColor(),
                      },
                    }}
                    size="small"
                    fullWidth
                    label="Purpose"
                    onChange={(e) => setPurpose(e.target.value)}
                    value={purpose}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" aria-label="delete" onClick={handleClearPurpose}>
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: getColor(),
                      },
                      "& .MuiInputBase-input": {
                        color: getColor(),
                      },
                      "& .MuiInputLabel-root": {
                        color: getColor(),
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: getColor(),
                      },
                    }}
                    size="small"
                    fullWidth
                    label="Remarks"
                    onChange={(e) => setRemarks(e.target.value)}
                    value={remarks}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" aria-label="delete" onClick={handleClearRemarks}>
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ backgroundColor: getColor(), color: theme.palette.background.paper }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          {props.type === "newdata" ? (
            <Button
              style={{ backgroundColor: getColor(), color: theme.palette.background.paper }}
              onClick={handleSubmitDialog}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: getColor(), color: theme.palette.background.paper }}
              onClick={handleUpdateDialog}
              type="submit"
              variant="contained"
            >
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ButtonDialog;