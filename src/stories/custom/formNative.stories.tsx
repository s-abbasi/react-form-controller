import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FormModel } from '../../useForm/useForm.types';
import { FormCustom } from './customNative';

export default {
    title: 'custom/form',
    component: FormCustom,
} as ComponentMeta<typeof FormCustom>;

const formModel: FormModel = {
    firstName: {
        initialValue: 'sajad',
    },
};

const Template: ComponentStory<typeof FormCustom> = (): JSX.Element => (
    <FormCustom {...formModel} />
);
export const Primary = Template.bind({});
Primary.args = formModel;
