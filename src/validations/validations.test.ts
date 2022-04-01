import { ChangeEvent } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { max, min } from './validations';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';

describe('validations', () => {
    test('should set "form.control.isValid" to true when "validators: []"', () => {
        const model: FormModel = {
            price: {
                defaultValue: 'whatever',
                validators: [],
            },
        };
        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        expect(form.price.isValid).toBe(true);
    });

    test('should set "form.control.isValid" to false when "validators: [min(n)]" evaluates to false on hook initialization', () => {
        const model: FormModel = {
            price: {
                defaultValue: '5',
                validators: [min(6)],
            },
        };
        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        expect(form.price.isValid).toBe(false);
    });

    test('should set "form.control.isValid" to false when "validators: [min(n)]" evaluates to false on value change', () => {
        const model: FormModel = {
            price: {
                defaultValue: 2,
                validators: [min(2)],
            },
        };
        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        const change = { target: { value: '1' } } as ChangeEvent<HTMLInputElement>;
        form.bind('price').onChange(change);

        expect(form.price.isValid).toBe(false);
    });

    test('should generate form.control.errors object when control is not valid', () => {
        const model: FormModel = {
            price: {
                defaultValue: 1,
                validators: [min(2, 'value should be at least 2'), max(10)],
            },
        };

        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        expect(form.price.errors).toEqual({ min: 'value should be at least 2' });
    });

    test('should update form.control.errors object when input changes to an invalid value', () => {
        const model: FormModel = {
            price: {
                defaultValue: 2,
                validators: [min(2, 'value should be at least 2'), max(10)],
            },
        };

        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        const change = { target: { value: '1' } } as ChangeEvent<HTMLInputElement>;
        form.bind('price').onChange(change);

        expect(form.price.errors).toEqual({ min: 'value should be at least 2' });
    });
});
