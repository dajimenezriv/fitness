import { useEffect, useState } from 'react';
import { Food } from '../../../data_types';
import * as foodsService from '../../../services/foods';
import Details from '../details/Details';

export default function List() {
  const [foods, setFoods] = useState<Food[] | []>([]);

  useEffect(() => {
    foodsService.getAll().then((res) => setFoods(res.data));
  }, []);

  return (
    <div className="List">
      {foods.map((food) => (
        <Details key={food.id} food={food} />
      ))}
    </div>
  );
}
