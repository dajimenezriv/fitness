// logic
import { useEffect, useState } from 'react';
import * as foodsService from 'services/foods';

// gui
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

// components
import Foods from './Foods';

type ParamsType = {
  open: boolean,
  setOpen: any,
  mealNumber: number;
};

export default function FoodsDialog({ open, setOpen, mealNumber }: ParamsType) {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    foodsService.getByName(name).then((res) => setFoods(res.data));
  }, [name]);

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={() => setOpen(false)}>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Alimento"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />

        <Foods
          foods={foods}
          mealNumber={mealNumber}
        />
      </DialogContent>
    </Dialog>
  );
}
