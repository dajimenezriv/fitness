// gui
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';

const nutrimentsFields = {
  'energy-kcal_100g': 'Calorías',
  carbohydrates_100g: 'Carbohidratos',
  sugars_100g: 'Azúcar',
  fiber_100g: 'Fibra alimentaria',
  fat_100g: 'Grasas',
  'satured-fat_100g': 'Grasas saturadas',
  proteins_100g: 'Proteínas',
  salt_100g: 'Sal',
  sodium_100g: 'Sodio',
};

type ParamsType = {
  product: {
    nutriments: any;
    stores: string;
  };
};

export default function ProductLabel({ product }: ParamsType) {
  if (!product) return null;

  const { nutriments, stores } = product;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Información nutricional</TableCell>
            <TableCell>Cada 100g</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Proveedor</TableCell>
            <TableCell>{stores}</TableCell>
          </TableRow>
          {Object.entries(nutrimentsFields).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{value}</TableCell>
              <TableCell>{nutriments[key]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
