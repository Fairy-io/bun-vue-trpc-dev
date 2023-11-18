import { type Meta, type StoryObj } from '@storybook/vue3';
import About from '../../pages/About.vue';

const meta = {
    title: 'pages/About',
    component: About,
    tags: ['autodocs'],
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AboutCompany: Story = {
    args: {
        name: 'Company',
    },
};

export const AboutDevs: Story = {
    args: {
        name: 'Devs',
    },
};
