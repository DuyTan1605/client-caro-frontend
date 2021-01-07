import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import {useHistory} from "react-router-dom"
const columns = [
    { id: 'code', label: 'ID Game', minWidth: 100 },
  { id: 'name', label: "Game's Name", minWidth: 170 },
  {
    id: 'competitor',
    label: "Competitor 'name",
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'result',
    label: 'Result',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'detail',
    label: 'Detail',
    minWidth: 170,
    align: 'center'
  },
];

function createData(code,name, competitor, result,detail) {
  return { code,name, competitor, result,detail };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263,'/historyDetail/1'),
  createData('China', 'CN', 1403500365, 9596961,'/historyDetail/2'),
];

const useStyles = makeStyles({
  root: {
    margin: '2%'
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable(props) {
  
  const [rows,setRows] = useState(
    props.historyInfo.map(history=>{
      return createData(
        history.id,
        history.name?history.name:"RandomGame"+history.id,
        history.competitorName,
        history.type == "draw" ? "Draw" : (history.winner == history.competitorId ? "Lose" : "Win"),
        "/historyDetail/"+history.id
        );
    }))
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,fontWeight: 'bolder' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column,index) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id+index} align={column.align} 
                      style={{
                        color:(column.id == "result" && value == "Win") ? "green" : 
                        (column.id == "result" && value == "Lose" ? "red": 
                        (column.id == "result" && value == "Draw"?"orange":"black")),
                        fontWeight: column.id == "result" ? "bolder": 'normal' }}>
                        {column.id == "detail"? 
                        <a href={value}>
                            <Button variant="contained" color="primary" style={{textTransform:'none'}}>
                                Detail
                            </Button>
                        </a> 
                        : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
