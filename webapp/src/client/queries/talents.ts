import { TalentService } from "../../types";
import { api } from "../api";

export const getTalentServices = async () => {
  const res = await api.get<TalentService[]>('/talents/services');
  return res.data;
}

export const getTalentService = async (id: string) => {
  const res = await api.get<TalentService>(`/talents/services/${id}`);
  return res.data;
}
