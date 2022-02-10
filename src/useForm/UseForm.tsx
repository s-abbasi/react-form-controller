import { mapObjIndexed, compose } from 'ramda';
import { MutableRefObject, useRef } from 'react';
import {
    checkRefExistence,
    setInitialValue,
    attachListenerToEl,
    getElInputType,
} from './UseForm.helper';
import { Convertor, Form, Ref, UseForm } from './UseForm.types';

const addElToRefs = (refs: MutableRefObject<Ref[]>, fieldName: keyof Form) => {
    return (el: HTMLInputElement) => {
        refs.current.push({ key: fieldName, ref: el });
        return el;
    };
};

export const useForm = (form: Form): UseForm => {
    const refs = useRef<Ref[]>([]);

    const convertor: Convertor = (fieldValue, fieldName) => {
        const refExist = checkRefExistence(fieldName, refs);
        const addElToRefList = addElToRefs(refs, fieldName);
        const setInitialValueToEl = setInitialValue(fieldValue.initialValue);

        return {
            jsx: {
                ref: (el: HTMLInputElement) => {
                    if (el && !refExist) {
                        const addEl = compose(
                            setInitialValueToEl,
                            addElToRefList,
                            attachListenerToEl,
                            getElInputType
                        );
                        addEl(el);
                    }
                },
            },
        };
    };

    return mapObjIndexed(convertor, form);
};
