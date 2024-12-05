import { FC } from 'react'
import { AppLayout } from '../../../../layouts/AppLayout'
import { ServiceListingCard } from '../../../../components/ServiceListingCard'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { getTalentServices } from '../../../../client/queries/talents'
import { getCIDLink } from '../../../../utils/web3Storage'
import { Link } from 'react-router-dom'

export const AppTalentServicesIndexPage: FC = () => {
  const toolbar = (
    <div>
      <Link className="btn btn-primary" to="/app/talent/services/create">
        <PlusIcon className="h-5 w-5" />
        Create Service
      </Link>
    </div>
  );
  const { data: talentServices } = useQuery({
    queryKey: ['talentServices'],
    queryFn: getTalentServices,
  });
  return (
    <AppLayout title="Your Services" toolbar={toolbar}>
      <div>
        <div className="grid grid-cols-3 space-x-2">
          {talentServices?.map((service) => (
            <Link to={`/app/talent/services/${service.id}`} key={service.id}>
              <ServiceListingCard
                key={service.id}
                coverImageUrl={getCIDLink(service.coverImage)}
                name={service.name}
                talent={service.talent}
              />
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
