export interface LoginResponse {
  id: number;
  employeeId?: number;
  token: string;
  type: string;
  username: string;
  email: string;
  roles: string[];
}
