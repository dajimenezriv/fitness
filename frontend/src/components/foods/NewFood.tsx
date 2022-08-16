// logic
import { useState } from 'react';
import { useAppDispatch } from 'hooks/reducer';
import { FoodType } from 'data_types';
import * as foodsReducer from 'reducers/foodsReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const initFood = {
  id: -1,
  name: '',
  market: '',
  calories: 0,
  carbs: 0,
  proteins: 0,
  fats: 0,
};

type params = {
  fields: {
    calories: string;
    fats: string;
    carbs: string;
    proteins: string;
  };
};

export default function NewFood({ fields }: params) {
  const [food, setFood] = useState<FoodType>(initFood);

  const dispatch = useAppDispatch();

  const addFood = () => {
    dispatch(foodsReducer.add(food));
    setFood({ ...initFood });
  };

  return (
    <TableRow className="NewFood" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell className="Actions">
        <AddCircleIcon onClick={addFood} />
      </TableCell>
      <TableCell component="th" scope="row">
        <input
          type="text"
          placeholder="Nuevo Alimento"
          onChange={(e) => setFood({ ...food, name: e.target.value })}
          value={food.name}
        />
      </TableCell>
      {Object.entries(fields).map(([key, value]) => {
        const val = food[key as keyof FoodType];
        const printVal = val === 0 ? '' : val;

        return (
          <TableCell key={key} align="right">
            <input
              type="number"
              placeholder={value}
              onChange={(e) => setFood({ ...food, [key]: e.target.value })}
              value={printVal}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}
