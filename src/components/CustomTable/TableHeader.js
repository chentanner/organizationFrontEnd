import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const TableHeader = props => {

    const createCell = (columnConfig) => {
        return (
            <TableCell 
                key={columnConfig.id} 
                {...columnConfig.cellOptions} 
            >
                {columnConfig.label}
            </TableCell>
        );
    }

    return (
        <TableHead>
          <TableRow>
            {props.config.columns.map((columnConfig)=> createCell(columnConfig))}
          </TableRow>  
        </TableHead>
    );
};

TableHeader.propTypes = {
    
};

export default TableHeader;