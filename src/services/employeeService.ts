import { useEmployeeStore } from "@/stores/useEmployeeStore";
import type { Employee } from "@/libs/types";

export class EmployeeService {
  static async getEmployees(): Promise<Employee[]> {
    const { fetchEmployees } = useEmployeeStore.getState();
    await fetchEmployees();
    return useEmployeeStore.getState().employees;
  }

  static async addEmployee(employee: Omit<Employee, "id">): Promise<void> {
    const { addEmployee } = useEmployeeStore.getState();
    await addEmployee(employee);
  }

  static async updateEmployee(
    id: string,
    employee: Partial<Employee>
  ): Promise<void> {
    const { updateEmployee } = useEmployeeStore.getState();
    await updateEmployee(id, employee);
  }

  static async deleteEmployee(id: string): Promise<void> {
    const { deleteEmployee } = useEmployeeStore.getState();
    await deleteEmployee(id);
  }

  static getEmployeesState() {
    return useEmployeeStore.getState().employees;
  }

  static getLoadingState() {
    return useEmployeeStore.getState().isLoading;
  }

  static getErrorState() {
    return useEmployeeStore.getState().error;
  }
}

export const useEmployeeService = () => {
  const { employees, isLoading, error } = useEmployeeStore();

  return {
    employees,
    isLoading,
    error,
    getEmployees: EmployeeService.getEmployees,
    addEmployee: EmployeeService.addEmployee,
    updateEmployee: EmployeeService.updateEmployee,
    deleteEmployee: EmployeeService.deleteEmployee,
  };
};
