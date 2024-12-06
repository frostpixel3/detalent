import { Message, StartQuoteFormValues, TalentService } from "../../types";
import { api } from "../api";


export const startQuote = async (data: StartQuoteFormValues ) => {
  const res = await api.post<TalentService>('/customers/quote', data);
  return res.data;
}

export const sendProjectMessage = async ({ projectId, message }: { projectId: string, message: string }) => {
  const res = await api.post<Message>(`/customers/projects/${projectId}/messages`, { message });
  return res.data;
}
