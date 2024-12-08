import { FC } from 'react'
import { Link } from 'react-router-dom'
import { TalentServiceProject } from '../types'
import { ProjectStatusLabel } from './forms/inputs/ProjectStatusLabel';

export interface ProjectsTableProps {
  projects: TalentServiceProject[];
  mode: 'TALENT' | 'CUSTOMER';
}

export const ProjectsTable: FC<ProjectsTableProps> = ({ projects, mode }) => {
  const linkBasePath = mode === 'TALENT' ? '/app/talent' : '/app/customer';
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td><ProjectStatusLabel status={project.status as any} /></td>
              <td><Link className="btn btn-ghost btn-sm" to={`${linkBasePath}/projects/${project.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
