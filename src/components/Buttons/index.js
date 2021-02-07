import React from 'react';

const ButtonType = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white font-bold rounded',
  secondary: 'bg-base-500 hover:bg-base-600  text-white font-bold rounded',
  outline:
    'border-primary-600 border-2 hover:border-primary-700 text-white font-bold rounded',
  outline_secondary:
    'border-base-500 border-2 hover:border-base-600 text-white font-bold rounded',
  link: 'text-white font-bold rounded',
};

const ButtonSize = {
  sm: 'py-2 px-6 text-lg',
  lg: 'py-3 px-9 text-xl',
};

const Disabled = {
  true: 'opacity-50',
};

function Button({ type, size, disabled, children, ...props }) {
  const classNames =
    ButtonType[type] + ' ' + ButtonSize[size] + ' ' + Disabled[disabled];
  return (
    <button {...props} className={classNames}>
      {children}
    </button>
  );
}

export default Button;
