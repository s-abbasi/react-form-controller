import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FormMUI } from './formMUI';

export default {
    title: 'mui/form',
    component: FormMUI,
} as ComponentMeta<typeof FormMUI>;

// const formModel: unknown = {
//     name: { initialValue: '' },
// };

const Template: ComponentStory<typeof FormMUI> = (args: any): JSX.Element => (
    <FormMUI {...args} />
);

export const Primary = Template.bind({});
// Primary.args = formModel;
