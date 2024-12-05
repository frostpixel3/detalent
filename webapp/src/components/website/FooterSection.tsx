import React, { FC } from 'react'

export interface FooterSectionProps {
  projectName: string;
  mainLinks?: {
    name: string;
    href: string;
  }[];
  socialLinks?: {
    name: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

export const FooterSection: FC<FooterSectionProps> = ({
  projectName,
  mainLinks = [],
  socialLinks = [],
}) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-gray-900 sm:mt-12">
      <div className="mx-auto max-w-md overflow-hidden py-12 px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {mainLinks.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                className="text-base text-gray-400 hover:text-gray-300"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-300"
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {currentYear} {projectName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
