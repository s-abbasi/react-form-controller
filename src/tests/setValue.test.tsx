import { render, screen } from '@testing-library/react';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';

describe('setValue', () => {
    test('should set value of control on form.controls.name.setValue(value)', () => {
        const Comp = (): JSX.Element => {
            const model: FormModel = { firstName: { initialValue: 'sajad' } };
            const form = useForm(model);

            form.controls.firstName.setValue('sara');

            return <input type="text" {...form.bind('firstName')} />;
        };

        render(<Comp />);

        const textbox = screen.getByRole('textbox');

        expect(textbox).toHaveValue('sara');
    });
});
