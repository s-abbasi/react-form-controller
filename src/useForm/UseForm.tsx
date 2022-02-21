import { mapObjIndexed, compose } from 'ramda';
import { useMemo, useRef } from 'react';
import { validate } from '../validations/validations';
import {
    setInitialState,
    setFormControllerValue,
    getElInputType,
    addElToRefs,
} from './UseForm.helper';
import { Convertor, Form, HTMLInputTypes, Ref, UseForm } from './UseForm.types';

export const useForm = (form: Form): UseForm => {
    const refs = useRef<Ref[]>([]);

    const convertor: Convertor = (fieldValue) => {
        const obj = {
            jsx: {
                ref: (el: HTMLInputTypes) => {
                    if (el) {
                        const addEl = compose(
                            setInitialState(fieldValue),
                            addElToRefs(refs),
                            validate(obj, fieldValue.validations),
                            setFormControllerValue(obj),
                            getElInputType
                        );
                        addEl(el);
                    }
                },
            },
            value: fieldValue.initialValue,
            disable: !!fieldValue.disable,
            errors: [],
        };
        return obj;
    };

    return useMemo(() => mapObjIndexed(convertor, form), [form]);
};
