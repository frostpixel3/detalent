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

export interface StartQuoteFormValues {
  name: string;
  description: string;
  serviceId: string;
}

export interface TalentServiceProject {
  id: string;
  name: string;
  description: string;
  status: string;
  talentServiceId: string;
  customerId: string;
  talentService: TalentService;
}

export interface Message {
  id: string;
  message: string;
  sender: 'CUSTOMER' | 'TALENT';
  createdAt: string;
}
