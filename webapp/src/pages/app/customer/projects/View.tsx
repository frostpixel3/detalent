/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { FC } from 'react'
import { AppLayout } from '../../../../layouts/AppLayout'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getCustomerProject, getCustomerProjectMessages } from '../../../../client/queries/customer'
import { AccountInfo } from '../../../../components/AccountInfo'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import { RichTextFormInput } from '../../../../components/forms/inputs/RichTextFormInput'
import { useForm } from 'react-hook-form'
import { Form } from '../../../../components/Form'
import { sendProjectMessage } from '../../../../client/mutations/customers'
import classNames from 'classnames'
import { Chat } from '../../../../components/Chat'

export interface AppCustomerProjectsViewProps {

}

export const AppCustomerProjectsView: FC<AppCustomerProjectsViewProps> = (props) => {
  const { id } = useParams();
  const { data: project } = useQuery({
    queryKey: ['customerProject', id],
    queryFn: () => getCustomerProject(id!),
    enabled: !!id,
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
    <AppLayout title={project?.name} noPadding>
      <div className="bg-white border-t">
        <div className="max-w-7xl pb-4 mx-auto sm:px-6 lg:px-8">
          <div className="px-4 pt-4 sm:px-0">
            Project Description:
            <p className="mt-1 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: project?.description || '' }}></p>
          </div>
          <div className="px-4 pt-4 sm:px-0">
            Invoice:
            <div>
              <div className="text-gray-400 text-sm">
                (Not Generated yet)
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chat onSendMessage={onSendMessage} messages={messages || []} sender="CUSTOMER" />
    </AppLayout>
  )
}
