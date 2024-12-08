import React, { FC } from 'react'
import { ProjectsTable } from '../../../../components/ProjectsTable'
import { useQuery } from '@tanstack/react-query'
import { getCustomerProjects } from '../../../../client/queries/customer'
import { AppLayout } from '../../../../layouts/AppLayout'
import { Link } from 'react-router-dom';

export interface AppCustomerProjectsIndexProps {
  
}

export const AppCustomerProjectsIndex: FC<AppCustomerProjectsIndexProps> = (props) => {
  const { data: projects } = useQuery({
    queryKey: ['customerProjects'],
    queryFn: getCustomerProjects,
  })
  return (
    <AppLayout title="Projects">
      <div className="bg-white">
        {projects && projects.length > 0 ? (
          <ProjectsTable projects={projects || []} mode="CUSTOMER" />
        ) : (
          <div className="p-24 flex items-center justify-center opacity-70">
            <div>
              You have not contracted any service yet

              <div className="flex justify-center mt-4">
                <Link className="btn btn-outline btn-primary" to="/app/customer/explore">
                  Explore Talents
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
