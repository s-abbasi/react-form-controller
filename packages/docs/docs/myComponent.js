const model = {
    cellphone: { initialValue: '', validators: [min(9), max(10)] },
    password: { initialValue: '', disabled: true }
}

const Login = () => {

    const form = useForm(model);

    return <>
        <input type="tel" {...form.bind('cellphone')} />
        <input type="password" {...form.bind('cellphone')} />
        <button onClick={() => console.log(form)}>submit</button>
    </>

};