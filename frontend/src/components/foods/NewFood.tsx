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

const placeholders = {
  calories: '344',
  fats: '1',
  carbs: '75',
  proteins: '8.2',
};

export default function NewFood() {
  const [food, setFood] = useState<FoodType>(initFood);

  const dispatch = useAppDispatch();

  const addFood = () => {
    dispatch(foodsReducer.add(food));
    setFood({ ...initFood });
  };

  return (
    <TableRow className="NewItem">
      <TableCell className="Actions">
        <AddCircleIcon
          data-cy="add_food"
          onClick={addFood}
        />
      </TableCell>
      <TableCell
        component="th"
        scope="row">
        <input
          data-cy="new_name"
          type="text"
          placeholder="Arroz"
          onChange={(e) => setFood({ ...food, name: e.target.value })}
          value={food.name}
        />
      </TableCell>
      {Object.entries(placeholders).map(([key, value]) => {
        const val = food[key as keyof FoodType];
        const printVal = val === 0 ? '' : val;

        return (
          <TableCell
            key={key}
            align="right">
            <input
              data-cy={`new_${key}`}
              type="number"
              placeholder={`${value}g`}
              onChange={(e) => setFood({ ...food, [key]: e.target.value })}
              value={printVal}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}
