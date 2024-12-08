import { AmountInput } from "../components/AmountInput";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
const queryClient = new QueryClient();

const meta: Meta<typeof AmountInput> = {
  component: AmountInput,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
};

export default meta;

// Default

export const Default: StoryObj = {
  render: () => {
    const [value, setValue] = useState(0);
    return <AmountInput symbol="USD" value={value} onChange={setValue} />;
  },
};

// WithEstimation

export const WithEstimation: StoryObj = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <AmountInput
        symbol="USD"
        value={value}
        onChange={setValue}
        estimate
        estimatedFiatSymbol="EUR"
      />
    );
  },
};
