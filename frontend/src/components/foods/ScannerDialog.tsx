// logic
import { useState } from 'react';
import { Dialog, DialogContent, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// components
import Scanner from './Scanner';

// styles
import './ScannerDialog.scss';

type ParamsType = {
  open: boolean;
  setOpen: any;
};

export default function ScannerDialog({ open, setOpen }: ParamsType) {
  const [barcode, setBarcode] = useState<string>('');

  return (
    <Dialog
      maxWidth="xl"
      open={open}
      onClose={() => setOpen(false)}>
      <DialogContent>
        <TextField
          data-cy="search"
          className="Search"
          type="text"
          variant="outlined"
          placeholder="Buscar Código de Barras"
          onChange={(e) => setBarcode(e.target.value)}
          value={barcode}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <div className="container">
          <Scanner
            open={open}
            setBarcode={setBarcode}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
