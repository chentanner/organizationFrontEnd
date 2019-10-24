import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TablePaginationFooter from './TablePaginationFooter';

function createData(name, id, calories, fat) {
  return { 
    name, id, calories, fat 
  };
}

const defaultRows = [
  createData('Cupcake','Cupcake', 305, 3.7),
  createData('Donut','Donut', 452, 25.0),
  createData('Eclair','Eclair', 262, 16.0),
  createData('Frozen yoghurt','FrozenYoghurt', 159, 6.0),
  createData('Gingerbread', 'Gingerbread', 356, 16.0),
  createData('Honeycomb','Honeycomb', 408, 3.2),
  createData('Ice cream sandwich','IceCreamSandwich', 237, 9.0),
  createData('Jelly Bean', 'JellyBean', 375, 0.0),
  createData('KitKat', 'KitKat', 518, 26.0),
  createData('Lollipop', 'Lollipop', 392, 0.2),
  createData('Marshmallow', 'Marshmallow', 318, 0),
  createData('Nougat', 'Nougat', 360, 19.0),
  createData('Oreo', 'Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  spacer: {
    flex: '1 1 100%',
  },
}));

const tableConfig = {
  headerConfig:{
    columns:[
      {
        id:"dessert",
        label:"Dessert (100g serving)",
        cellOptions:{
        }
      },
      {
        id:"calories",
        label:"Calories",
        cellOptions:{
          align:"right"
        }
      },
      {
        id:"fat",
        label:"Fat (g)",
        cellOptions:{
          align:"right"
        }
      },
      {
        id:"carbs",
        label:"Carbs (g)",
        cellOptions:{
          align:"right"
        }
      },
      {
        id:"protein",
        label:"Protein (g)",
        cellOptions:{
          align:"right"
        }
      }
    ]
  }
};


export default function CustomPaginationActionsTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(11);
  const [rows, setRows] = React.useState({rows:defaultRows})
  const [selected, setSelected] = React.useState(null);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleClick(event, row) {
    setSelected(selected===row.name?null:row.name);
    props.onRowClick(event, row.id)
  }

  const isSelected = name => selected===name;

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <TableToolbar/>
        
        <Table className={classes.table}>
          <TableHeader config={tableConfig.headerConfig}/>
          <TableBody>
            {rows.rows.map(row => {
              const isItemSelected = isSelected(row.name);
              return (
              <TableRow 
                hover
                key={row.id}
                selected={isItemSelected}
                onClick={(event) => {handleClick(event, row)}}
                onDoubleClick={(event) => {props.onRowDoubleClick(event, row.name)}}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            )})}
          </TableBody>
          <TablePaginationFooter 
            rowCount={rows.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </div>
    </Paper>
  );
}
