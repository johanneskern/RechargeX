import classNames from 'classnames';
import React, { CSSProperties, forwardRef } from 'react';
import ReactSelect, { Props } from 'react-select';
import ReactSelectType from 'react-select/dist/declarations/src/Select';

import './select.css';

export interface ISelectOption<TMeta = unknown> { value: string, label: string | React.ReactNode, meta: TMeta; };

export interface IGroupedOption<TMeta = unknown> {
	label: string;
	options: ISelectOption<TMeta>[];
}

export interface ISelectProps extends Omit<Props, 'value'> {
	/**
	 * Readonly.
	 */
	readOnly?: boolean;
	/**
	 * Style
	 */
	style?: CSSProperties;
	/**
	 * Value.
	 */
	value?: string;
	/**
	 * Ref.
	 */
	ref?: any;
	/**
	 * Feedback.
	 */
	feedback?: string;
};

export const Select: React.FC<ISelectProps> = forwardRef<ReactSelectType, ISelectProps>(({ 
	className, 
	isDisabled, 
	readOnly, 
	style, 
	value, 
	placeholder, 
	options, 
	feedback,
	...props 
}, ref) => {
	const hasGroupedOptions = options != null && options.length > 0 && (options[0] as object).hasOwnProperty('options');

	const optionValue = hasGroupedOptions
		? (options as IGroupedOption[]).flatMap(grouped => grouped.options).find(opt => opt.value === value)
		: (options as ISelectOption[] | undefined)?.find(opt => opt.value === value);

	return (
		<div className="select__wrapper">
			<ReactSelect
				className={classNames('select', { 'select--read-only': readOnly }, className)}
				isDisabled={readOnly ?? isDisabled}
				ref={ref as any}
				styles={{ control: (styles) => ({ ...styles, width: style?.width ?? 320 }) }}
				classNamePrefix="select"
				value={optionValue ?? ''}
				placeholder={placeholder ?? ''}
				options={options}
				isOptionDisabled={(option: any) => {
					if (option?.meta?.isDisabled) {
						return option?.meta?.isDisabled;
					}

					return option.isDisabled;
				}}
				{...props}
			/>
			{feedback && <p className="select__feedback">{feedback}</p>}
		</div>
	)
});
