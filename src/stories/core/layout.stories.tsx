import type { Meta, StoryObj } from "@storybook/react-vite";
import Description from "../components/Description";
import * as motion from "motion/react-client";
import { useState } from "react";
import clsx from "clsx";

const meta: Meta = {
  tags: ["autodocs"],
  decorators: [
    (Story, { parameters }) => (
      <div className="flex flex-col h-screen w-screen items-center justify-center ">
        {parameters.description ? (
          <Description description={parameters.description} />
        ) : null}
        <div className="flex-1 flex items-center justify-center">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Switch: Story = {
  args: {
    visualDuraion: 0.2,
    bounce: 0.2,
  },
  render: (args) => {
    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => setIsOn(!isOn);
    return (
      <div
        onClick={toggleSwitch}
        className={clsx("w-20 h-10 flex border-2 rounded-full p-2", {
          "justify-end": isOn,
        })}
      >
        <motion.div
          className="bg-green-500 rounded-full w-6"
          layout
          transition={{
            type: "spring",
            visualDuration: args.visualDuraion,
            bounce: args.bounce,
          }}
        />
      </div>
    );
  },
};
