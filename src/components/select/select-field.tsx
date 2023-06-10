import React, { forwardRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ISelectOption, ISelectProps, Select } from './select';

export interface ISelectFieldProps extends Omit<ISelectProps, 'onChange'> {
	name: string;
	register?: boolean;
	onChange?: any,
};

export const SelectField: React.FC<ISelectFieldProps> = forwardRef(({ register, onChange, ...props }, ref) => {
	const { name, required } = props;
	const form = useFormContext();
	const formValue = useWatch({ control: form?.control, name }) as string | number | undefined;

	if (register) {
		form.register(name, { required });
	}

	const handleInputChange = (option: unknown) => {
		const parsedOption = option as ISelectOption;

		form.setValue(name, parsedOption.value);
		form.trigger(name);
	}

	return (
		<Select ref={ref as any} onChange={handleInputChange} value={formValue?.toString()} feedback={form?.formState?.errors[name]?.message as string} {...props} />
	);
});
