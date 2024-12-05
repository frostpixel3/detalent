export interface User {
  id: string;
  address: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface TalentService {
  id: string;
  name: string;
  coverImage: string;
  description: string;
  talent?: User;
}
