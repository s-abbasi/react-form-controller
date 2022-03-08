import TextField from '@mui/material/TextField';

export const TextMUI = (formModel: any): JSX.Element => {
    console.log('formModel: ', formModel);
    return (
        <>
            <p>text MUI</p>
            <TextField label="Outlined" variant="outlined" />
        </>
    );
};
