/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react'
import { AppLayout } from '../../../../layouts/AppLayout'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getCustomerProject, getCustomerProjectMessages } from '../../../../client/queries/customer'
import { sendProjectMessage } from '../../../../client/mutations/customers'
import { Chat } from '../../../../components/Chat'
import { ProjectInfo } from '../../../../components/ProjectInfo'

export interface AppCustomerProjectsViewProps {

}

export const AppCustomerProjectsView: FC<AppCustomerProjectsViewProps> = (props) => {
  const { id } = useParams();
  const { data: project } = useQuery({
    queryKey: ['customerProject', id],
    queryFn: () => getCustomerProject(id!),
    enabled: !!id,
    refetchInterval: 1000,
  });
  const { data: messages, refetch } = useQuery({
    queryKey: ['customerProjectMessages', id],
    queryFn: () => getCustomerProjectMessages(id!),
    enabled: !!id,
    refetchInterval: 1000,
  });
  const sendMessageMutation = useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: sendProjectMessage,
  });
  const onSendMessage = async (data: { message: string }) => {
    await sendMessageMutation.mutateAsync({ projectId: id!, message: data.message });
    await refetch();
  }
  return (
    <AppLayout title={project?.name} noPadding noMainScroll>
      <ProjectInfo project={project} mode="CUSTOMER" />
      <Chat onSendMessage={onSendMessage} messages={messages || []} sender="CUSTOMER" />
    </AppLayout>
  )
}
