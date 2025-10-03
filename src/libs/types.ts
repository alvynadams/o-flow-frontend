export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  avatar?: string;
}

export type AuthType =
  | { method: "password"; email: string; password: string }
  | { method: "biometrics"; bioToken: string }
  | { method: "2fa"; code: string };

export interface AuthContextType {
  user: User | null;
  login: (auth: AuthType) => Promise<User>;
  logout: () => void;
  isLoading: boolean;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  avatar?: string;
  status: "Active" | "Inactive";
  joinDate: string;
}

export type LeaveType =
  | "annual"
  | "sick"
  | "personal"
  | "maternity"
  | "emergency";

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  department?: string;
  rejectionComment?: string;
}

export interface PettyCashRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  amount: number;
  category: string;
  description: string;
  receipt?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  department?: string;
  rejectionComment?: string;
}

export interface CashAdvanceRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  amount: number;
  purpose: string;
  expectedReturn: string;
  justification: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  department?: string;
  rejectionComment?: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  type: string;
  status: string;
  time: string;
  createdAt: string;
}

export interface RetirementRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  amount: number;
  description: string;
  proofOfSpend: string[];
  receipts: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  department?: string;
  rejectionComment?: string;
}

export type NotificationType = "leave" | "finance" | "system" | "approval";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  relatedId?: string;
}

export type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};
