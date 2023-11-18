import {
    setup,
    type Meta,
    type StoryObj,
} from '@storybook/vue3';
import { provide } from 'vue';
import Home from '../../pages/Home.vue';
import { mockedClient } from '../../trpc';

const meta = {
    title: 'pages/Home',
    component: Home,
    tags: ['autodocs'],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    render: () => ({
        components: { Home },

        setup() {
            provide('trpc-client', mockedClient);
        },
        template: '<Suspense><Home /></Suspense>',
    }),
};
