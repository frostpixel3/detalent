import { FC } from 'react'
import { HeroSection as HeroSectionComp } from '../../../components/website/HeroSection';
import { Link } from 'react-router-dom';

export interface HeroSectionProps { }

export const HeroSection: FC<HeroSectionProps> = () => {
  return (
    <HeroSectionComp
      logoSrc="https://place-hold.it/80x64/555"
      badges={(
        <>
          <img src="https://img.shields.io/github/commit-activity/t/frostpixel3/detalent" alt="github commits" />
          <img src="https://img.shields.io/github/created-at/frostpixel3/detalent" alt="github commits" />
        </>
      )}
      event={{
        name: "End-of-Year Hackathon with Request Network", 
        url: "https://dorahacks.io/hackathon/request-network-end-of-year/detail",
      }}
      app={{
        version: "v1.0.0",
        url: "/app",
      }}
      title="DeTalent - Empowering Freelancers with Web3"
      subtitle="A decentralized freelancing platform built on the Request Network"
      appScreenshotSrc="https://place-hold.it/600x400/555"
      actions={(
        <>
          <div className="mt-6">
            <Link
              to="/app"
              className="btn btn-primary text-white"
            >
              Get Started
            </Link>
          </div>
        </>
      )}
    />
  )
}
