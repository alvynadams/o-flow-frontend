import { useLeaveStore } from "@/stores/useLeaveStore";
import type { LeaveRequest } from "@/libs/types";

export class LeaveService {
  static async getLeaveRequests(userId?: string): Promise<LeaveRequest[]> {
    const { fetchLeaveRequests } = useLeaveStore.getState();
    await fetchLeaveRequests(userId);
    return useLeaveStore.getState().leaveRequests;
  }

  static async createLeaveRequest(
    request: Omit<LeaveRequest, "id" | "createdAt" | "status">
  ): Promise<void> {
    const { createLeaveRequest } = useLeaveStore.getState();
    await createLeaveRequest(request);
  }

  static async updateLeaveStatus(
    id: string,
    status: "approved" | "rejected"
  ): Promise<void> {
    const { updateLeaveStatus } = useLeaveStore.getState();
    await updateLeaveStatus(id, status);
  }

  static getUserLeaveRequests(userId: string): LeaveRequest[] {
    const { getUserLeaveRequests } = useLeaveStore.getState();
    return getUserLeaveRequests(userId);
  }

  static getPendingLeaveRequests(): LeaveRequest[] {
    const { leaveRequests } = useLeaveStore.getState();
    return leaveRequests.filter((req) => req.status === "pending");
  }
}

export const useLeaveService = () => {
  const { leaveRequests, isLoading, error } = useLeaveStore();

  return {
    leaveRequests,
    isLoading,
    error,
    getLeaveRequests: LeaveService.getLeaveRequests,
    createLeaveRequest: LeaveService.createLeaveRequest,
    updateLeaveStatus: LeaveService.updateLeaveStatus,
    getUserLeaveRequests: LeaveService.getUserLeaveRequests,
    getPendingLeaveRequests: LeaveService.getPendingLeaveRequests,
  };
};
