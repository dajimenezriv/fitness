// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function NewItem() {
  return (
    <TableRow className="NewItem" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell className="Actions">
        <AddCircleIcon />
      </TableCell>
      <TableCell component="th" scope="row">
        <input type="text" placeholder="Nuevo Alimento" />
      </TableCell>
      <TableCell align="right">
        <input type="number" />
      </TableCell>
      <TableCell align="right">
        <input type="number" />
      </TableCell>
      <TableCell align="right">
        <input type="number" />
      </TableCell>
      <TableCell align="right">
        <input type="number" />
      </TableCell>
    </TableRow>
  );
}
