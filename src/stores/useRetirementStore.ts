import { create } from "zustand"
import type { RetirementRequest } from "@/libs/types"

interface RetirementStore {
  retirementRequests: RetirementRequest[]
  isLoading: boolean
  error: string | null
  fetchRetirementRequests: (userId?: string) => Promise<void>
  createRetirementRequest: (request: Omit<RetirementRequest, "id" | "createdAt" | "status">) => Promise<void>
  updateRetirementStatus: (id: string, status: "approved" | "rejected", rejectionComment?: string) => Promise<void>
  getUserRetirementRequests: (userId: string) => RetirementRequest[]
}

const mockRetirementRequests: RetirementRequest[] = [
  {
    id: "1",
    userId: "1",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b75a?w=40&h=40&fit=crop&crop=face",
    amount: 450.0,
    description: "Team building event expenses",
    proofOfSpend: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"],
    receipts: ["https://images.unsplash.com/photo-1554224311-beee4ece8db7?w=400&h=300&fit=crop"],
    status: "pending",
    createdAt: "2024-01-15",
    department: "Marketing",
  },
  {
    id: "2",
    userId: "2",
    userName: "Mike Chen",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    amount: 1200.0,
    description: "Conference travel and accommodation",
    proofOfSpend: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"],
    receipts: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    ],
    status: "approved",
    createdAt: "2024-01-10",
    department: "IT",
  },
]

export const useRetirementStore = create<RetirementStore>((set, get) => ({
  retirementRequests: [],
  isLoading: false,
  error: null,

  fetchRetirementRequests: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      let requests = mockRetirementRequests
      if (userId) {
        requests = mockRetirementRequests.filter((req) => req.userId === userId)
      }
      set({ retirementRequests: requests, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  createRetirementRequest: async (request) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newRequest: RetirementRequest = {
        ...request,
        id: Date.now().toString(),
        status: "pending",
        createdAt: new Date().toISOString(),
      }
      set((state) => ({
        retirementRequests: [...state.retirementRequests, newRequest],
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  updateRetirementStatus: async (id, status, rejectionComment) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      set((state) => ({
        retirementRequests: state.retirementRequests.map((req) =>
          req.id === id ? { ...req, status, rejectionComment } : req,
        ),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  getUserRetirementRequests: (userId) => {
    return get().retirementRequests.filter((req) => req.userId === userId)
  },
}))
