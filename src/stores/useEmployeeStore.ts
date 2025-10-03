import { create } from "zustand";
import type { Employee } from "@/libs/types";

interface EmployeeStore {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  addEmployee: (employee: Omit<Employee, "id">) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b75a?w=40&h=40&fit=crop&crop=face",
    status: "Active",
    joinDate: "2022-03-15",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    department: "IT",
    position: "Senior Developer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    status: "Active",
    joinDate: "2021-08-22",
  },
  {
    id: "3",
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@company.com",
    department: "HR",
    position: "HR Specialist",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    status: "Active",
    joinDate: "2023-01-10",
  },
];

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  isLoading: false,
  error: null,

  fetchEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ employees: mockEmployees, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addEmployee: async (employee) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newEmployee = { ...employee, id: Date.now().toString() };
      set((state) => ({
        employees: [...state.employees, newEmployee],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateEmployee: async (id, employee) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      set((state) => ({
        employees: state.employees.map((emp) =>
          emp.id === id ? { ...emp, ...employee } : emp
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteEmployee: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      set((state) => ({
        employees: state.employees.filter((emp) => emp.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
