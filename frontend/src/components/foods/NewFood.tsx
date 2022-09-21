// logic
import { useState } from 'react';
import { useAppDispatch } from 'hooks/reducer';
import { NumberDictType } from 'data_types';
import * as foodsReducer from 'reducers/foodsReducer';
import { mainNutrients, titles } from 'nutrients';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function NewFood() {
  const [name, setName] = useState<string>('');
  const [nutrients, setNutrients] = useState<NumberDictType>({});

  const dispatch = useAppDispatch();

  const addFood = () => {
    dispatch(foodsReducer.add({ name, nutrients }));
    setName('');
    setNutrients({});
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
          placeholder="Nombre del Alimento"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </TableCell>
      {mainNutrients.map((nutrient) => {
        const val = nutrients[nutrient as keyof NumberDictType];
        const printVal = (!val || val === 0) ? '' : val;

        return (
          <TableCell
            key={nutrient}
            align="right">
            <input
              data-cy={`new_${nutrient}`}
              type="number"
              placeholder={`${titles[nutrient]}`}
              onChange={(e) =>
                setNutrients({
                  ...nutrients,
                  [nutrient]: parseFloat(e.target.value),
                })
              }
              value={printVal}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}
