export interface UserType {
  _id: string;
  username: string;
  email: string;
}
export interface AuthContextType {
  authtoken: string | null;
  success: boolean;
  message?: string;
  user: UserType;
  sendOTP: (email: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  getUser: () => Promise<void>;
}
