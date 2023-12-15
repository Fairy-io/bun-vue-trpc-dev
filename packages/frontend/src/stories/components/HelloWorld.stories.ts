import { type Meta, type StoryObj } from '@storybook/vue3';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
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
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        step('check message', () => {
            const label = canvas.getByTestId(
                'hello-world-content',
            );

            expect(label).not.toBeNull();
            expect(label.textContent).toBe('Hi');
        });
    },
};
