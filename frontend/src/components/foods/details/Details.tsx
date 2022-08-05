import { Food } from '../../../data_types';

export default function Details({ food }: { food: Food }) {
  return (
    <div className="Details">
      <div className="Name">{food.name}</div>
    </div>
  );
}
