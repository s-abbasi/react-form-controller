import { mapObjIndexed, compose } from 'ramda';
import { useRef } from 'react';
import { validate } from '../validations/validations';
import {
    checkRefExistence,
    setInitialState,
    attachListenerToEl,
    getElInputType,
    addElToRefs,
} from './UseForm.helper';
import { Convertor, Form, Ref, UseForm } from './UseForm.types';

export const useForm = (form: Form): UseForm => {
    const refs = useRef<Ref[]>([]);

    const convertor: Convertor = (fieldValue, fieldName) => {
        const refExist = checkRefExistence(fieldName, refs);
        const addElToRefList = addElToRefs(refs, fieldName);
        const setInitialStateToEl = setInitialState(fieldValue);

        const obj = {
            jsx: {
                ref: (el: HTMLInputElement) => {
                    if (el && !refExist) {
                        const addEl = compose(
                            setInitialStateToEl,
                            addElToRefList,
                            validate(obj, fieldValue.validations),
                            attachListenerToEl(obj),
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

    return mapObjIndexed(convertor, form);
};
