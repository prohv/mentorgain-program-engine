export interface Program {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  maxParticipants: number;
  price: number;
  formSchema: JSON; 
  startDate: string;
  endDate: string;
  createdAt: string;
  _count?: {
    enrollments: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}