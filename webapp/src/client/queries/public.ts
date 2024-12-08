import { TalentService, User } from "../../types";
import { api } from "../api";


export const getPublicTalentServices = async () => {
  const res = await api.get<TalentService[]>('/public/services');
  return res.data;
}

export const getMe = async () => {
  const res = await api.get<User>('/public/me');
  return res.data;
}
