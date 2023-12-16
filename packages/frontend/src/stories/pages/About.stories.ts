import { type Meta, type StoryObj } from '@storybook/vue3';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
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
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('check content', () => {
            const content =
                canvas.getByTestId('about-content');

            expect(content).not.toBeNull();
            expect(content.textContent).toBe(
                ' This is page about Company',
            );
        });
    },
};

export const AboutDevs: Story = {
    args: {
        name: 'Devs',
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('check content', () => {
            const content =
                canvas.getByTestId('about-content');

            expect(content).not.toBeNull();
            expect(content.textContent).toBe(
                ' This is page about Devs',
            );
        });
    },
};
