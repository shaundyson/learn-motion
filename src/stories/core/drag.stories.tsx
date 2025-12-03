import type { Meta, StoryObj } from "@storybook/react-vite";
import DefaultMeta from "./layout.stories";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { GripVerticalIcon } from "lucide-react";
import { motion, useDragControls } from "motion/react";
import { cn } from "@/lib/utils";

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
    notes:
      "dragMomentum: try to active and check the difference. dragTransition is not used in this example.",
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

export const AxisLock: Story = {
  args: { axis: "x" },
  argTypes: {
    axis: {
      control: { type: "select" },
      options: ["x", "y"],
    },
  },
  render: (args) => (
    <motion.div
      className="size-24 rounded bg-green-500"
      drag={args.axis}
      dragMomentum={false}
    />
  ),
  parameters: {
    description:
      "This example demonstrates axis locking using the `drag` property set to `'x'`. The green square can only be dragged horizontally along the x-axis. Vertical movement is restricted, allowing for precise horizontal positioning.",
    notes: "Try changing `drag` to 'y' to lock movement to the vertical axis.",
  },
};

export const SnapToOrigin: Story = {
  render: () => (
    <motion.div
      className="size-24 rounded bg-green-500"
      drag
      dragMomentum={false}
      dragSnapToOrigin
      dragDirectionLock
    />
  ),
  parameters: {
    description: "Snap to origin + Direction Lock",
    notes:
      "In this example, the green square is draggable but will snap back to its original position when released, thanks to the `dragSnapToOrigin` property. This behavior is useful for creating interactive elements that return to a default state after user interaction.",
  },
};

export const DragHandle: Story = {
  args: {
    snapToCursor: false,
  },
  render: (args) => {
    const dragControls = useDragControls();
    const [isDragging, setIsDragging] = useState(false);
    return (
      <motion.div
        drag
        dragMomentum={false}
        dragListener={false}
        dragControls={dragControls}
        onDragStart={() => {
          setIsDragging(true);
        }}
        onDragEnd={() => {
          setIsDragging(false);
        }}
      >
        <Button
          className={cn("pr-2 transition-none", {
            "cursor-grabbing": isDragging,
          })}
        >
          <div className="flex items-center justify-between gap-4">
            <span>Button</span>
            <div
              className={cn({ "hover:cursor-grab": !isDragging })}
              onPointerDown={(event) => {
                setIsDragging(true);
                dragControls.start(event, { snapToCursor: args.snapToCursor });
              }}
            >
              <GripVerticalIcon />
            </div>
          </div>
        </Button>
      </motion.div>
    );
  },
};
