import type { Meta, StoryObj } from '@storybook/react';

import { AmountInfo } from '../components/AmountInfo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const meta: Meta<typeof AmountInfo> = {
  component: AmountInfo,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ]
};

export default meta;

export const Basic: StoryObj = {
  render: () => <AmountInfo symbol="USD" amount={999999} />,
};

export const WithEstimation: StoryObj = {
  render: () => <AmountInfo symbol="EUR" amount={999999} estimate />,
};
