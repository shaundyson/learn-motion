import type { Meta, StoryObj } from "@storybook/react-vite";
import DefaultMeta from "./layout.stories";
import * as motion from "motion/react-client";
import { useRef } from "react";

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

export const PixelConstraint: Story = {
  args: {
    dragElastic: 0,
  },
  render: (args) => (
    <div className="h-[196px] w-[296px] border">
      <div className="relative top-[50px] left-[100px]">
        <motion.div
          className="size-24 rounded bg-green-500"
          drag
          dragMomentum={false}
          dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
          dragElastic={args.dragElastic}
        />
      </div>
    </div>
  ),
  parameters: {
    description: "dragConstraints . dragElastic.",
  },
};

export const RefConstraint: Story = {
  render: () => {
    const constraintRef = useRef(null);
    return (
      <div
        className="flex size-100 items-center justify-center border"
        ref={constraintRef}
      >
        <motion.div
          className="relative top-20 left-20 size-24 rounded bg-green-500"
          drag
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={constraintRef}
        />
      </div>
    );
  },
};
