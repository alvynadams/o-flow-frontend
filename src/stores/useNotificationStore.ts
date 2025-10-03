import { create } from "zustand"
import type { Notification } from "@/libs/types"

interface NotificationStore {
  notifications: Notification[]
  isLoading: boolean
  error: string | null
  fetchNotifications: (userId: string) => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: (userId: string) => Promise<void>
  deleteNotification: (id: string) => Promise<void>
  createNotification: (notification: Omit<Notification, "id" | "createdAt">) => Promise<void>
  getUnreadCount: (userId: string) => number
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    type: "approval",
    title: "Leave Request Approved",
    message: "Your annual leave request for Jan 20-25 has been approved.",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    actionUrl: "/leave",
  },
  {
    id: "2",
    userId: "1",
    type: "finance",
    title: "Petty Cash Processed",
    message: "Your petty cash request of €145.50 has been approved and processed.",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    actionUrl: "/finance",
  },
  {
    id: "3",
    userId: "1",
    type: "system",
    title: "Profile Updated",
    message: "Your profile information has been successfully updated.",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    actionUrl: "/profile",
  },
  {
    id: "4",
    userId: "2",
    type: "leave",
    title: "New Leave Request",
    message: "Sarah Johnson has submitted a leave request for your approval.",
    read: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    actionUrl: "/leave",
  },
  {
    id: "5",
    userId: "2",
    type: "finance",
    title: "Cash Advance Pending",
    message: "Lisa Rodriguez has requested a cash advance of €1,000.",
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    actionUrl: "/finance",
  },
]

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  isLoading: false,
  error: null,

  fetchNotifications: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const userNotifications = mockNotifications.filter((notif) => notif.userId === userId)
      set({ notifications: userNotifications, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  markAsRead: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      set((state) => ({
        notifications: state.notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  markAllAsRead: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      set((state) => ({
        notifications: state.notifications.map((notif) => (notif.userId === userId ? { ...notif, read: true } : notif)),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  deleteNotification: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      set((state) => ({
        notifications: state.notifications.filter((notif) => notif.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  createNotification: async (notification) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      set((state) => ({
        notifications: [newNotification, ...state.notifications],
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  getUnreadCount: (userId) => {
    return get().notifications.filter((notif) => notif.userId === userId && !notif.read).length
  },
}))
