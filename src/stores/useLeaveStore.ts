import { create } from "zustand"
import type { LeaveRequest } from "@/libs/types"

interface LeaveStore {
  leaveRequests: LeaveRequest[]
  isLoading: boolean
  error: string | null
  fetchLeaveRequests: (userId?: string) => Promise<void>
  createLeaveRequest: (request: Omit<LeaveRequest, "id" | "createdAt" | "status">) => Promise<void>
  updateLeaveStatus: (id: string, status: "approved" | "rejected", rejectionComment?: string) => Promise<void>
  getUserLeaveRequests: (userId: string) => LeaveRequest[]
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    userId: "1",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b75a?w=40&h=40&fit=crop&crop=face",
    type: "annual",
    startDate: "2024-03-15",
    endDate: "2024-03-22",
    reason: "Family vacation",
    status: "approved",
    createdAt: "2024-01-10",
    department: "Marketing",
  },
  {
    id: "2",
    userId: "2",
    userName: "Mike Chen",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    type: "sick",
    startDate: "2024-02-05",
    endDate: "2024-02-05",
    reason: "Medical appointment",
    status: "pending",
    createdAt: "2024-01-15",
    department: "IT",
  },
  {
    id: "3",
    userId: "3",
    userName: "Lisa Rodriguez",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    type: "personal",
    startDate: "2024-02-20",
    endDate: "2024-02-21",
    reason: "Personal matters",
    status: "pending",
    createdAt: "2024-01-18",
    department: "HR",
  },
]

export const useLeaveStore = create<LeaveStore>((set, get) => ({
  leaveRequests: [],
  isLoading: false,
  error: null,

  fetchLeaveRequests: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      let requests = mockLeaveRequests
      if (userId) {
        requests = mockLeaveRequests.filter((req) => req.userId === userId)
      }
      set({ leaveRequests: requests, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  createLeaveRequest: async (request) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newRequest: LeaveRequest = {
        ...request,
        id: Date.now().toString(),
        status: "pending",
        createdAt: new Date().toISOString(),
      }
      set((state) => ({
        leaveRequests: [...state.leaveRequests, newRequest],
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  updateLeaveStatus: async (id, status, rejectionComment) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      set((state) => ({
        leaveRequests: state.leaveRequests.map((req) => (req.id === id ? { ...req, status, rejectionComment } : req)),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  getUserLeaveRequests: (userId) => {
    return get().leaveRequests.filter((req) => req.userId === userId)
  },
}))
