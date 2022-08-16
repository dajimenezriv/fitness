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

// images
import testing from 'assets/testing.png';

// components
import FloatingButton from 'components/general/FloatingButton';
import Food from './Food';
import NewFood from './NewFood';

// styles
import './Foods.scss';

const fields = {
  calories: 'Calorías (kcal)',
  fats: 'Grasas (g)',
  carbs: 'Carbohidratos (g)',
  proteins: 'Proteínas (g)',
};

type stateTypes = {
  processing: boolean;
  foods: FoodType[];
};

export default function Foods() {
  const dispatch = useAppDispatch();

  const { processing, foods }: stateTypes = useAppSelector((state) => state.foods);

  const actions = [{ label: 'Crear Database de Testing', image: testing, onClick: () => dispatch(foodsReducer.resetDatabase()) }];

  useEffect(() => {
    dispatch(foodsReducer.getAll());
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Alimentos (cada 100g)</TableCell>
              {Object.values(fields).map((field) => (
                <TableCell key={field} align="right">
                  {field}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map((food) => (
              <Food key={food.id} food={food} fields={fields} />
            ))}
            <NewFood fields={fields} />
          </TableBody>
        </Table>
      </TableContainer>
      <FloatingButton actions={actions} processing={processing} />
    </>
  );
}
