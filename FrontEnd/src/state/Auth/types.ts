export interface AuthState {
  isAuthenticated: boolean;
  user?: User | null;
  loading: boolean;
  error: string;
  activeItem: string;
  status: string;
}

export interface User {
  role: string;
  userId: string;
}
export interface RoleType {
  Admin: "admin";
  User: "user";
}
