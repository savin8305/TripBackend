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
        <TableContainer component={Paper} className='mainTableContainer'>
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>Sr.</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>Date</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>Country</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>State</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>City</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>Client Name</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>Purpose</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>Remarks</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newdata && newdata.map((row, key) => (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
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
                      <HomeEditTable tableData={props.tableData} settableData={props.settableData} date={props.date} day={key + 1} type={"updatedata"} row={row} editClickState={props.editClickState} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row)} color="secondary" size="small">
                      <DeleteIcon style={{ color: props.check ? "white" : "black" }}/>
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
