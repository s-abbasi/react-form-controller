import { ChangeEvent } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { min } from './validations';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';

describe('validations', () => {
    test('should set "form.control.isValid" to true when "validators: []"', () => {
        const model: FormModel = {
            firstName: {
                defaultValue: 'whatever',
                validators: [],
            },
        };
        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        expect(form.firstName.isValid).toBe(true);
    });

    test('should set "form.control.isValid" to false when "validators: [min(n)]" evaluates to false on hook initialization', () => {
        const model: FormModel = {
            firstName: {
                defaultValue: '5',
                validators: [min(6)],
            },
        };
        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        expect(form.firstName.isValid).toBe(false);
    });

    test('should set "form.control.isValid" to false when "validators: [min(n)]" evaluates to false on value change', () => {
        const model: FormModel = {
            firstName: {
                defaultValue: 2,
                validators: [min(2)],
            },
        };
        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        const change = { target: { value: '1' } } as ChangeEvent<HTMLInputElement>;
        form.bind('firstName').onChange(change);

        expect(form.firstName.isValid).toBe(false);
    });
});
