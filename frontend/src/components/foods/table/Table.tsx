import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.scss';
import { useEffect, useState } from 'react';
import * as foodsService from '../../../services/foods';
import { Food } from '../../../data_types';
import Item from './Item';

export default function FoodsTable() {
  const [foods, setFoods] = useState<Food[] | []>([]);

  useEffect(() => {
    foodsService.getAll().then((res) => setFoods(res.data));
  }, []);

  return (
    <TableContainer className="Table" component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Alimentos (cada 100g)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat (g)</TableCell>
            <TableCell align="right">Carbs (g)</TableCell>
            <TableCell align="right">Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map((food) => (
            <Item key={food.id} food={food} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
