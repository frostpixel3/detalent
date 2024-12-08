import { useQuery } from '@tanstack/react-query'
import React, { FC } from 'react'
import { getPublicTalentServices } from '../../../client/queries/public'
import { Link } from 'react-router-dom'
import { ServiceListingCard } from '../../../components/ServiceListingCard'
import { getCIDLink } from '../../../utils/web3Storage'

export interface TalentServicesSectionProps {

}

export const TalentServicesSection: FC<TalentServicesSectionProps> = (props) => {
  const { data: publicTalentServices } = useQuery({
    queryKey: ['publicTalentServices'],
    queryFn: getPublicTalentServices
  })
  if (!publicTalentServices) {
    return null
  }
  console.log(publicTalentServices);
  return (
    <div className="lg:mx-auto lg:max-w-7xllg:items-start lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
        Services
      </h2>
      <div className="grid grid-cols-4 space-x-2 mt-8">
          {publicTalentServices?.map((service) => (
            <ServiceListingCard
              serviceId={service.id}
              key={service.id}
              coverImageUrl={getCIDLink(service.coverImage)}
              name={service.name}
              talent={service.talent}
              showStartQuote
            />
          ))}
        </div>
    </div>
  )
}
