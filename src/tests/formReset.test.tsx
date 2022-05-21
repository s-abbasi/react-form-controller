import { renderHook } from '@testing-library/react-hooks/lib/pure';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';
import { minLength, required } from '../useForm/validations';
import { generateChangeEvent } from './test.helper';

describe('formReset', () => {
    test('should resets form', () => {
        const model: FormModel = {
            firstName: {
                initialValue: 'sajad',
                validators: [required()],
            },
            lastName: {
                initialValue: 'abbasi',
            },
        };

        const form = renderHook(() => useForm(model)).result.current;

        const originalForm = JSON.stringify(form);

        const change = generateChangeEvent('sara');
        form.bind('firstName').onChange(change);
        form.controls.lastName.addValidator(minLength(10));

        form.reset();

        const controlAfterReset = JSON.stringify(form);

        expect(originalForm).toBe(controlAfterReset);
    });

    test.todo('should re-subscribe on controls that had been subscribed');
    test.todo('should re-evaluate validations on form.reset()');
    test.todo('should not remove controls added with form.addControl(...)');
});
