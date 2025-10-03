import { useUserStore } from "@/stores/useUserStore";
import type { User } from "@/libs/types";

export class UserService {
  static getCurrentUser(): User | null {
    return useUserStore.getState().user;
  }

  static setUser(user: User | null): void {
    const { setUser } = useUserStore.getState();
    setUser(user);
  }

  static setLoading(loading: boolean): void {
    const { setIsLoading } = useUserStore.getState();
    setIsLoading(loading);
  }

  static logout(): void {
    const { logout } = useUserStore.getState();
    logout();
  }

  static isAdmin(): boolean {
    const user = useUserStore.getState().user;
    return user?.role === "admin";
  }

  static isEmployee(): boolean {
    const user = useUserStore.getState().user;
    return user?.role === "employee";
  }
}

export const useUserService = () => {
  const { user, isLoading } = useUserStore();

  return {
    user,
    isLoading,
    setUser: UserService.setUser,
    setLoading: UserService.setLoading,
    logout: UserService.logout,
    isAdmin: UserService.isAdmin,
    isEmployee: UserService.isEmployee,
  };
};
