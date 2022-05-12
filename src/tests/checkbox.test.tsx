import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { ChangeEvent } from 'react';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';

describe('checkbox', () => {
    test('should set "form.control.value" to given defaultValue', () => {
        const formModel: FormModel = {
            single: true,
        };

        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        expect(form.single.value).toBe(true);
    });

    test('should set "defaultChecked={}" to given defaultValue of formModel', () => {
        const formModel: FormModel = {
            single: true,
        };

        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const { props } = <input type="checkbox" {...form.bind('single')} />;

        expect(props.defaultChecked).toBe(true);
    });

    test('should set "<input defaultChecked={}>" to the given defaultValue in FormModel', () => {
        const formModel: FormModel = {
            single: true,
        };

        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        expect(form.single.value).toBe(true);
    });

    test('should update "form.control.value" on onChange event', () => {
        const formModel: FormModel = {
            single: false,
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const change = {
            target: { checked: true, type: 'checkbox' },
        } as ChangeEvent<HTMLInputElement>;

        form.bind('single').onChange(change);

        expect(form.single.value).toBe(true);
    });

    test('should disable input on form.control.disable()', () => {
        const Comp = (): JSX.Element => {
            const formModel = {
                remember: {
                    initialValue: false,
                    disabled: false,
                },
            };
            const form = useForm(formModel);

            form.remember.disable();

            return <input type="text" {...form.bind('remember')} />;
        };

        render(<Comp />);

        const checkbox = screen.getByRole('textbox');
        expect(checkbox).toBeDisabled();
    });

    test('should enable input on form.control.enable()', () => {
        const Comp = (): JSX.Element => {
            const formModel = {
                remember: {
                    initialValue: false,
                    disabled: true,
                },
            };
            const form = useForm(formModel);

            form.remember.enable();

            return <input type="text" {...form.bind('remember')} />;
        };

        render(<Comp />);

        const checkbox = screen.getByRole('textbox');
        expect(checkbox).not.toBeDisabled();
    });

    test('should disable input when controlModel is set to disable', () => {
        const Comp = (): JSX.Element => {
            const formModel = {
                remember: {
                    initialValue: false,
                    disabled: true,
                },
            };
            const form = useForm(formModel);

            return <input type="checkbox" {...form.bind('remember')} />;
        };

        render(<Comp />);

        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeDisabled();
    });
});
