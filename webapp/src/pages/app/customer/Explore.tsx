import React, { FC } from 'react'
import { AppLayout } from '../../../layouts/AppLayout'
import { getPublicTalentServices } from '../../../client/queries/public'
import { useQuery } from '@tanstack/react-query'
import { getCIDLink } from '../../../utils/web3Storage'
import { ServiceListingCard } from '../../../components/ServiceListingCard'

export interface AppCustomerExploreProps {
  
}

export const AppCustomerExplore: FC<AppCustomerExploreProps> = (props) => {
  const { data: publicTalentServices } = useQuery({
    queryKey: ['publicTalentServices'],
    queryFn: getPublicTalentServices
  })
  if (!publicTalentServices) {
    return null
  }
  return (
    <AppLayout title="Explore Talents">
      <div className="grid grid-cols-4 gap-2 mt-8">
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
    </AppLayout>
  )
}
