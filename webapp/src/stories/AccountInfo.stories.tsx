import { AccountInfo } from "../components/AccountInfo";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const meta: Meta<typeof AccountInfo> = {
  component: AccountInfo,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ]
};

export default meta;

// Default

export const Default: StoryObj = {
  render: () => (
    <AccountInfo address="0xBCAD38E7e01ff8CBf315e3123eE34515B5cc1526" />
  ),
};

export const WithNetwork: StoryObj = {
  render: () => (
    <AccountInfo
      address="0xBCAD38E7e01ff8CBf315e3123eE34515B5cc1526"
      secondaryInfo="network"
      networkName="Mainnet"
      networkColor="#222380"
    />
  ),
};

export const WithBalance: StoryObj = {
  render: () => (
    <AccountInfo
      address="0xBCAD38E7e01ff8CBf315e3123eE34515B5cc1526"
      secondaryInfo="balance"
      balance={12000}
    />
  ),
};
