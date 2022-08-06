// logic
import { useEffect } from 'react';
import { refresh } from 'reducers/foodsReducer';
import { useAppDispatch, useAppSelector } from 'hooks/reducer';
import { Food } from 'data_types';

// gui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// components
import Item from './Item';
import NewItem from './NewItem';

// styles
import './Table.scss';

export default function FoodsTable() {
  const dispatch = useAppDispatch();
  const { foods }: { foods: Food[] } = useAppSelector((state) => state.foods);

  useEffect(() => {
    dispatch(refresh());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
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
          <NewItem />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
