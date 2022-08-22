import axios from 'axios';

const baseUrl = 'https://world.openfoodfacts.org/api/v2/product';

export const getByBarcode = (barcode: string) => axios.get(`${baseUrl}/${barcode}`);
export default getByBarcode;
