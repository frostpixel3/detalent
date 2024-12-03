import { CurrencyIcon } from "../components/CurrencyIcon";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CurrencyIcon> = {
  component: CurrencyIcon,
};

export default meta;

// Default

export const USD: StoryObj = {
  render: () => (
    <CurrencyIcon symbol="USD" className="w-4 h-4" />
  ),
};

export const EUR: StoryObj = {
  render: () => (
    <CurrencyIcon symbol="EUR" className="w-4 h-4" />
  ),
};
