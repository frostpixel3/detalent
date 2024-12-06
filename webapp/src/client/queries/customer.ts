import { Message, TalentServiceProject } from "../../types";
import { api } from "../api";

export const getCustomerProjects = async () => {
  const res = await api.get<TalentServiceProject[]>('/customers/projects');
  return res.data;
}

export const getCustomerProject = async (id: string) => {
  const res = await api.get<TalentServiceProject>(`/customers/projects/${id}`);
  return res.data;
}

export const getCustomerProjectMessages = async (id: string) => {
  const res = await api.get<Message[]>(`/customers/projects/${id}/messages`);
  return res.data;
}
