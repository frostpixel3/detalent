import React, { FC } from 'react'

export interface AboutSectionProps {
  imageSrc: string;
  sections: {
    title: string;
    content: React.ReactNode;
  }[];
}

export const AboutSection: FC<AboutSectionProps> = ({ imageSrc, sections }) => {
  return (
    <div className="relative mt-20">
      <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
        <div className="relative sm:py-16 lg:py-0">
          <div
            aria-hidden="true"
            className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
          >
            <div className="absolute inset-y-0 right-1/2 w-full rounded-r-3xl bg-gray-50 lg:right-72" />
            <svg
              className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={392}
                fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
              />
            </svg>
          </div>
          <div className="relative mx-auto max-w-md px-6 sm:max-w-4xl lg:max-w-none lg:px-0 lg:py-20 w-full">
            <div className=" rounded-2xl w-full bg-primary/20 p-6 mt-48">
              <img
                className=""
                src={imageSrc}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:px-0">
          {sections.map((section, index) => (
            <div className="pt-12 sm:pt-16 lg:pt-20" key={index}>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {section.title}
              </h2>
              <div className="mt-6 space-y-6 text-gray-500">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
