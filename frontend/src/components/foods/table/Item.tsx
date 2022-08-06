// logic
import { Food } from 'data_types';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Item({ food }: { food: Food }) {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell><DeleteIcon /></TableCell>
      <TableCell component="th" scope="row">
        {food.name}
      </TableCell>
      <TableCell align="right">2</TableCell>
      <TableCell align="right">{food.fats}</TableCell>
      <TableCell align="right">{food.carbs}</TableCell>
      <TableCell align="right">{food.proteins}</TableCell>
    </TableRow>
  );
}
