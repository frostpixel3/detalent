import { FC } from 'react'
import { WebsiteLayout } from '../layouts/WebsiteLayout'
import { HeroSection } from '../sections/website/Index/HeroSection'
import { AboutSection } from '../sections/website/Index/AboutSection'
import { FAQSection } from '../sections/website/Index/FAQSection'
import { FooterSection } from '../sections/website/Index/FooterSection'
import { TalentServicesSection } from '../sections/website/Index/TalentServicesSection'
import { CreateRequestButton } from '../components/CreateRequestButton'
import { WalletAuthButton } from '../components/WalletAuthButton'

export const IndexPage: FC = () => {
  return (
    <WebsiteLayout>
      <WalletAuthButton />
      <CreateRequestButton />
      <HeroSection />
      <TalentServicesSection />
      <AboutSection />
      <FAQSection />
      <FooterSection />
    </WebsiteLayout>
  )
}
