import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { createTextInput } from '../useForm/tests/helper';
import { useForm } from '../useForm/UseForm';
import { Form } from '../useForm/UseForm.types';
import { maxLength, minLength } from './validations';

describe('Validations', () => {
    test('should set form.name.isValid to the result of value given to validations', () => {
        const formModel: Form = {
            name: {
                initialValue: '',
                validations: [minLength(20)],
            },
        };

        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const inputTextEl = createTextInput();

        act(() => {
            form.name.jsx.ref(inputTextEl);
            fireEvent.input(inputTextEl, { target: { value: 'text less than 20' } });
        });

        expect(form.name.isValid).toBe(false);
    });

    test('should generate ControlError object when minLength evaluates to invalid', () => {
        const formModel: Form = {
            name: {
                initialValue: '',
                validations: [minLength(20)],
            },
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;
        const inputTextEl = createTextInput();

        act(() => {
            form.name.jsx.ref(inputTextEl);
            fireEvent.input(inputTextEl, { target: { value: 'text less than 20' } });
        });

        const expected = {
            name: 'minLength',
            message: 'value length should be more than 20',
        };

        expect(form.name.errors[0]).toStrictEqual(expect.objectContaining(expected));
    });

    test('should generate ControlError object when maxLength evaluates to invalid', () => {
        const formModel: Form = {
            name: {
                initialValue: '',
                validations: [maxLength(10)],
            },
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;
        const inputTextEl = createTextInput();

        act(() => {
            form.name.jsx.ref(inputTextEl);
            fireEvent.input(inputTextEl, { target: { value: 'text more than 20' } });
        });

        const expected = {
            name: 'maxLength',
            message: 'value length should be less than 10',
        };

        expect(form.name.errors[0]).toStrictEqual(expect.objectContaining(expected));
    });
});
