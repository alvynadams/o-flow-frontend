import type { User } from "@/libs/types";

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!email || !password) throw new Error("Invalid credentials");
    if (email === "admin@oflow.com") {
      return {
        id: "1",
        name: "John Admin",
        email: "admin@oflow.com",
        role: "admin",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      };
    } else if (email === "employee@oflow.com") {
      return {
        id: "2",
        name: "Jane Employee",
        email: "employee@oflow.com",
        role: "employee",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b75a?w=150&h=150&fit=crop&crop=face",
      };
    } else {
      throw new Error("Invalid credentials");
    }
  },

  loginWithBiometrics: async (bioToken: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!bioToken) throw new Error("Invalid biometrics token");
    //   return {
    //     id: "1",
    //     name: "John Admin",
    //     email: "admin@oflow.com",
    //     role: "admin",
    //     avatar:
    //       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    //   };
    return {
      id: "2",
      name: "Jane Employee",
      email: "employee@oflow.com",
      role: "employee",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b75a?w=150&h=150&fit=crop&crop=face",
    };
  },

  verify2FA: async (code: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (code !== "123456") throw new Error("Invalid code");
    return {
      id: "1",
      name: "John Admin",
      email: "admin@oflow.com",
      role: "admin",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    };
  },
};
