import { FC } from 'react'
import { WebsiteLayout } from '../layouts/WebsiteLayout'
import { HeroSection } from '../sections/website/Index/HeroSection'
import { AboutSection } from '../sections/website/Index/AboutSection'
import { FAQSection } from '../sections/website/Index/FAQSection'
import { FooterSection } from '../sections/website/Index/FooterSection'

export const IndexPage: FC = () => {
  return (
    <WebsiteLayout>
      <HeroSection />
      <AboutSection />
      <FAQSection />
      <FooterSection />
    </WebsiteLayout>
  )
}
