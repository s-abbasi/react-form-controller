import { useEffect, useRef } from 'react';

export const RenderCounter = (): JSX.Element => {
    const count = useRef(0);

    useEffect(() => {
        count.current += 1;
    });
    return <div>Render amount: {count.current}</div>;
};
