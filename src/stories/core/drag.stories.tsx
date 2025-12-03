import type { Meta, StoryObj } from "@storybook/react-vite";
import DefaultMeta from "./layout.stories";
import * as motion from "motion/react-client";

const meta: Meta = {
  tags: ["autodocs"],
  decorators: DefaultMeta.decorators,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    dragMomentum: true,
  },
  render: (args) => (
    <motion.div
      className="size-24 rounded bg-green-500"
      drag
      dragMomentum={args.dragMomentum}
    />
  ),
  parameters: {
    description:
      "This is a basic example of a draggable element using the drag property from the Motion library. You can click and drag the green square around the screen. The `dragMomentum` property allows the element to continue moving briefly after you release it, simulating momentum.",
    notes: "dragMomentum: try to active and check the difference.",
  },
};
