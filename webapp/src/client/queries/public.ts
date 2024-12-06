import { TalentService } from "../../types";
import { api } from "../api";


export const getPublicTalentServices = async () => {
  const res = await api.get<TalentService[]>('/public/services');
  return res.data;
}
