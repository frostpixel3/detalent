import { ChevronRightIcon } from '@heroicons/react/24/solid'
import React, { FC } from 'react'

export interface HeroSectionProps {
  logoSrc?: string;
  badges?: React.ReactNode;
  event?: {
    name: string;
    url: string;
  },
  app?: {
    version: string;
    url: string;
  },
  title: string;
  subtitle: string;
  appScreenshotSrc: string;
  actions: React.ReactNode;
}

export const HeroSection: FC<HeroSectionProps> = ({
  badges,
  logoSrc,
  event,
  app,
  title,
  subtitle,
  appScreenshotSrc,
  actions,
}) => {
  return (
    <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
      <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div>
          <div>
            <img className="h-16 w-auto" src={logoSrc} />
          </div>
          <div className="mt-20">
            {badges && (
              <div className="mb-4 flex space-x-2">
                {badges}
              </div>
            )}
            <div>
              {event && (
                <a
                  href={event.url}
                  target="_blank"
                  className="inline-flex space-x-4"
                >
                  <span className="rounded bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
                    {event.name}
                  </span>
                </a>
              )}
              {app && (
                <a href={app.url} className="ml-2 inline-flex items-center space-x-1 text-sm font-medium text-primary">
                  {app.version && (
                    <span>{app.version}</span>
                  )}
                  <ChevronRightIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
            <div className="mt-6 sm:max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {title}
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                {subtitle}
              </p>
            </div>
            <div className="mt-8">
              {actions}
            </div>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
        <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="hidden sm:block">
            <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
            <svg
              className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="837c3e70-6c3a-44e6-8854-cc48c737b659"
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
                fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
              />
            </svg>
          </div>
          <div className="relative -mr-40 pl-6 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
            <img
              className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
              src={appScreenshotSrc}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
