import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Form } from '../../useForm/UseForm.types';
import { FormMUI } from './formMUI';

export default {
    title: 'mui/form',
    component: FormMUI,
} as ComponentMeta<typeof FormMUI>;

const formModel: Form = {
    name: { initialValue: '' },
};

const Template: ComponentStory<typeof FormMUI> = (args: Form): JSX.Element => (
    <FormMUI {...args} />
);

export const Primary = Template.bind({});
Primary.args = formModel;
