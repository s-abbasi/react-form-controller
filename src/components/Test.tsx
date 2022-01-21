export function Test(): JSX.Element {
    const pipe = (...args: string[]): string => JSON.stringify(args);

    const form = {
        firstName: pipe(''),
        lastName: '',
    };

    return (
        <>
            <p>HELLO WORLD!</p>
            <div>bla</div>
        </>
    );
}
