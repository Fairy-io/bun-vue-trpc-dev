import type { Meta, StoryObj } from '@storybook/vue3';
import Home from '../../pages/Home.vue';

const meta = {
    title: 'pages/Home',
    component: Home,
    tags: ['autodocs'],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    decorators: [
        () => {
            return {
                template: '<Suspense><story /></Suspense>',
            };
        },
    ],
};
