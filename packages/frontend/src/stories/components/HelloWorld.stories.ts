import { type Meta, type StoryObj } from '@storybook/vue3';
import HelloWorld from '../../components/HelloWorld.vue';

const meta = {
    title: 'components/HelloWorld',
    component: HelloWorld,
    tags: ['autodocs'],
} satisfies Meta<typeof HelloWorld>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        msg: 'Hi',
    },
};
