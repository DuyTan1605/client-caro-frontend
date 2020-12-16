import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { loadAllHistory } from '../../actions/auth.actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch} from "react-redux"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop:'2em'
  },
});


export default function BasicTable() {
  const classes = useStyles();
    const dispatch = useDispatch();
  const [rows,setRows]=useState([]);
    const [loading,setloading]=useState(true); 
    const id= JSON.parse(localStorage.getItem("user")).id;
  useEffect(()=>{
    dispatch(loadAllHistory(id))
      .then(()=>{
          setloading(false);
          const histories= JSON.parse(localStorage.getItem("histories")).histories;
          console.log(histories);
          setRows(histories);
        
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  },[])

  if(loading)
  {
      return(
        <div className={classes.rootLoading}>
          <CircularProgress />
      </div>
      )
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Game ID</TableCell>
            <TableCell >Opponent ID</TableCell>
            <TableCell >Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell >{row.board}</TableCell>
              <TableCell >{row.winner == id ? row.loser: row.winner}</TableCell>
              <TableCell >{row.winner == id?"Win":"Lose"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}