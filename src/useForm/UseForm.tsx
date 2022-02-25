import { mapObjIndexed, compose } from 'ramda';
import { useMemo, useRef } from 'react';
import { useForceUpdate } from '../useForceUpdate/UseForceUpdate';
import { validate } from '../validations/validations';
import {
    setInitialState,
    setFormControllerValue,
    getElInputType,
    addElToRefs,
} from './UseForm.helper';
import {
    Convertor,
    Form,
    HTMLInputTypes,
    Ref,
    UseForm,
    JSXProp,
    GenerateObjProxy,
} from './UseForm.types';

const generateObjProxy: GenerateObjProxy = (obj, forceUpdate) => {
    const handler: ProxyHandler<typeof obj> = {
        set: (target: JSXProp, prop, receiver) => {
            target[prop] = receiver;
            if (prop === 'value') {
                forceUpdate();
            }
            return true;
        },
    };
    return new Proxy(obj, handler);
};

export const useForm = (form: Form): UseForm => {
    const refs = useRef<Ref[]>([]);
    const forceUpdate = useForceUpdate();

    const convertor: Convertor = (fieldValue) => {
        const obj: JSXProp = {
            jsx: {
                ref: (el: HTMLInputTypes) => {
                    if (el) {
                        const addEl = compose(
                            setInitialState(fieldValue),
                            addElToRefs(refs),
                            validate(objProxy, fieldValue.validations),
                            setFormControllerValue(objProxy),
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

        const objProxy = generateObjProxy(obj, forceUpdate);
        return obj;
    };

    return useMemo(() => mapObjIndexed(convertor, form), [form]);
};
