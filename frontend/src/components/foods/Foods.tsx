// logic
import { useEffect } from 'react';
import * as foodsReducer from 'reducers/foodsReducer';
import { useAppDispatch, useAppSelector } from 'hooks/reducer';
import { FoodType } from 'data_types';

// gui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// components
import Food from './Food';
import NewFood from './NewFood';

// styles
import './Foods.scss';

export default function Foods() {
  const dispatch = useAppDispatch();
  const { foods }: { foods: FoodType[] } = useAppSelector((state) => state.foods);

  useEffect(() => {
    dispatch(foodsReducer.refresh());
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
            <Food key={food.id} food={food} />
          ))}
          <NewFood />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
