import classNames from 'classnames';
import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import { icons } from '../icons';

import './input.css';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	feedback?: string;
	className?: string;
	ref?: ForwardedRef<HTMLInputElement>;
	isShowIcon?: boolean;
}

export const Input: React.FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>(({ className, readOnly, feedback, isShowIcon, ...props }, ref) => {
	return (
		<div className={classNames('input__wrapper', { 'input--icon': isShowIcon })}>
			<input
				className={classNames('input', { 'input--read-only': readOnly, 'input--error': feedback }, className, )}
				ref={ref}
				readOnly={readOnly}
				{...props}
			/>
			{isShowIcon && <icons.Shape />}
			{feedback && <p className="input__feedback">{feedback}</p>}
		</div>
	);
});
