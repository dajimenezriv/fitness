// logic
import { useState } from 'react';
import { FoodType, NumberDictType } from 'data_types';
import { useAppDispatch } from 'hooks/reducer';
import * as menuFoodsReducer from 'reducers/menuFoodsReducer';
import { mainNutrients } from 'nutrients';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type ParamsType = {
  food: FoodType;
  mealNumber: number;
};

export default function Food({ food, mealNumber }: ParamsType) {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const save = () => {
    dispatch(menuFoodsReducer.add(food.id, quantity, mealNumber));
    setOpen(false);
  };

  return (
    <>
      <TableRow
        data-cy={`food-${food.name}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        onClick={() => setOpen(true)}>
        <TableCell
          component="th"
          scope="row">
          {food.name}
        </TableCell>

        {mainNutrients.map((nutrient) => (
          <TableCell
            key={`${nutrient}-${food.id}`}
            align="right">
            {food.nutrients[nutrient as keyof NumberDictType]}
          </TableCell>
        ))}
      </TableRow>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}>
        <DialogContent>
          <TextField
            data-cy="quantity"
            autoFocus
            margin="dense"
            label="Cantidad"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            data-cy="cancel_menu_food"
            onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            data-cy="save_menu_food"
            onClick={save}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
