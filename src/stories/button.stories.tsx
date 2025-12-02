import { Button } from "@/components/ui/button";
import { type Meta, type StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Button> = {
  tags: ["autodocs"],
  component: Button,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
  },
};
