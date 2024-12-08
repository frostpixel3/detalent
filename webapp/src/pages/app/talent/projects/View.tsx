/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react'
import { AppLayout } from '../../../../layouts/AppLayout'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { sendProjectMessage } from '../../../../client/mutations/talents'
import { Chat } from '../../../../components/Chat'
import { ProjectInfo } from '../../../../components/ProjectInfo'
import { getTalentProject, getTalentProjectMessages } from '../../../../client/queries/talents'

export interface AppTalentProjectsViewProps {

}

export const AppTalentProjectsView: FC<AppTalentProjectsViewProps> = (props) => {
  const { id } = useParams();
  const { data: project } = useQuery({
    queryKey: ['talentProject', id],
    queryFn: () => getTalentProject(id!),
    enabled: !!id,
  });
  const { data: messages, refetch } = useQuery({
    queryKey: ['talentProjectMessages', id],
    queryFn: () => getTalentProjectMessages(id!),
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
      <ProjectInfo project={project} mode="TALENT" />
      <Chat onSendMessage={onSendMessage} messages={messages || []} sender="TALENT" />
    </AppLayout>
  )
}
