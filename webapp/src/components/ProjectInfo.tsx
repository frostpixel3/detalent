/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { FC } from 'react'
import { TalentServiceProject } from '../types'
import { useCreatePaymentRequest } from '../hooks/useCreatePaymentRequest';
import { Form } from './Form';
import { useForm } from 'react-hook-form';
import { NumberFormInput } from './forms/inputs/NumberFormInput';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { useMutation } from '@tanstack/react-query';
import { updateProjectInvoiceInfo } from '../client/mutations/talents';
import { ProjectStatusLabel } from './forms/inputs/ProjectStatusLabel';
import { ERC20 } from '../consts/erc20';
import { usePayRequest } from '../hooks/usePayRequest';

export interface ProjectInfoProps {
  project?: TalentServiceProject;
  mode: 'CUSTOMER' | 'TALENT';
}

interface CreateInvoiceForm {
  amount: string;
}

const DEFAULT_INVOICE_DUE_DAYS = 7;

const _generateDefaultDueDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + DEFAULT_INVOICE_DUE_DAYS);
  return today.toISOString().split('T')[0];
}

export const ProjectInfo: FC<ProjectInfoProps> = ({ project, mode }) => {
  const createInvoiceForm = useForm<CreateInvoiceForm>();
  const { request } = useCreatePaymentRequest(); 
  const updateInvoiceInfoMutation = useMutation({
    mutationKey: ['updateInvoiceInfo'],
    mutationFn: updateProjectInvoiceInfo,
  })
  const payRequest = usePayRequest();
  const onSubmitCreateInvoiceForm = async (data: CreateInvoiceForm) => {
    const payeeAddress = project?.talentService.talent?.address;
    if (!payeeAddress) {
      toast.error('Talent address not found');
      return;
    }
    const payerAddress = project?.customer.address;
    if (!payerAddress) {
      toast.error('Customer address not found');
      return;
    }
    const dueDate = _generateDefaultDueDate();
    const req = await request({
      payeeAddress,
      payerAddress,
      amount: ethers.utils.parseUnits(data.amount, 'ether').toString(),
      reason: 'Invoice for ' + project?.name,
      dueDate,
    });
    await updateInvoiceInfoMutation.mutateAsync({
      projectId: project?.id,
      amount: data.amount,
      requestId: req.requestId,
      dueDate,
    });
  }

  const onPayInvoiceClick = async () => {
    if (!project?.invoiceRequestId) {
      toast.error('Invoice not generated yet');
      return;
    }
    await payRequest({
      requestId: project.invoiceRequestId,
    });
  }
 
  return (
    <div className="bg-white border-t">
      <div className="max-w-7xl pb-4 mx-auto sm:px-6 lg:px-8">
        <div className="px-4 pt-4 sm:px-0">
          Project Description:
          <p className="mt-1 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: project?.description || '' }}></p>
        </div>
        <div className="mt-4">
          Status: <ProjectStatusLabel status={project?.status as any} />
        </div>
        <div className="px-4 pt-4 sm:px-0">
          Invoice:
          <div>
            <div className="text-gray-400 text-sm">
              {project?.invoiceRequestId ? (
                <div>
                  <div>Amount: {project.invoiceAmount} {ERC20.symbol}</div>
                  <div>Due Date: {project.invoiceDueDate}</div>
                </div>
              ): (
                <div>
                  (Not Generated yet)
                </div>
              )}
            </div>
            {mode === 'TALENT' && (
              <div>
                <button className="btn mt-2" onClick={() => {
                  const modal = document.getElementById('generate_invoice_request');
                  if (modal) {
                    (modal as HTMLDialogElement).showModal();
                  }
                }}>
                  Generate Invoice
                </button>
                <dialog id="generate_invoice_request" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Generate Invoice</h3>
                    <Form form={createInvoiceForm} onSubmit={onSubmitCreateInvoiceForm}>
                      <NumberFormInput name="amount" label="Amount" />
                      <button className="btn btn-primary w-full" type="submit">Generate Invoice</button>
                    </Form>
                  </div>
                </dialog>
              </div>
            )}
            {mode === 'CUSTOMER' && (
              <button className="btn btn-primary mt-2" onClick={() => onPayInvoiceClick()}>
                Pay Invoice
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
