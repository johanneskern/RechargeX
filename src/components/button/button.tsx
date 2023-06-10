import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

import './button.css';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Variant.
	 */
	variant?: 'primary' | 'secondary';
	/**
	 * Additional classes for the component.
	 */
	className?: string;
};

export const Button: React.FC<IButtonProps> = ({ variant = 'primary', className, ...props }) => {
	return (
		<button className={classNames('button', `button--${variant}`, className)} {...props} />
	);
};
