import { useReducer } from 'react';

export const useForceUpdate = (): (() => void) => {
    // return useReducer(() => ({}), {})[1] as () => void;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    return forceUpdate;
};
