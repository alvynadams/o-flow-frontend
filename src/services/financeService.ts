import { useFinanceStore } from "@/stores/useFinanceStore";
import type { PettyCashRequest, CashAdvanceRequest } from "@/libs/types";

export class FinanceService {
  static async getPettyCashRequests(
    userId?: string
  ): Promise<PettyCashRequest[]> {
    const { fetchPettyCashRequests } = useFinanceStore.getState();
    await fetchPettyCashRequests(userId);
    return useFinanceStore.getState().pettyCashRequests;
  }

  static async getCashAdvanceRequests(
    userId?: string
  ): Promise<CashAdvanceRequest[]> {
    const { fetchCashAdvanceRequests } = useFinanceStore.getState();
    await fetchCashAdvanceRequests(userId);
    return useFinanceStore.getState().cashAdvanceRequests;
  }

  static async createPettyCashRequest(
    request: Omit<PettyCashRequest, "id" | "createdAt" | "status">
  ): Promise<void> {
    const { createPettyCashRequest } = useFinanceStore.getState();
    await createPettyCashRequest(request);
  }

  static async createCashAdvanceRequest(
    request: Omit<CashAdvanceRequest, "id" | "createdAt" | "status">
  ): Promise<void> {
    const { createCashAdvanceRequest } = useFinanceStore.getState();
    await createCashAdvanceRequest(request);
  }

  static async updatePettyCashStatus(
    id: string,
    status: "approved" | "rejected"
  ): Promise<void> {
    const { updatePettyCashStatus } = useFinanceStore.getState();
    await updatePettyCashStatus(id, status);
  }

  static async updateCashAdvanceStatus(
    id: string,
    status: "approved" | "rejected"
  ): Promise<void> {
    const { updateCashAdvanceStatus } = useFinanceStore.getState();
    await updateCashAdvanceStatus(id, status);
  }

  static getTotalCashRequests(): number {
    const { pettyCashRequests, cashAdvanceRequests } =
      useFinanceStore.getState();
    return [...pettyCashRequests, ...cashAdvanceRequests].reduce(
      (sum, req) => sum + req.amount,
      0
    );
  }

  static getUserPettyCashRequests(userId: string): PettyCashRequest[] {
    const { getUserPettyCashRequests } = useFinanceStore.getState();
    return getUserPettyCashRequests(userId);
  }

  static getUserCashAdvanceRequests(userId: string): CashAdvanceRequest[] {
    const { getUserCashAdvanceRequests } = useFinanceStore.getState();
    return getUserCashAdvanceRequests(userId);
  }
}

export const useFinanceService = () => {
  const { pettyCashRequests, cashAdvanceRequests, isLoading, error } =
    useFinanceStore();

  return {
    pettyCashRequests,
    cashAdvanceRequests,
    isLoading,
    error,
    getPettyCashRequests: FinanceService.getPettyCashRequests,
    getCashAdvanceRequests: FinanceService.getCashAdvanceRequests,
    createPettyCashRequest: FinanceService.createPettyCashRequest,
    createCashAdvanceRequest: FinanceService.createCashAdvanceRequest,
    updatePettyCashStatus: FinanceService.updatePettyCashStatus,
    updateCashAdvanceStatus: FinanceService.updateCashAdvanceStatus,
    getTotalCashRequests: FinanceService.getTotalCashRequests,
    getUserPettyCashRequests: FinanceService.getUserPettyCashRequests,
    getUserCashAdvanceRequests: FinanceService.getUserCashAdvanceRequests,
  };
};
