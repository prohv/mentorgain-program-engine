import type { Program, PaginatedResponse } from '../types/program';

const API_URL = import.meta.env.VITE_API_URL;

export const programService = {
  async getAll(page: number = 1, limit: number = 6): Promise<PaginatedResponse<Program>> {
    const token = localStorage.getItem('mg_token');
    
    const response = await fetch(`${API_URL}/programs?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch programs');
    }
    
    return response.json();
  }
};
