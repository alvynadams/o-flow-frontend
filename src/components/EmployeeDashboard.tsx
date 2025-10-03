import { useEffect } from "react";
import { Calendar, DollarSign, FileText, Clock } from "lucide-react";
import StatCard from "./dahboard/StatCard";
import { useLeaveService, useFinanceService, useUserService } from "@/services";
import { QuickActionsCard } from "./employee/QuickActionsCard";
import { RecentActivityCard } from "./employee/RecentActivityCard";
import { LeaveCalendarCard } from "./employee/LeaveCalendarCard";

export const EmployeeDashboard = () => {
  const { user } = useUserService();
  const { leaveRequests, getLeaveRequests } = useLeaveService();
  const {
    pettyCashRequests,
    cashAdvanceRequests,
    getPettyCashRequests,
    getCashAdvanceRequests,
  } = useFinanceService();

  useEffect(() => {
    if (user) {
      getLeaveRequests(user.role === "employee" ? user.id : undefined);
      getPettyCashRequests(user.role === "employee" ? user.id : undefined);
      getCashAdvanceRequests(user.role === "employee" ? user.id : undefined);
    }
  }, [user]);

  const myLeaveRequests = leaveRequests.filter(
    (req) => req.userId === user?.id
  );
  const myPettyCash = pettyCashRequests.filter(
    (req) => req.userId === user?.id
  );
  const myCashAdvance = cashAdvanceRequests.filter(
    (req) => req.userId === user?.id
  );

  const pendingRequests = [
    ...myLeaveRequests,
    ...myPettyCash,
    ...myCashAdvance,
  ].filter((req) => req.status === "pending").length;

  const approvedLeave = myLeaveRequests.filter(
    (req) => req.status === "approved"
  ).length;
  const totalLeaveUsed = approvedLeave * 1;
  const totalLeaveAvailable = 25;

  const recentActivity = [
    ...myLeaveRequests.map((req) => ({
      id: req.id,
      action: `Submitted ${req.type} leave request`,
      type: "Leave",
      status: req.status,
      time: new Date(req.createdAt).toLocaleDateString(),
    })),
    ...myPettyCash.map((req) => ({
      id: req.id,
      action: `Requested petty cash - €${req.amount.toFixed(2)}`,
      type: "Petty Cash",
      status: req.status,
      time: new Date(req.createdAt).toLocaleDateString(),
    })),
    ...myCashAdvance.map((req) => ({
      id: req.id,
      action: `Requested cash advance - €${req.amount.toFixed(2)}`,
      type: "Cash Advance",
      status: req.status,
      time: new Date(req.createdAt).toLocaleDateString(),
    })),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 4);

  const personalStats = [
    {
      title: "Leave Balance",
      value: `${totalLeaveAvailable - totalLeaveUsed} days`,
      subtitle: "Available this year",
      icon: Calendar,
      color: "bg-teal",
      progress:
        ((totalLeaveAvailable - totalLeaveUsed) / totalLeaveAvailable) * 100,
    },
    {
      title: "Pending Requests",
      value: pendingRequests.toString(),
      subtitle: "Awaiting approval",
      icon: Clock,
      color: "bg-amber",
    },
    {
      title: "This Month Salary",
      value: "€4,250",
      subtitle: "Next payment: 30th",
      icon: DollarSign,
      color: "bg-violet",
    },
    {
      title: "Documents",
      value: "12",
      subtitle: "Total uploaded",
      icon: FileText,
      color: "bg-slate-600",
    },
  ];

  return (
    <div className="space-y-6">
      <QuickActionsCard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {personalStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <RecentActivityCard activities={recentActivity} />
      </div>

      <LeaveCalendarCard leaveRequests={myLeaveRequests} />
    </div>
  );
};
