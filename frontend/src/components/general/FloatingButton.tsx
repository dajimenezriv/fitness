// logic
import { useState } from 'react';
import cn from 'classnames';

// images
import floatingButton from 'assets/floatingButton.png';

// styles
import './FloatingButton.scss';

type ActionType = {
  label: string;
  image: string;
  onClick: any;
};

type ParamsType = {
  processing: boolean;
  actions: Array<ActionType>;
};

export default function FloatingButton({ processing, actions }: ParamsType) {
  const [open, setOpen] = useState(false);

  const mouseEnter = () => setOpen(true);
  const mouseLeave = () => setOpen(false);
  const mouseClick = (action: ActionType) => {
    if (!processing) action.onClick();
  };

  return (
    <ul
      className={cn('Options', { open })}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}>
      <li className="Option">
        <img
          src={floatingButton}
          alt="floatingButton"
        />
      </li>
      {actions.map((action: ActionType, index: number) => (
        <li
          data-cy={action.label}
          role="button" // eslint-disable-line
          style={{ transitionDelay: `${index * 25}ms` }}
          className={cn('Action', { open }, { processing })}
          key={action.label}
          onClick={() => mouseClick(action)}
          onKeyDown={() => mouseClick(action)}>
          <img
            src={action.image}
            alt="excel"
          />
          <span className="Tooltip">{action.label}</span>
        </li>
      ))}
    </ul>
  );
}
