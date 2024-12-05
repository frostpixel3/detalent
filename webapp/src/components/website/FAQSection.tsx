import { FC } from 'react'

export interface FAQSectionProps {
  items: {
    question: string,
    answer: string,
  }[]
}

export const FAQSection: FC<FAQSectionProps> = (props) => {
  return (
    <div className="container mx-auto py-12">
      <div>
        <h1 className="text-4xl font-bold text-center mb-4">FAQ</h1>
      </div>
      {props.items.map((item, index) => (
        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="checkbox" name={`faq-${index}`} />
          <div className="collapse-title text-xl font-medium">
            {item.question}
          </div>
          <div className="collapse-content">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
