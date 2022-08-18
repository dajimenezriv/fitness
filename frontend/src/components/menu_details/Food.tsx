// logic
import { useState } from 'react';
import { FoodType } from 'data_types';
import { useAppDispatch } from 'hooks/reducer';
import * as menuFoodsReducer from 'reducers/menuFoodsReducer';

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
  fields: {
    calories: string;
    fats: string;
    carbs: string;
    proteins: string;
  };
  mealNumber: number;
};

export default function Food({ food, fields, mealNumber }: ParamsType) {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const save = () => {
    dispatch(menuFoodsReducer.add(food, quantity, mealNumber));
    setOpen(false);
  };

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => setOpen(true)}>
        <TableCell component="th" scope="row">
          {food.name}
        </TableCell>
        {Object.keys(fields).map((field) => (
          <TableCell key={`${field}-${food.id}`} align="right">
            {food[field as keyof FoodType]}
          </TableCell>
        ))}
      </TableRow>

      <Dialog fullWidth maxWidth="xs" open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <TextField
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
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={save}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
