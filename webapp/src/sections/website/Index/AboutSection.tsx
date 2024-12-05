import { FC } from 'react'
import { AboutSection as AboutSectionComp } from '../../../components/website/AboutSection';

export interface AboutSectionProps {}

export const AboutSection: FC<AboutSectionProps> = () => {
  return (
    <AboutSectionComp
      imageSrc='https://place-hold.it/600x400/555'
      sections={
        [
          {
            title: "Revolutionizing Freelancing",
            content: (
              <p>
                DeTalent is an innovative decentralized platform that connects businesses and individuals seeking freelance talent with skilled freelancers in a seamless environment powered by Web3 technology.
              </p>
            )
          },
          {
            title: "Platform Benefits",
            content: (
              <p>
                DeTalent offers a secure, transparent, and efficient environment for financial transactions, removing traditional freelancing barriers and empowering users with financial autonomy.
              </p>
            )
          }
        ]
      }
    />
  )
}
