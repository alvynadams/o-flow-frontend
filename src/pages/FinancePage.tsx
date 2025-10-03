import { useEffect, useState } from "react";
import {
  CashAdvanceForm,
  PettyCashForm,
  RetirementForm,
} from "@/components/RequestForms";
import { RejectDialog } from "@/components/RejectDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building2,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
} from "lucide-react";
import { useFinanceStore } from "@/stores/useFinanceStore";
import { useRetirementStore } from "@/stores/useRetirementStore";
import { useAuth } from "@/libs/hooks";
import { getStatusColor } from "@/libs/utils";
import type {
  CashAdvanceRequest,
  PettyCashRequest,
  RetirementRequest,
} from "@/libs/types";

export const FinancePage = () => {
  const { user } = useAuth();
  const {
    pettyCashRequests,
    cashAdvanceRequests,
    isLoading,
    fetchPettyCashRequests,
    fetchCashAdvanceRequests,
    updatePettyCashStatus,
    updateCashAdvanceStatus,
  } = useFinanceStore();

  const {
    retirementRequests,
    fetchRetirementRequests,
    updateRetirementStatus,
  } = useRetirementStore();

  const [rejectDialog, setRejectDialog] = useState<{
    isOpen: boolean;
    requestId: string;
    requestType: "pettyCash" | "cashAdvance" | "retirement";
  }>({
    isOpen: false,
    requestId: "",
    requestType: "pettyCash",
  });
  const [isRejecting, setIsRejecting] = useState(false);

  const [viewRetirement, setViewRetirement] = useState<{
    isOpen: boolean;
    request: RetirementRequest | null;
  }>({
    isOpen: false,
    request: null,
  });

  useEffect(() => {
    if (user) {
      const userId = user.role === "employee" ? user.id : undefined;
      fetchPettyCashRequests(userId);
      fetchCashAdvanceRequests(userId);
      fetchRetirementRequests(userId);
    }
  }, [
    user,
    fetchPettyCashRequests,
    fetchCashAdvanceRequests,
    fetchRetirementRequests,
  ]);

  const displayPettyCash =
    user?.role === "employee"
      ? pettyCashRequests.filter(
          (req: { userId: string }) => req.userId === user.id
        )
      : pettyCashRequests;

  const displayCashAdvance =
    user?.role === "employee"
      ? cashAdvanceRequests.filter(
          (req: { userId: string }) => req.userId === user.id
        )
      : cashAdvanceRequests;

  const displayRetirement =
    user?.role === "employee"
      ? retirementRequests.filter(
          (req: { userId: string }) => req.userId === user.id
        )
      : retirementRequests;

  const allRequests = [
    ...displayPettyCash,
    ...displayCashAdvance,
    ...displayRetirement,
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleApprovePettyCash = async (id: string) => {
    await updatePettyCashStatus(id, "approved");
  };

  const handleRejectPettyCash = (id: string) => {
    setRejectDialog({
      isOpen: true,
      requestId: id,
      requestType: "pettyCash",
    });
  };

  const handleApproveCashAdvance = async (id: string) => {
    await updateCashAdvanceStatus(id, "approved");
  };

  const handleRejectCashAdvance = (id: string) => {
    setRejectDialog({
      isOpen: true,
      requestId: id,
      requestType: "cashAdvance",
    });
  };

  const handleApproveRetirement = async (id: string) => {
    await updateRetirementStatus(id, "approved");
  };

  const handleRejectRetirement = (id: string) => {
    setRejectDialog({
      isOpen: true,
      requestId: id,
      requestType: "retirement",
    });
  };

  const handleConfirmReject = async (comment: string) => {
    setIsRejecting(true);
    try {
      if (rejectDialog.requestType === "pettyCash") {
        await updatePettyCashStatus(
          rejectDialog.requestId,
          "rejected",
          comment
        );
      } else if (rejectDialog.requestType === "cashAdvance") {
        await updateCashAdvanceStatus(
          rejectDialog.requestId,
          "rejected",
          comment
        );
      } else {
        await updateRetirementStatus(
          rejectDialog.requestId,
          "rejected",
          comment
        );
      }
      setRejectDialog({
        isOpen: false,
        requestId: "",
        requestType: "pettyCash",
      });
    } finally {
      setIsRejecting(false);
    }
  };

  const totalPending = allRequests.filter(
    (req) => req.status === "pending"
  ).length;
  const totalPendingAmount = allRequests
    .filter((req) => req.status === "pending")
    .reduce((sum, req) => sum + req.amount, 0);

  const monthlyBudget = 25000;
  const monthlySpent = 6250;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Finance Management</h1>
          <p className="text-muted-foreground">
            {user?.role === "admin"
              ? "Handle financial requests and expenses"
              : "View and request financial support"}
          </p>
        </div>
        <div className="flex gap-3">
          <PettyCashForm />
          <CashAdvanceForm />
          <RetirementForm />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {user?.role === "admin" ? "Monthly Budget" : "My Total Requests"}
            </CardTitle>
            <DollarSign className="w-4 h-4 text-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €
              {user?.role === "admin"
                ? monthlyBudget.toLocaleString()
                : allRequests
                    .reduce((sum, req) => sum + req.amount, 0)
                    .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {user?.role === "admin"
                ? `€${(
                    monthlyBudget - monthlySpent
                  ).toLocaleString()} remaining`
                : `${allRequests.length} total requests`}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approvals
            </CardTitle>
            <Building2 className="w-4 h-4 text-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPending}</div>
            <p className="text-xs text-muted-foreground">
              €{totalPendingAmount.toFixed(2)} total value
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {user?.role === "admin"
                ? "This Month Expenses"
                : "Approved Requests"}
            </CardTitle>
            <DollarSign className="w-4 h-4 text-violet" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.role === "admin"
                ? `€${monthlySpent.toLocaleString()}`
                : allRequests.filter((req) => req.status === "approved").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {user?.role === "admin"
                ? "+15% from last month"
                : "Successfully processed"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {user?.role === "admin"
              ? "All Financial Requests"
              : "My Financial Requests"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading...
            </div>
          ) : allRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No financial requests found
            </div>
          ) : (
            <div className="space-y-3">
              {allRequests.map((request) => {
                const isPettyCash = "category" in request;
                const isCashAdvance =
                  "purpose" in request && !("receipts" in request);
                const isRetirement = "receipts" in request;

                return (
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
                          <Badge variant="outline" className="text-xs">
                            {isPettyCash
                              ? "Petty Cash"
                              : isCashAdvance
                              ? "Cash Advance"
                              : "Retirement"}
                          </Badge>
                          <span className="text-sm font-semibold">
                            €{request.amount.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 truncate">
                          {isPettyCash
                            ? (request as PettyCashRequest).description
                            : isCashAdvance
                            ? (request as CashAdvanceRequest).purpose
                            : (request as RetirementRequest).description}
                        </p>
                        {request.status === "rejected" &&
                          request.rejectionComment && (
                            <div className="mt-2 flex items-start gap-2 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                              <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-destructive">
                                <span className="font-medium">
                                  Rejection reason:
                                </span>{" "}
                                {request.rejectionComment}
                              </p>
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${getStatusColor(
                          request.status
                        )} capitalize`}
                      >
                        {request.status}
                      </Badge>

                      {isRetirement && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setViewRetirement({
                              isOpen: true,
                              request: request as RetirementRequest,
                            })
                          }
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      )}

                      {user?.role === "admin" &&
                        request.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                if (isPettyCash)
                                  handleApprovePettyCash(request.id);
                                else if (isCashAdvance)
                                  handleApproveCashAdvance(request.id);
                                else handleApproveRetirement(request.id);
                              }}
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                if (isPettyCash)
                                  handleRejectPettyCash(request.id);
                                else if (isCashAdvance)
                                  handleRejectCashAdvance(request.id);
                                else handleRejectRetirement(request.id);
                              }}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <RejectDialog
        isOpen={rejectDialog.isOpen}
        onClose={() =>
          setRejectDialog({
            isOpen: false,
            requestId: "",
            requestType: "pettyCash",
          })
        }
        onConfirm={handleConfirmReject}
        requestType={
          rejectDialog.requestType === "pettyCash"
            ? "Petty Cash Request"
            : rejectDialog.requestType === "cashAdvance"
            ? "Cash Advance Request"
            : "Retirement Request"
        }
        isSubmitting={isRejecting}
      />

      <Dialog
        open={viewRetirement.isOpen}
        onOpenChange={(open) =>
          setViewRetirement({ isOpen: open, request: null })
        }
      >
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Retirement Request Details</DialogTitle>
          </DialogHeader>
          {viewRetirement.request && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-lg font-semibold">
                    €{viewRetirement.request.amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    className={`${getStatusColor(
                      viewRetirement.request.status
                    )} capitalize mt-1`}
                  >
                    {viewRetirement.request.status}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Description
                </p>
                <p className="text-sm">{viewRetirement.request.description}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Proof of Spend
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {viewRetirement.request.proofOfSpend.map(
                    (url: string, index: number) => (
                      <img
                        key={index}
                        src={url || "/placeholder.svg"}
                        alt={`Proof of spend ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-border"
                      />
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">Receipts</p>
                <div className="grid grid-cols-2 gap-4">
                  {viewRetirement.request.receipts.map(
                    (url: string, index: number) => (
                      <img
                        key={index}
                        src={url || "/placeholder.svg"}
                        alt={`Receipt ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-border"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
