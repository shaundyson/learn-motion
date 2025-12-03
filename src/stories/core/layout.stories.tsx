import type { Meta, StoryObj } from "@storybook/react-vite";
import Description from "../components/Description";
import * as motion from "motion/react-client";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const meta: Meta = {
  tags: ["autodocs"],
  decorators: [
    (Story, { parameters }) => (
      <div className="flex w-screen flex-col items-center justify-center gap-8">
        {parameters.description ? (
          <Description
            description={parameters.description}
            notes={parameters.notes}
          />
        ) : null}
        <div className="flex flex-1 items-center justify-center">
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
        className={cn("flex h-10 w-20 rounded-full border-2 p-2", {
          "justify-end": isOn,
        })}
      >
        <motion.div
          className="w-6 rounded-full bg-green-500"
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
      <div className="flex h-40 w-120 flex-col rounded border">
        <nav>
          <ul className="flex w-full">
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
                    "bg-primary text-primary-foreground": activeTab === tab,
                  },
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab ? (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 h-1 w-full bg-blue-400"
                  />
                ) : null}
              </motion.li>
            ))}
          </ul>
        </nav>
        <main className="flex flex-1 items-center justify-center font-bold">
          {activeTab}
        </main>
      </div>
    );
  },
  parameters: {
    description: "use layoutId to create shared layout animation.",
  },
};

function shuffle<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}
export const FlexRowWarp: Story = {
  args: {
    count: 16,
    useRandomSize: false,
  },
  render: (args, { parameters }) => {
    const [items, setItems] = useState<number[]>([]);

    const scales = useMemo(() => {
      return Array.from({ length: args.count }).map(() => {
        return {
          height: (Math.random() < 0.5 ? 1 : 2) * 30,
          width: (Math.random() < 0.5 ? 1 : 2) * 30,
        };
      });
    }, [args]);

    useEffect(() => {
      setItems(Array.from({ length: args.count }).map((_, i) => i + 1));
    }, [args.count]);
    useEffect(() => {
      const timeout = setTimeout(() => {
        setItems(shuffle([...items]));
      }, 1000);
      return () => clearTimeout(timeout);
    }, [items, setItems]);
    return (
      <div className={parameters.className}>
        {items.map((item) => (
          <motion.div
            key={item}
            className={cn(
              "size-12",
              "flex items-center justify-center",
              "rounded border bg-secondary font-bold",
            )}
            style={{
              ...(args.useRandomSize ? scales[item - 1] : undefined),
            }}
            layout
          >
            {item}
          </motion.div>
        ))}
      </div>
    );
  },
  parameters: {
    className: "flex w-70 flex-wrap items-center justify-center gap-2 p-2",
    description: "Try to toggle useRandomSize to see variable sizes.",
  },
};

export const FlexColumnWarp: Story = {
  args: {
    ...FlexRowWarp.args,
  },
  render: FlexRowWarp.render,
  parameters: {
    className:
      "flex h-70 flex-col flex-wrap items-center justify-center gap-2 p-2",
    description: "Try to toggle useRandomSize to see variable sizes.",
  },
};

export const GridLayout: Story = {
  args: {
    useLayoutInChildren: false,
  },
  render: (args) => {
    const [items, setItems] = useState(
      Array.from({ length: 15 }).map((_, i) => i + 1),
    );
    useEffect(() => {
      const timeout = setTimeout(() => {
        setItems(shuffle([...items]));
      }, 3000);
      return () => clearTimeout(timeout);
    }, [items, setItems]);
    return (
      <div className="grid grid-cols-5 gap-2">
        {items.map((item, i) => {
          return (
            <motion.div
              key={item}
              className={cn(
                "flex items-center justify-center",
                "rounded-md border font-bold",
                {
                  "col-span-2": item == 1 || item == 4,
                  "row-span-3": item == 1,
                  "col-span-3": item == 5,
                },
              )}
              animate={{
                backgroundColor:
                  i == 5 || i == 7 ? "var(--accent)" : "var(--primary)",
                color:
                  i == 5 || i == 7
                    ? "var(--accent-foreground)"
                    : "var(--primary-foreground)",
              }}
              layout
              transition={{
                duration: 2,
              }}
            >
              {args.useLayoutInChildren ? (
                <motion.div
                  layout
                  className="flex size-24 items-center justify-center"
                  transition={{
                    duration: 2,
                  }}
                >
                  {item + 1}
                </motion.div>
              ) : (
                <div className="flex size-24 items-center justify-center">
                  {item + 1}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  },
  parameters: {
    description: "Try to reshuffle the grid items every 3 seconds.",
    notes:
      "Try toggle useLayoutInChildren to see the difference when the child elements was scaling.",
  },
};
