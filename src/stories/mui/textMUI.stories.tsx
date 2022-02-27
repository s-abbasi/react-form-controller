import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form } from '../../useForm/UseForm.types';
import { TextMUI } from './textMUI';

export default {
    title: 'mui/TextField',
    component: TextMUI,
} as ComponentMeta<typeof TextMUI>;

const formModel: Form = {
    name: { initialValue: '' },
};

const Template: ComponentStory<typeof TextMUI> = (args: Form): JSX.Element => (
    <TextMUI {...args} />
);

export const WithoutInitialValue = Template.bind({});
WithoutInitialValue.args = formModel;

export const WithInitialValue = Template.bind({});
WithInitialValue.args = { ...formModel, name: { initialValue: 'initial value' } };
