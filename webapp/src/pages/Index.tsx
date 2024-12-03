import { FC } from 'react'
import { WebsiteLayout } from '../layouts/WebsiteLayout'
import { WalletAuthButton } from '../components/WalletAuthButton'

export const IndexPage: FC = () => {
  return (
    <WebsiteLayout>
      <WalletAuthButton />
    </WebsiteLayout>
  )
}
