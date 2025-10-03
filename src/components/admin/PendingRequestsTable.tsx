import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";
import { getStatusColor } from "@/libs/utils";
import type {
  LeaveRequest,
  PettyCashRequest,
  CashAdvanceRequest,
} from "@/libs/types";

export type PendingRequest = (
  | LeaveRequest
  | PettyCashRequest
  | CashAdvanceRequest
) & {
  type: "leave" | "petty-cash" | "cash-advance";
};

interface PendingRequestsTableProps {
  requests: PendingRequest[];
  onApprove: (id: string, type: string) => void;
  onReject: (id: string, type: string) => void;
}

export const PendingRequestsTable = ({
  requests,
  onApprove,
  onReject,
}: PendingRequestsTableProps) => {
  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No pending requests
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={`${request.type}-${request.id}`}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={request.userAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{request.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{request.userName}</p>
                  <p className="text-xs text-muted-foreground">
                    {request.department}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="capitalize">
                {request.type === "leave"
                  ? "Leave"
                  : request.type === "petty-cash"
                  ? "Petty Cash"
                  : "Cash Advance"}
              </Badge>
            </TableCell>
            <TableCell>
              {request.type === "leave" ? (
                <span className="text-sm">
                  {new Date(
                    (request as unknown as LeaveRequest).startDate
                  ).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(
                    (request as unknown as LeaveRequest).endDate
                  ).toLocaleDateString()}
                </span>
              ) : (
                <span className="text-sm font-semibold">
                  €{(request as PettyCashRequest).amount.toFixed(2)}
                </span>
              )}
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(request.status)}>
                {request.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => onApprove(request.id, request.type)}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onReject(request.id, request.type)}
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Decline
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
