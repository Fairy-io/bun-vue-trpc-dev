import { type Meta, type StoryObj } from '@storybook/vue3';
import { provide } from 'vue';
import {
    within,
    waitFor,
} from '@storybook/testing-library';
import { expect } from '@storybook/jest';
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
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        step('check message', async () => {
            await waitFor(() => {
                const label = canvas.getByTestId(
                    'home-page-content',
                );

                expect(label).not.toBeNull();
                expect(label.textContent).toBe(
                    'Hello World from Mocked Client',
                );
            });
        });
    },
};

export const WithoutApiClient: Story = {
    args: {},
    render: () => ({
        components: { Home },

        template: '<Suspense><Home /></Suspense>',
    }),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        step('check message', async () => {
            await waitFor(() => {
                const label = canvas.getByTestId(
                    'home-page-content',
                );

                expect(label).not.toBeNull();
                expect(label.textContent).toBe('');
            });
        });
    },
};
