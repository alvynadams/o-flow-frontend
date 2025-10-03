import { AuthContext } from "@/libs/hooks";
import type { User, AuthType } from "@/libs/types";
import { authService } from "@/services/authService";
import { useUserStore } from "@/stores/useUserStore";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, logout, isLoading, setIsLoading } = useUserStore();

  const login = async (auth: AuthType) => {
    try {
      setIsLoading(true);

      let loggedInUser: User;

      switch (auth.method) {
        case "password":
          loggedInUser = await authService.login(auth.email, auth.password);
          break;
        case "biometrics":
          loggedInUser = await authService.loginWithBiometrics(auth.bioToken);
          break;
        case "2fa":
          loggedInUser = await authService.verify2FA(auth.code);
          break;
        default:
          throw new Error("Invalid login method");
      }
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
