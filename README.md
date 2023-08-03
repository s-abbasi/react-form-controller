# Why?

When I migrated from Angular to React, there were two things that I really missed in the Angular ecosystem, `routing` and `formGroups`. The way Angular was handling forms was elegant, simple, and powerful. At this time I could not find any proper React alternative, therefore, I decided to create my own form handler.

  This library is my attempt to create a form controller that respects the separation of concern and has a simple API.



## Create/bind a formGroup

```TS
const model: FormModel = {
	 username: { initialValue: '' },
	 password: { initialValue: '' },	 
 }
const form = useForm(model)

return <>
	<input {...form.bind('username')} />
	<input {...form.bind('password')} />
</>
```


## Native validators

`react-from-controller` comes with 4 built-in validators: `minLength`, `maxLength`, `required`, `pattern`.

```TS
const model: FormModel = {
	 username: ...
	 password: { initialValue: '', validators: minLength(8)  },	 
 }
const form = useForm(model)
```


## Custom validators
You can also create your own custom validators.
```TS
const password = [
  {
    name: 'containsDigit',
    message: 'password should contain at least one digit',
    validateWith: (value: string) => /\d/.test(value),
  }
];

const model: FormModel = {
	 username: ...
	 password: { initialValue: '', validators: containsDigit },	 
 }
```
