/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Message, TalentService } from "../../types";
import { api } from "../api";


export const createTalentService = async (data: Omit<TalentService, "id"> ) => {
  const res = await api.post<TalentService>('/talents/services', data);
  return res.data;
}

export const sendProjectMessage = async ({ projectId, message }: { projectId: string, message: string }) => {
  const res = await api.post<Message>(`/talents/projects/${projectId}/messages`, { message });
  return res.data;
}

export const updateProjectInvoiceInfo = async ({ projectId, ...data}: {
  projectId: string;
  amount: string,
  requestId: string,
  dueDate: string,
}) => {
  const res = await api.put(`/talents/projects/${projectId}/invoice`, data);
  return res.data;
}
