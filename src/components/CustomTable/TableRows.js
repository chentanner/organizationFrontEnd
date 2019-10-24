import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function TableRows (props){

    const rowsPerPage = props.rowsPerPage;
    const page = props.page;
    const rows = props.rows.rows;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const rowComponentsArray = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(row => (
            <TableRow hover key={row.name}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">
                    {row.calories}
                </TableCell>
                <TableCell align="right">
                    {row.fat}
                </TableCell>
            </TableRow>
            ));
            
    // Append empty row if an empty row needs to be rendered.    
    rowComponentsArray.push(emptyRows > 0?
        <TableRow hover key="emptyRow" style={{ height: 48 * emptyRows }}>
            <TableCell colSpan={6} />
        </TableRow>
        :null);

    return rowComponentsArray;
}