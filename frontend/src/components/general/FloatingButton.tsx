// logic
import React, { useState } from 'react';
import cn from 'classnames';

// images
import floatingButton from 'assets/floatingButton.png';

// styles
import './FloatingButton.scss';

type actionType = {
  label: string;
  image: string;
  onClick: any;
};

export default function FloatingButton({ processing, actions }: { processing: boolean; actions: Array<actionType> }) {
  const [open, setOpen] = useState(false);

  const mouseEnter = () => setOpen(true);
  const mouseLeave = () => setOpen(false);
  const mouseClick = (action: actionType) => {
    if (!processing) action.onClick();
  };

  return (
    <ul className={cn('fab-container', { open })} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <li className="fab-button">
        <img src={floatingButton} alt="floatingButton" />
      </li>
      {actions.map((action: actionType, index: number) => (
        <li
          data-cy={action.label}
          role="button" // eslint-disable-line
          style={{ transitionDelay: `${index * 25}ms` }}
          className={cn('fab-action', { open }, { processing })}
          key={action.label}
          onClick={() => mouseClick(action)}
          onKeyDown={() => mouseClick(action)}
        >
          <img src={action.image} alt="excel" />
          <span className="tooltip">{action.label}</span>
        </li>
      ))}
    </ul>
  );
}
