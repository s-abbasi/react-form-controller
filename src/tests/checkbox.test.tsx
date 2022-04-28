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

    test.skip('should set "HTMLInputElement.disabled" to true when control is initially disabled', () => {
        const formModel: FormModel = {
            single: {
                initialValue: true,
                disabled: true,
            },
        };

        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const el = document.createElement('INPUT') as HTMLInputElement;
        el.setAttribute('type', 'checkbox');

        form.bind('single').ref(el);

        expect(el.disabled).toBe(true);
    });
});
