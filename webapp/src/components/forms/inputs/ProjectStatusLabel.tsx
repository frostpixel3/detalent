import { FC } from 'react'

enum ProjectStatus {
  QUOTING = 'QUOTING',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}
export interface ProjectStatusLabelProps {
  status: ProjectStatus
}

const LABELS = {
  [ProjectStatus.QUOTING]: { label: 'Quoting', className: 'badge-info' },
  [ProjectStatus.WAITING_PAYMENT]: { label: 'Waiting Payment', className: 'badge-warning' },
  [ProjectStatus.IN_PROGRESS]: { label: 'In Progress', className: 'badge-info' },
  [ProjectStatus.COMPLETED]: { label: 'Completed', className: 'badge-success' },
  [ProjectStatus.CANCELLED]: { label: 'Cancelled', className: 'badge-error' },
  'default': { label: 'Unknown', className: 'badge-gray' }
}

export const ProjectStatusLabel: FC<ProjectStatusLabelProps> = (props) => {
  return (
    <div className={`badge text-white ${LABELS[props.status ?? 'default'].className}`}>
      {LABELS[props.status ?? 'default'].label}
    </div>
  )
}
