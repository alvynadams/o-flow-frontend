import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  FolderOpen,
  BarChart3,
  ClipboardList,
  Calendar,
  Receipt,
  Wallet,
} from "lucide-react";

export const ADMIN_SECTIONS = [
  { label: "Dashboard", path: "/dashboard", Icon: LayoutDashboard },
  { label: "Employees", path: "/employees", Icon: Users },
  { label: "Leave", path: "/leave", Icon: FileText },
  {
    label: "Finance",
    Icon: DollarSign,
    children: [
      { label: "Petty Cash", path: "/petty-cash" },
      { label: "Cash Advance", path: "/cash-advance" },
      { label: "Requisitions", path: "/requisitions" },
    ],
  },
  { label: "Documents", path: "/documents", Icon: FolderOpen },
  { label: "Reports", path: "/reports", Icon: BarChart3 },
];

export const EMPLOYEE_SECTIONS = [
  { label: "Dashboard", path: "/dashboard", Icon: LayoutDashboard },
  { label: "Payslip", path: "/payslip", Icon: DollarSign },
  { label: "Documents", path: "/documents", Icon: FolderOpen },
  { label: "Leave", path: "/leave", Icon: FileText },
  { label: "Petty Cash", path: "/petty-cash", Icon: ClipboardList },
];

export const recentActivity = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b75a?w=40&h=40&fit=crop&crop=face",
    action: "submitted leave request",
    type: "Leave",
    status: "pending",
    time: "2 minutes ago",
  },
  {
    id: 2,
    user: "Mike Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    action: "requested petty cash",
    type: "Petty Cash",
    status: "approved",
    time: "1 hour ago",
  },
  {
    id: 3,
    user: "Lisa Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    action: "submitted cash advance",
    type: "Cash Advance",
    status: "pending",
    time: "3 hours ago",
  },
  {
    id: 4,
    user: "David Kim",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    action: "uploaded document",
    type: "Document",
    status: "completed",
    time: "5 hours ago",
  },
];

export const employeeRequests = [
  {
    id: 1,
    employee: "Emma Watson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b75a?w=40&h=40&fit=crop&crop=face",
    type: "Annual Leave",
    status: "pending",
    date: "2024-01-15",
    department: "Marketing",
  },
  {
    id: 2,
    employee: "James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    type: "Petty Cash",
    status: "pending",
    date: "2024-01-14",
    department: "IT",
  },
  {
    id: 3,
    employee: "Sophie Turner",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    type: "Cash Advance",
    status: "pending",
    date: "2024-01-13",
    department: "HR",
  },
];

export const adminMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "employees", label: "Employees", icon: Users },
  { id: "leave", label: "Leave", icon: Calendar },
  { id: "finance", label: "Finance", icon: DollarSign },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

export const employeeMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "payslip", label: "Payslip", icon: Receipt },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "leave", label: "Leave", icon: Calendar },
  { id: "petty-cash", label: "Petty Cash", icon: Wallet },
];
