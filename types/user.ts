export interface User {
  name: string;
  email: string;
}
export interface AuthResponse {
  email: string;
  name: string;
  token: string;
  refreshToken: string;
}
