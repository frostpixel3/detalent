import { FC } from 'react'
import { FAQSection as FAQSectionComp } from '../../../components/website/FAQSection';

export interface FAQSectionProps {}

export const FAQSection: FC<FAQSectionProps> = (props) => {
  return (
    <FAQSectionComp
      items={[
        {
          question: "What is deTalent?",
          answer: "deTalent is a decentralized freelancing platform that leverages blockchain technology to facilitate direct, peer-to-peer interactions between freelancers and clients."
        },
        {
          question: "How does the rating system work?",
          answer: "Both freelancers and clients can rate each other after project completion, helping future users make informed decisions and ensuring accountability on the platform."
        },
        {
          question: "What is the Request Network?",
          answer: "The Request Network is an EVM-compatible infrastructure protocol designed for various Web3 financial applications, providing enhanced security and traceability for blockchain transactions."
        },
      ]}
    />
  )
}
