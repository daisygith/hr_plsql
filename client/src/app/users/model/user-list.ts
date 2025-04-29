import { Role } from './role';

export interface UserList {
  id: number;
  email: string;
  username: string;
  roles: Role[];
}
