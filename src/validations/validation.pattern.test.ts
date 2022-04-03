import { renderHook } from '@testing-library/react-hooks';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';
import { pattern } from './validations';

describe('validations - pattern', () => {
    test('should set form.control.isValid to false when regex is incorrect', () => {
        const model: FormModel = {
            cellphone: {
                defaultValue: 'zero 913',
                validators: [pattern('patternName', /^(\+98?)?{?(0?9[0-9]{9,9}}?)$/)],
            },
        };

        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        expect(form.cellphone.isValid).toBe(false);
    });

    test('should set form.control.isValid to true when regex is correct', () => {
        const model: FormModel = {
            cellphone: {
                defaultValue: '9136868075',
                validators: [pattern('patternName', /^(\+98?)?{?(0?9[0-9]{9,9}}?)$/)],
            },
        };

        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        expect(form.cellphone.isValid).toBe(true);
    });
});
