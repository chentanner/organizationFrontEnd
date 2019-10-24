import React from 'react';
import PropTypes from 'prop-types';

import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import TablePaginationActions from './TablePaginationActions';

const TablePaginationFooter = props => {
    return (
        <TableFooter>
          <TableRow onDoubleClick={props.onRowDoubleClick}>
            <TablePagination 
              rowsPerPageOptions={[5, 11, 25]}
              colSpan={3}
              count={props.rowCount}
              rowsPerPage={props.rowsPerPage}
              page={props.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={props.onPageChange}
              onChangeRowsPerPage={props.onChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />  
          </TableRow>
        </TableFooter>
    );
};

export default TablePaginationFooter;