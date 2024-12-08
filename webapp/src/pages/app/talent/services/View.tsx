import { FC, useState } from 'react'
import { AppLayout } from '../../../../layouts/AppLayout'
import { RatingView } from '../../../../components/RatingView'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getServiceProjects, getTalentService } from '../../../../client/queries/talents';
import { getCIDLink } from '../../../../utils/web3Storage';
import { BriefcaseIcon, StarIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { ProjectsTable } from '../../../../components/ProjectsTable';

export interface AppTalentServicesViewPageProps {

}

export const AppTalentServicesViewPage: FC<AppTalentServicesViewPageProps> = (props) => {
  const rating = 0;
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['talentService', id],
    queryFn: () => getTalentService(id!),
    enabled: !!id,
  });
  const { data: projects } = useQuery({
    queryKey: ['talentProjects'],
    queryFn: () => getServiceProjects(id!),
    enabled: !!id,
  });
  const [tab, setTab] = useState<'PROJECTS' | 'REVIEWS'>('PROJECTS');
  return (
    <AppLayout noPadding>
      <div className="bg-base-100 group">
        <div className="w-full h-96 overflow-hidden">
          <div
            className="w-full h-96 bg-no-repeat bg-cover bg-center transition-all duration-500 ease-in-out transform overflow-hidden"
            style={{
              backgroundImage: data?.coverImage && `url(${getCIDLink(data.coverImage)})`,
            }}
          />
        </div>
        <div className="breadcrumbs text-sm my-1 mx-4 opacity-75">
          <ul>
            <li>
              <Link to="/app/talent/services">Your Services</Link>
            </li>
            <li>
              {data?.name}
            </li>
          </ul>
        </div>
        <div>
          <div className="p-4 pt-1">
            {rating ? (
              <RatingView rating={rating} />
            ) : (
              <div className="text-sm text-gray-400 flex">
                <RatingView rating={0} />
                <span className="ml-1">
                  (no reviews yet)
                </span>
              </div>
            )}
            <div className="font-medium mb-2 flex items-center mt-2">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-lg">
                {data?.name}
              </div>
            </div>
          </div>
          <ul className="ViewMenu menu lg:menu-horizontal w-full border border-t space-x-1">
            <li>
              <a className={classNames({ active: tab === 'PROJECTS' })} onClick={() => setTab('PROJECTS')}>
                <BriefcaseIcon className="h-5 w-5" />
                Projects
                <span className="badge badge-sm">{projects?.length}</span>
              </a>
            </li>
            <li>
              <a className={classNames({ active: tab === 'REVIEWS' })} onClick={() => setTab('REVIEWS')}>
                <StarIcon className="h-5 w-5" />
                Reviews
                <span className="badge badge-sm">0</span>
              </a>
            </li>
          </ul>

          <div>
            {tab === 'PROJECTS' && (
              projects?.length === 0 ? (
                <div>
                  <div className="p-24 text-center">
                    <div className="text-sm text-gray-400">
                      No projects yet
                    </div>
                  </div>
                </div>
              ) : (
                <ProjectsTable projects={projects || []} mode="TALENT" />
              )
            )}
            {tab === 'REVIEWS' && (
              <div className="p-24 text-center">
                <div className="text-sm text-gray-400">
                  Coming soon
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
