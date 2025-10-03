import { create } from "zustand"
import type { PettyCashRequest, CashAdvanceRequest } from "@/libs/types"

interface FinanceStore {
  pettyCashRequests: PettyCashRequest[]
  cashAdvanceRequests: CashAdvanceRequest[]
  isLoading: boolean
  error: string | null
  fetchPettyCashRequests: (userId?: string) => Promise<void>
  fetchCashAdvanceRequests: (userId?: string) => Promise<void>
  createPettyCashRequest: (request: Omit<PettyCashRequest, "id" | "createdAt" | "status">) => Promise<void>
  createCashAdvanceRequest: (request: Omit<CashAdvanceRequest, "id" | "createdAt" | "status">) => Promise<void>
  updatePettyCashStatus: (id: string, status: "approved" | "rejected", rejectionComment?: string) => Promise<void>
  updateCashAdvanceStatus: (id: string, status: "approved" | "rejected", rejectionComment?: string) => Promise<void>
  getUserPettyCashRequests: (userId: string) => PettyCashRequest[]
  getUserCashAdvanceRequests: (userId: string) => CashAdvanceRequest[]
}

const mockPettyCashRequests: PettyCashRequest[] = [
  {
    id: "1",
    userId: "1",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b75a?w=40&h=40&fit=crop&crop=face",
    amount: 145.5,
    category: "office-supplies",
    description: "Office supplies for team",
    status: "pending",
    createdAt: "2024-01-15",
    department: "Marketing",
  },
  {
    id: "2",
    userId: "2",
    userName: "Mike Chen",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    amount: 89.99,
    category: "software",
    description: "Development tools subscription",
    status: "approved",
    createdAt: "2024-01-12",
    department: "IT",
  },
]

const mockCashAdvanceRequests: CashAdvanceRequest[] = [
  {
    id: "1",
    userId: "2",
    userName: "Mike Chen",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    amount: 2500.0,
    purpose: "Equipment purchase",
    expectedReturn: "2024-03-01",
    justification: "Need to purchase new laptop for development work",
    status: "approved",
    createdAt: "2024-01-10",
    department: "IT",
  },
  {
    id: "2",
    userId: "3",
    userName: "Lisa Rodriguez",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    amount: 1000.0,
    purpose: "Conference attendance",
    expectedReturn: "2024-02-15",
    justification: "Attending HR conference in Dublin",
    status: "pending",
    createdAt: "2024-01-13",
    department: "HR",
  },
]

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  pettyCashRequests: [],
  cashAdvanceRequests: [],
  isLoading: false,
  error: null,

  fetchPettyCashRequests: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      let requests = mockPettyCashRequests
      if (userId) {
        requests = mockPettyCashRequests.filter((req) => req.userId === userId)
      }
      set({ pettyCashRequests: requests, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  fetchCashAdvanceRequests: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      let requests = mockCashAdvanceRequests
      if (userId) {
        requests = mockCashAdvanceRequests.filter((req) => req.userId === userId)
      }
      set({ cashAdvanceRequests: requests, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  createPettyCashRequest: async (request) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newRequest: PettyCashRequest = {
        ...request,
        id: Date.now().toString(),
        status: "pending",
        createdAt: new Date().toISOString(),
      }
      set((state) => ({
        pettyCashRequests: [...state.pettyCashRequests, newRequest],
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  createCashAdvanceRequest: async (request) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newRequest: CashAdvanceRequest = {
        ...request,
        id: Date.now().toString(),
        status: "pending",
        createdAt: new Date().toISOString(),
      }
      set((state) => ({
        cashAdvanceRequests: [...state.cashAdvanceRequests, newRequest],
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  updatePettyCashStatus: async (id, status, rejectionComment) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      set((state) => ({
        pettyCashRequests: state.pettyCashRequests.map((req) =>
          req.id === id ? { ...req, status, rejectionComment } : req,
        ),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  updateCashAdvanceStatus: async (id, status, rejectionComment) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      set((state) => ({
        cashAdvanceRequests: state.cashAdvanceRequests.map((req) =>
          req.id === id ? { ...req, status, rejectionComment } : req,
        ),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  getUserPettyCashRequests: (userId) => {
    return get().pettyCashRequests.filter((req) => req.userId === userId)
  },

  getUserCashAdvanceRequests: (userId) => {
    return get().cashAdvanceRequests.filter((req) => req.userId === userId)
  },
}))
