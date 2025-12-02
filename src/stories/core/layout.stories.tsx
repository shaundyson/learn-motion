import type { Meta, StoryObj } from "@storybook/react-vite";
import Description from "../components/Description";
import * as motion from "motion/react-client";
import { useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

const meta: Meta = {
  tags: ["autodocs"],
  decorators: [
    (Story, { parameters }) => (
      <div className="flex flex-col w-screen items-center justify-center ">
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
        className={cn("w-20 h-10 flex border-2 rounded-full p-2", {
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

export const Tabs: Story = {
  args: {
    tabs: ["TAB 1", "TAB 2", "TAB 3"],
  },
  render: (args) => {
    const tabs: string[] = args.tabs || [];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    return (
      <div className="flex flex-col w-120 rounded h-40 border">
        <nav>
          <ul className="w-full flex">
            {tabs.map((tab) => (
              <motion.li
                key={tab}
                className={cn(
                  "flex-1",
                  "text-center",
                  "rounded-t",
                  "relative",
                  "border-b-2 border-b-border",
                  "bg-secondary text-secondary-foreground",
                  {
                    "bg-primary text-primary-foreground ": activeTab === tab,
                  }
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab ? (
                  <motion.div
                    layoutId="underline"
                    className="h-1 w-full bg-blue-400 absolute -bottom-1"
                  />
                ) : null}
              </motion.li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 flex items-center justify-center font-bold">
          {activeTab}
        </main>
      </div>
    );
  },
};
