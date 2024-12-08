import { Message, TalentService, TalentServiceProject } from "../../types";
import { api } from "../api";

export const getTalentServices = async () => {
  const res = await api.get<TalentService[]>('/talents/services');
  return res.data;
}

export const getTalentService = async (id: string) => {
  const res = await api.get<TalentService>(`/talents/services/${id}`);
  return res.data;
}


export const getTalentProject = async (id: string) => {
  const res = await api.get<TalentServiceProject>(`/talents/projects/${id}`);
  return res.data;
}

export const getTalentProjectMessages = async (id: string) => {
  const res = await api.get<Message[]>(`/talents/projects/${id}/messages`);
  return res.data;
}

export const getServiceProjects = async (id: string) => {
  const res = await api.get<TalentServiceProject[]>(`/talents/services/${id}/projects`);
  return res.data;
}
