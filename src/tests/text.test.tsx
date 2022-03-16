import { ChangeEvent } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { FormModel } from '../useForm/useForm.types';
import { useForm } from '../useForm/useForm';

describe('text', () => {
    test('should set "<input defaultValue={}>" to the given defaultValue in FormModel', () => {
        const formModel: FormModel = {
            firstName: { defaultValue: 'sajad' },
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
});
