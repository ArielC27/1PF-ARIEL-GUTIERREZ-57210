export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  token: string;
}
