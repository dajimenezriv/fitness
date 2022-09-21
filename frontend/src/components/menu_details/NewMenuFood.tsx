// logic
import { useState } from 'react';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// components
import FoodsDialog from './scanner_food/FoodsDialog';

type ParamsType = {
  tableLength: number;
  mealNumber: number;
};

export default function NewMenuFood({ tableLength, mealNumber }: ParamsType) {
  const [open, setOpen] = useState(false);

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

      <FoodsDialog
        open={open}
        setOpen={setOpen}
        mealNumber={mealNumber}
      />
    </>
  );
}
