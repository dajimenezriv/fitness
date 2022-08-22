// logic
import { useEffect, useState } from 'react';
import * as foodsService from 'services/foods';

// gui
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Foods from './Foods';

type ParamsType = {
  tableLength: number;
  mealNumber: number;
};

export default function NewMenuFood({ tableLength, mealNumber }: ParamsType) {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    foodsService.getByName(name).then((res) => setFoods(res.data));
  }, [name]);

  return (
    <>
      <TableRow>
        <TableCell
          colSpan={tableLength}
          align="center">
          <AddCircleIcon
            data-cy="add_menu_food"
            onClick={() => setOpen(true)}
          />
        </TableCell>
      </TableRow>

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
    </>
  );
}
