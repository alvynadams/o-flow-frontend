import { useEffect } from "react";
import { LeaveRequestForm } from "@/components/RequestForms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { useLeaveStore } from "@/stores/useLeaveStore";
import { useAuth } from "@/libs/hooks";
import { getStatusColor } from "@/libs/utils";
import type { LeaveRequest } from "@/libs/types";

export const LeavePage = () => {
  const { user } = useAuth();
  const { leaveRequests, isLoading, fetchLeaveRequests, updateLeaveStatus } =
    useLeaveStore();

  useEffect(() => {
    if (user) {
      // Employees only see their own requests, admins see all
      fetchLeaveRequests(user.role === "employee" ? user.id : undefined);
    }
  }, [user, fetchLeaveRequests]);

  const displayRequests =
    user?.role === "employee"
      ? leaveRequests.filter((req: LeaveRequest) => req.userId === user.id)
      : leaveRequests;

  const handleApprove = async (id: string) => {
    await updateLeaveStatus(id, "approved");
  };

  const handleReject = async (id: string) => {
    await updateLeaveStatus(id, "rejected");
  };

  const leaveBalance = {
    annual: { used: 7, total: 25 },
    sick: { used: 2, total: 10 },
    personal: { used: 1, total: 5 },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Leave Management</h1>
          <p className="text-muted-foreground">
            {user?.role === "admin"
              ? "Manage leave requests and approvals"
              : "View and request your leave"}
          </p>
        </div>
        <div className="flex gap-3">
          <LeaveRequestForm />
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Calendar View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Annual Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {leaveBalance.annual.used}
              </span>
              <span className="text-muted-foreground">
                / {leaveBalance.annual.total} days
              </span>
            </div>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-teal transition-all"
                style={{
                  width: `${
                    (leaveBalance.annual.used / leaveBalance.annual.total) * 100
                  }%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {leaveBalance.annual.total - leaveBalance.annual.used} days
              remaining
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sick Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {leaveBalance.sick.used}
              </span>
              <span className="text-muted-foreground">
                / {leaveBalance.sick.total} days
              </span>
            </div>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-amber transition-all"
                style={{
                  width: `${
                    (leaveBalance.sick.used / leaveBalance.sick.total) * 100
                  }%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {leaveBalance.sick.total - leaveBalance.sick.used} days remaining
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Personal Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {leaveBalance.personal.used}
              </span>
              <span className="text-muted-foreground">
                / {leaveBalance.personal.total} days
              </span>
            </div>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-violet transition-all"
                style={{
                  width: `${
                    (leaveBalance.personal.used / leaveBalance.personal.total) *
                    100
                  }%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {leaveBalance.personal.total - leaveBalance.personal.used} days
              remaining
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {user?.role === "admin"
              ? "All Leave Requests"
              : "My Leave Requests"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading...
            </div>
          ) : displayRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No leave requests found
            </div>
          ) : (
            <div className="space-y-3">
              {displayRequests.map((request: LeaveRequest) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/50 hover:border-border transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {user?.role === "admin" && (
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={request.userAvatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {request.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex-1 min-w-0">
                      {user?.role === "admin" && (
                        <p className="font-medium text-sm">
                          {request.userName}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {request.type.replace("-", " ")}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(request.startDate).toLocaleDateString()} -{" "}
                          {new Date(request.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {request.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge
                      className={`${getStatusColor(request.status)} capitalize`}
                    >
                      {request.status}
                    </Badge>

                    {user?.role === "admin" && request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(request.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
