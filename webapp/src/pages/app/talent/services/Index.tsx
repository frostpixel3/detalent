import { FC } from 'react'
import { AppLayout } from '../../../../layouts/AppLayout'
import { ServiceListingCard } from '../../../../components/ServiceListingCard'
import { PlusIcon } from '@heroicons/react/24/solid'

export const AppTalentServicesIndexPage: FC = () => {
  const toolbar = (
    <div>
      <button className="btn btn-primary">
        <PlusIcon className="h-5 w-5" />
        Create Service
      </button>
    </div>
  )
  return (
    <AppLayout title="Your Services" toolbar={toolbar}>
      <div>
        <div className="grid grid-cols-3">
            <div>
              <ServiceListingCard
                coverImageUrl='https://images.unsplash.com/photo-1719937051058-63705ed35502?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                name='Video Editing'
                owner={{
                  address: '0x1234',
                  name: 'John Doe',
                  avatarUrl: 'https://randomuser.me/api/port',
                  verified: true,
                }}
              />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
