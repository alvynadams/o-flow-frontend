import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LeaveRequest } from "@/libs/types"

interface LeaveCalendarCardProps {
  leaveRequests: LeaveRequest[]
}

export const LeaveCalendarCard = ({ leaveRequests }: LeaveCalendarCardProps) => {
  const approvedLeave = leaveRequests.filter((req) => req.status === "approved")

  return (
    <Card className="border border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle>Leave Calendar Overview</CardTitle>
        <CardDescription>Your upcoming leave and important dates</CardDescription>
      </CardHeader>
      <CardContent>
        {approvedLeave.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No approved leave scheduled</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {approvedLeave.slice(0, 3).map((leave) => (
              <div key={leave.id} className="p-4 border border-border/50 rounded-lg bg-muted/30">
                <h4 className="font-medium mb-2">Approved Leave</h4>
                <p className="text-sm text-muted-foreground capitalize">{leave.type} Leave</p>
                <p className="text-lg font-semibold">
                  {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                </p>
                <Badge className="mt-2 bg-green-500 text-white">Approved</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
