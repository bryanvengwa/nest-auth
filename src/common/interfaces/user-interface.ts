
export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  phone?: number; 
  refreshToken?: string;
}