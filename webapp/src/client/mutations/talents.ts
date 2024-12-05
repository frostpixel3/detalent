import { TalentService } from "../../types";
import { api } from "../api";


export const createTalentService = async (data: Omit<TalentService, "id"> ) => {
  const res = await api.post<TalentService>('/talents/services', data);
  return res.data;
}
