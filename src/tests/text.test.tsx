import { ChangeEvent } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { FormChangeEvent, FormModel } from '../useForm/useForm.types';
import { useForm } from '../useForm/useForm';

describe('text', () => {
    test('should set "<input defaultValue={}>" to the given defaultValue in FormModel', () => {
        const formModel: FormModel = {
            firstName: { initialValue: 'sajad' },
        };

        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const { props } = <input type="text" {...form.bind('firstName')} />;
        expect(props.defaultValue).toBe('sajad');
    });

    test('should set "<input defaultValue={}>" to the given value in FormModel', () => {
        const formModel: FormModel = {
            firstName: 'sara',
        };

        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const { props } = <input type="text" {...form.bind('firstName')} />;
        expect(props.defaultValue).toBe('sara');
    });

    test('should set form.firstName.value to defaultValue given in model', () => {
        const formModel: FormModel = {
            firstName: 'sajad',
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        expect(form.firstName.value).toBe('sajad');
    });

    test('should update form.value on onChange event', () => {
        const formModel: FormModel = {
            firstName: '',
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const change = { target: { value: 'sara' } } as ChangeEvent<HTMLInputElement>;
        form.bind('firstName').onChange(change);

        expect(form.firstName.value).toBe('sara');
    });

    test('should disable input on form.control.disable()', () => {
        const Comp = (): JSX.Element => {
            const formModel: FormModel = {
                firstName: '',
            };
            const form = useForm(formModel);
            form.firstName.disable();

            return <input type="text" {...form.bind('firstName')} />;
        };

        render(<Comp />);

        const el = screen.getByRole('textbox');
        expect(el).toBeDisabled();
    });

    test('should enable input on form.control.enable()', () => {
        const Comp = (): JSX.Element => {
            const formModel: FormModel = {
                firstName: {
                    initialValue: '',
                    disabled: true,
                },
            };
            const form = useForm(formModel);
            form.firstName.enable();

            return <input type="text" {...form.bind('firstName')} />;
        };

        render(<Comp />);

        const textbox = screen.getByRole('textbox');
        expect(textbox).not.toBeDisabled();
    });

    test('should disable input when controlModel is set to disable', () => {
        const Comp = (): JSX.Element => {
            const formModel: FormModel = {
                firstName: {
                    initialValue: '',
                    disabled: true,
                },
            };
            const form = useForm(formModel);

            return <input {...form.bind('firstName')} />;
        };

        render(<Comp />);

        const textbox = screen.getByRole('textbox');
        expect(textbox).toBeDisabled();
    });

    test('should set form.control.isTouched to true on blur event', () => {
        const formModel: FormModel = {
            firstName: 'sajad',
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const onBlueEvent = (): boolean => true;
        form.bind('firstName').onBlur(onBlueEvent as unknown as FormChangeEvent);

        expect(form.firstName.isTouched).toBe(true);
    });

    test('should set form.control.isDirty to true on input change event', () => {
        const formModel: FormModel = {
            firstName: 'sajad',
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const change = { target: { value: 'newValue' } } as ChangeEvent<HTMLInputElement>;
        form.bind('firstName').onChange(change);

        expect(form.firstName.isDirty).toBe(true);
    });
});
