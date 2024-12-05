/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react'
import { CreateServiceForm, CreateServiceFormValues } from '../../../../components/forms/CreateServiceForm'
import { useForm } from 'react-hook-form'
import { AppLayout } from '../../../../layouts/AppLayout';
import { useMutation } from '@tanstack/react-query';
import { createTalentService } from '../../../../client/mutations/talents';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface AppTalentServicesCreateProps {
  
}

export const AppTalentServicesCreate: FC<AppTalentServicesCreateProps> = (props) => {
  const navigate = useNavigate();
  const form = useForm<CreateServiceFormValues>();
  const createServiceMutation = useMutation({
    mutationKey: ['createService'],
    mutationFn: createTalentService,
  });
  const onSubmit = async (data: CreateServiceFormValues) => {
    try {
      const service = await createServiceMutation.mutateAsync(data);
      await navigate(`/app/talent/services/${service.id}`);
    } catch (error) {
      toast.error('Failed to create service');
    }
  }
  return (
    <AppLayout title="Create Service">
      <CreateServiceForm form={form} onSubmit={onSubmit} />
    </AppLayout>
  )
}
