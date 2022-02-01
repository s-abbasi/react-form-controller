import { renderHook } from '@testing-library/react-hooks';
import { useForm } from './UseForm';
import { Form } from './UseForm.types';

const form: Form = {
    firstName: { initialValue: 'sajad' },
    lastName: { initialValue: 'abbasi' },
};

describe('UseForm', () => {
    it('should set returned value to given initialValue', () => {
        const { result } = renderHook(() => useForm(form));
        expect(result.current.firstName.value).toBe(form.firstName.initialValue);
    });
    it('should generate JSX bindings', () => {
        const { result } = renderHook(() => useForm(form));
        expect(result.current.firstName.jsx).toStrictEqual(
            expect.objectContaining({
                defaultValue: form.firstName.initialValue,
                onChange: expect.any(Function),
            })
        );
    });

    it.todo('should update value prop when input value changes');
});
