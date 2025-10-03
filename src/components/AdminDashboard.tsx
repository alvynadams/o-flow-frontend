import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileText, Calendar, DollarSign, Clock } from "lucide-react";
import {
  useEmployeeService,
  useLeaveService,
  useFinanceService,
} from "@/services";
import { StatsCard } from "./admin/StatsCard";
import {
  PendingRequestsTable,
  type PendingRequest,
} from "./admin/PendingRequestsTable";

export const AdminDashboard = () => {
  const { employees, getEmployees } = useEmployeeService();
  const { leaveRequests, getLeaveRequests, updateLeaveStatus } =
    useLeaveService();
  const {
    pettyCashRequests,
    cashAdvanceRequests,
    getPettyCashRequests,
    getCashAdvanceRequests,
    updatePettyCashStatus,
    updateCashAdvanceStatus,
  } = useFinanceService();

  useEffect(() => {
    getEmployees();
    getLeaveRequests();
    getPettyCashRequests();
    getCashAdvanceRequests();
  }, []);

  const pendingLeave = leaveRequests.filter(
    (req) => req.status === "pending"
  ).length;
  const totalCashRequests = [
    ...pettyCashRequests,
    ...cashAdvanceRequests,
  ].reduce((sum, req) => sum + req.amount, 0);

  const allPendingRequests = [
    ...leaveRequests
      .filter((req) => req.status === "pending")
      .map((req) => ({ ...req, type: "leave" as const })),
    ...pettyCashRequests
      .filter((req) => req.status === "pending")
      .map((req) => ({ ...req, type: "petty-cash" as const })),
    ...cashAdvanceRequests
      .filter((req) => req.status === "pending")
      .map((req) => ({ ...req, type: "cash-advance" as const })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5) as PendingRequest[];

  const statsCards = [
    {
      title: "Total Staff",
      value: employees.length.toString(),
      change: "+12%",
      icon: Users,
      color: "bg-teal-500",
      href: "/staff",
    },
    {
      title: "Job Applications",
      value: "32",
      change: "+5%",
      icon: FileText,
      color: "bg-violet-500",
    },
    {
      title: "Pending Leave",
      value: pendingLeave.toString(),
      change: "-3%",
      icon: Calendar,
      color: "bg-amber-500",
      href: "leave",
    },
    {
      title: "Cash Requests",
      value: `€${totalCashRequests.toFixed(0)}`,
      change: "+8%",
      icon: DollarSign,
      color: "bg-slate-600",
      href: "finance",
    },
  ];

  const handleApprove = async (id: string, type: string) => {
    if (type === "leave") await updateLeaveStatus(id, "approved");
    else if (type === "petty-cash") await updatePettyCashStatus(id, "approved");
    else await updateCashAdvanceStatus(id, "approved");
  };

  const handleReject = async (id: string, type: string) => {
    if (type === "leave") await updateLeaveStatus(id, "rejected");
    else if (type === "petty-cash") await updatePettyCashStatus(id, "rejected");
    else await updateCashAdvanceStatus(id, "rejected");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <Card className="border border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Pending Requests
          </CardTitle>
          <CardDescription>Requests requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <PendingRequestsTable
            requests={allPendingRequests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </CardContent>
      </Card>
    </div>
  );
};
