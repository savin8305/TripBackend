import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Grid } from '@mui/material';
import HomeEditTable from "./HomeEditTable.js";
import "../Styles/global.css";

export default function BasicTable(props) {
  const handleDelete = (id) => {
    console.log('Deleting row with ID:', id);
    props.settableData(props.tableData.filter(row => !row.every((item, index) => item === id[index])));
  };

  const newdata = props.tableData && props.tableData.filter((row) => row[0] === props.date);

  return (
    <Grid className='TableContainer1' container spacing={2}>
      <Grid item xs={12}>
        <TableContainer 
          component={Paper} 
          className='mainTableContainer hide-scrollbar' 
          style={{ 
            background: props.check ? "" : "#f2f2f2", 
            maxHeight: '300px', 
            overflowY: 'auto',
            overflowX: 'hidden' // Added to hide horizontal scrollbar
          }} 
        >
          <Table aria-label="simple table" size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {['Sr.', 'Date', 'Country', 'State', 'City', 'Client Name', 'Purpose', 'Remarks', 'Actions'].map((header, index) => (
                  <TableCell key={index} align="left" style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {newdata && newdata.map((row, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left" style={{ border: '1px solid #ddd', fontSize: '0.8rem', padding: '8px' }}>
                    {key + 1}
                  </TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd', fontSize: '0.8rem', padding: '8px' }}>
                    {row[0]}
                  </TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd', fontSize: '0.8rem', padding: '8px' }}>{row[1]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd', fontSize: '0.8rem', padding: '8px' }}>{row[2]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd', fontSize: '0.8rem', padding: '8px' }}>{row[3]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd', fontSize: '0.8rem', padding: '8px' }}>{row[4]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd', fontSize: '0.8rem', padding: '8px' }}>{row[5]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd', fontSize: '0.8rem', padding: '8px' }}>{row[6]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd', padding: '8px', display: 'flex', gap: '4px' }}>
                    <IconButton color="primary" size="small">
                      <HomeEditTable 
                        tableData={props.tableData} 
                        settableData={props.settableData} 
                        date={props.date} 
                        day={key + 1} 
                        type={"updatedata"} 
                        row={row} 
                        editClickState={props.editClickState} 
                      />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row)} color="secondary" size="small">
                      <DeleteIcon style={{ color: props.check ? "white" : "black" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
