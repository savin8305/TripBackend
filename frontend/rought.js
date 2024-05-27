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
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ButtonDialog = (props) => {
  const [open, setOpen] = useState(false);

  const [countryValue, setCountryValue] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateValue, setStateValue] = useState(null);
  const [cityValue, setCityValue] = useState(null);
  const [gcountry, setgCountry] = useState(null);
  const [gstate, setgState] = useState(null);
  
  const [clientname, setClientName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  useEffect(() => {
    axios.get('https://api.countrystatecity.in/v1/countries', {
        headers: {
            'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
        }
    })
        .then(response => {
            setgCountry(response.data);
            setCountries(response.data);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}, []);


const handleCountryChange = (country) => {
    if (country) {
        setgCountry(country);
        axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
            headers: {
                'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
            }
        })
            .then(response => {
                setgState(response.data);
                setStates(response.data);
            })
            .catch(error => {
                console.error('Error fetching states:', error);
            });
    }
};

const handleStateChange = (state) => {
    if (state) {
        const countryCode = gcountry;
        const stateCode = state.state;
        axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
            headers: {
                'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
            }
        })
            .then(response => {
                setCities(response.data);
                setLoadingCities(false);
            })
            .catch(error => {
                console.error('Error fetching cities:', error);
                setLoadingCities(false);
            });
    }
};

  // const fetchCountries = async () => {
  //   try {
  //     const apiKey = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==";
  //     const apiUrl = "https://api.countrystatecity.in/v1/countries";

  //     const response = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-CSCAPI-KEY": apiKey,
  //       },
  //     });
  //     const data = await response.json();
  //     setGlobalCountryData(data);
  //     const countryNames = data.map((option) => option.name);
  //     setCountries(countryNames);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const fetchState = async (value) => {
  //   try {
  //     const country = globalcountrydata.find((item) => item.name === value);
  //     const apiKey = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==";
  //     const apiUrl = `https://api.countrystatecity.in/v1/countries/${country.iso2}/states`;

  //     const response = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-CSCAPI-KEY": apiKey,
  //       },
  //     });
  //     const data = await response.json();
  //     setGlobalStateData(data);
  //     console.log(globalstatedata);
  //     setStates(data);
  //     setStateId(country.id);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const fetchCity = async (value) => {
  //   try {
  //     const state = globalstatedata.find((item) => item.name === value);
  //     console.log(globalcountrydata[stateid].iso2);
  //     const apiKey = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=="
  //     const apiUrl = `https://api.countrystatecity.in/v1/countries/${globalcountrydata[stateid].iso2}/states/${state.iso2}/cities`;

  //     const response = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-CSCAPI-KEY": apiKey,
  //       },
  //     });
  //     const data = await response.json();
  //     setCities(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };


 

  const handleOpen = () => {
    if (props.type === "updatedata") {
      setSelectedCountry(props.row[1]);
      setSelectedState(props.row[2]);
      setSelectedCity(props.row[3]);
      setClientName(props.row[4]);
      setPurpose(props.row[5]);
      setRemarks(props.row[6]);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      clientname,
      purpose,
      remarks,
      props.day,
    ];
    console.log(datadialog);
    props.setmaindata([...props.maindata, datadialog]);
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
    setClientName("");
    setPurpose("");
    setRemarks("");
    handleClose();
    console.log(props.maindata);
  };

  const handleUpdateDialog = () => {
    const index = props.maindata.findIndex((datarow) => datarow === props.row);
    var row = [
      (props.maindata[index][0] = props.date),
      (props.maindata[index][1] = selectedCountry),
      (props.maindata[index][2] = selectedState),
      (props.maindata[index][3] = selectedCity),
      (props.maindata[index][4] = clientname),
      (props.maindata[index][5] = purpose),
      (props.maindata[index][6] = remarks),
    ];
    if (index !== -1) {
      const updatedData = [...props.maindata];
      updatedData[index] = row;
      props.setmaindata(updatedData);
    }
    console.log(props.row);
    console.log(props.maindata);
    handleClose();
  };

  return (
    <div>
      {props.type === "newdata" ? (
        <AddCircleOutlineOutlinedIcon onClick={handleOpen} />
      ) : (
        <IconButton onClick={handleOpen} color="primary">
          <EditIcon />
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontWeight: "bold" }}>
          {`Day-${props.day} ${props.date}`}
        </DialogTitle>
        <DialogContent>
          <form style={{ display: "flex", flexWrap: "wrap" }}>
          <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                size="small"
                                disablePortal
                                id="combo-box-country"
                                options={countries}
                                getOptionLabel={(option) => option.name}
                                value={countryValue ? countries.find(country => country.name === countryValue.name) : null}
                                onChange={(event, newValue) => {
                                    setCountryValue(newValue);
                                    handleCountryChange(newValue ? newValue.iso2 : null);
                                }}
                                renderInput={(params) => <TextField {...params} label="Country" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                size="small"
                                id="combo-box-state"
                                options={states}
                                getOptionLabel={(option) => option.name}
                                value={stateValue ? states.find(state => state.name === stateValue.name) : null}
                                onChange={(event, newValue) => {
                                    setStateValue(newValue);
                                    handleStateChange(newValue ? { country: newValue.country_iso2, state: newValue.iso2 } : null);
                                }}
                                renderInput={(params) => <TextField {...params} label="State" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                size="small"
                                id="combo-box-city"
                                options={cities}
                                getOptionLabel={(option) => option.name}
                                value={cityValue ? cities.find(city => city.name === cityValue.name) : null}
                                onChange={(event, newValue) => {
                                    setCityValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="City" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Client"
                                    value={clientname}
                                    onChange={(e) =>setClientName(e.target.value)}
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
                        <Grid item xs={6}>
                            <Box>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Purpose"
                                    value={purpose}
                                    onChange={(e) =>setPurpose(e.target.value)}
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
                        <Grid item xs={6}>
                            <Box>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Remarks"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
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
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          {props.type === "newdata" ? (
            <Button
              onClick={handleSubmitDialog}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleUpdateDialog}
              type="submit"
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};