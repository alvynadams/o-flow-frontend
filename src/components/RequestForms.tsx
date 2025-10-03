import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CalendarIcon,
  DollarSign,
  Plus,
  CheckCircle,
  Upload,
  X,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { useLeaveStore } from "@/stores/useLeaveStore";
import { useFinanceStore } from "@/stores/useFinanceStore";
import { useRetirementStore } from "@/stores/useRetirementStore";
import { useAuth } from "@/libs/hooks";
import type { LeaveType } from "@/libs/types";

interface LeaveFormData {
  type: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  reason: string;
}

interface PettyCashFormData {
  amount: string;
  category: string;
  description: string;
  receipt: File | null;
}

interface CashAdvanceFormData {
  amount: string;
  purpose: string;
  expectedReturn: Date | undefined;
  justification: string;
}

interface RetirementFormData {
  amount: string;
  description: string;
  proofOfSpend: File[];
  receipts: File[];
}

export const LeaveRequestForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<LeaveFormData>({
    type: "",
    startDate: undefined,
    endDate: undefined,
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { createLeaveRequest } = useLeaveStore();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      await createLeaveRequest({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        type: formData.type as LeaveType,
        startDate: formData.startDate!.toISOString(),
        endDate: formData.endDate!.toISOString(),
        reason: formData.reason,
        department: "Marketing",
      });

      setIsSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setFormData({
          type: "",
          startDate: undefined,
          endDate: undefined,
          reason: "",
        });
      }, 2000);
    } catch (error) {
      console.error(error);

      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="sm:max-w-[320px] max-w-xs p-8 rounded-2xl border border-border/50 backdrop-blur-lg shadow-xl bg-background/80"
          showX={false}
        >
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="size-28 rounded-full flex items-center justify-center bg-green-100">
              <CheckCircle className="size-14 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-base">Request Submitted</p>
              <p className="text-sm text-muted-foreground">
                Your leave request has been sent for approval
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal hover:bg-teal/90">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Request Leave
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Leave Request</DialogTitle>
          <DialogDescription>
            Submit a new leave request for approval.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leave-type">Leave Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                  <SelectItem value="maternity">Maternity Leave</SelectItem>
                  <SelectItem value="emergency">Emergency Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 justify-start bg-transparent"
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {formData.startDate
                        ? format(formData.startDate, "MMM dd")
                        : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) =>
                        setFormData({ ...formData, startDate: date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 justify-start bg-transparent"
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {formData.endDate
                        ? format(formData.endDate, "MMM dd")
                        : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) =>
                        setFormData({ ...formData, endDate: date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Please provide a reason for your leave request..."
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              rows={3}
            />
          </div>

          <Alert>
            <AlertDescription>
              Your request will be sent to your manager for approval. You'll
              receive an email notification once it's been reviewed.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-teal hover:bg-teal/90"
              disabled={isSubmitting || !formData.type || !formData.startDate}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const PettyCashForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<PettyCashFormData>({
    amount: "",
    category: "",
    description: "",
    receipt: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { createPettyCashRequest } = useFinanceStore();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      await createPettyCashRequest({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        amount: Number.parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        department: "Marketing",
      });

      setIsSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setFormData({
          amount: "",
          category: "",
          description: "",
          receipt: null,
        });
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="sm:max-w-[320px] max-w-xs p-8 rounded-2xl border border-border/50 backdrop-blur-lg shadow-xl bg-background/80"
          showX={false}
        >
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="size-28 rounded-full flex items-center justify-center bg-green-100">
              <CheckCircle className="size-14 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-base">Request Submitted</p>
              <p className="text-sm text-muted-foreground">
                Your petty cash request has been sent for approval
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <DollarSign className="w-4 h-4 mr-2" />
          Petty Cash
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Petty Cash Request</DialogTitle>
          <DialogDescription>
            Request reimbursement for business expenses.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (€)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office-supplies">
                    Office Supplies
                  </SelectItem>
                  <SelectItem value="travel">Travel Expenses</SelectItem>
                  <SelectItem value="meals">Meals & Entertainment</SelectItem>
                  <SelectItem value="software">
                    Software/Subscriptions
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the expense..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receipt">Receipt (Optional)</Label>
            <Input
              id="receipt"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  receipt: e.target.files?.[0] || null,
                })
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-amber hover:bg-amber/90"
              disabled={isSubmitting || !formData.amount || !formData.category}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const CashAdvanceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CashAdvanceFormData>({
    amount: "",
    purpose: "",
    expectedReturn: undefined,
    justification: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { createCashAdvanceRequest } = useFinanceStore();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      await createCashAdvanceRequest({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        amount: Number.parseFloat(formData.amount),
        purpose: formData.purpose,
        expectedReturn: formData.expectedReturn!.toISOString(),
        justification: formData.justification,
        department: "Marketing",
      });

      setIsSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setFormData({
          amount: "",
          purpose: "",
          expectedReturn: undefined,
          justification: "",
        });
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="sm:max-w-[320px] max-w-xs p-8 rounded-2xl border border-border/50 backdrop-blur-lg shadow-xl bg-background/80"
          showX={false}
        >
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="size-28 rounded-full flex items-center justify-center bg-green-100">
              <CheckCircle className="size-14 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-base">Request Submitted</p>
              <p className="text-sm text-muted-foreground">
                Your cash advance request has been sent for approval
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Cash Advance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cash Advance Request</DialogTitle>
          <DialogDescription>
            Request an advance on your salary.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="advance-amount">Amount (€)</Label>
              <Input
                id="advance-amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Expected Return Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {formData.expectedReturn
                      ? format(formData.expectedReturn, "MMM dd, yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.expectedReturn}
                    onSelect={(date) =>
                      setFormData({ ...formData, expectedReturn: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Input
              id="purpose"
              placeholder="Brief purpose of the advance..."
              value={formData.purpose}
              onChange={(e) =>
                setFormData({ ...formData, purpose: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="justification">Justification</Label>
            <Textarea
              id="justification"
              placeholder="Provide detailed justification for the advance..."
              value={formData.justification}
              onChange={(e) =>
                setFormData({ ...formData, justification: e.target.value })
              }
              rows={3}
            />
          </div>

          <Alert>
            <AlertDescription>
              Cash advances are subject to company policy and approval. The
              amount will be deducted from future salary payments.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-violet hover:bg-violet/90"
              disabled={isSubmitting || !formData.amount || !formData.purpose}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const RetirementForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<RetirementFormData>({
    amount: "",
    description: "",
    proofOfSpend: [],
    receipts: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { createRetirementRequest } = useRetirementStore();
  const { user } = useAuth();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "proofOfSpend" | "receipts"
  ) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ...files],
    }));
  };

  const removeFile = (index: number, type: "proofOfSpend" | "receipts") => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      // In a real app, you would upload files to a server and get URLs
      const proofOfSpendUrls = formData.proofOfSpend.map((file) =>
        URL.createObjectURL(file)
      );
      const receiptUrls = formData.receipts.map((file) =>
        URL.createObjectURL(file)
      );

      await createRetirementRequest({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        amount: Number.parseFloat(formData.amount),
        description: formData.description,
        proofOfSpend: proofOfSpendUrls,
        receipts: receiptUrls,
        department: "Marketing",
      });

      setIsSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setFormData({
          amount: "",
          description: "",
          proofOfSpend: [],
          receipts: [],
        });
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="sm:max-w-[320px] max-w-xs p-8 rounded-2xl border border-border/50 backdrop-blur-lg shadow-xl bg-background/80"
          showX={false}
        >
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="size-28 rounded-full flex items-center justify-center bg-green-100">
              <CheckCircle className="size-14 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-base">Request Submitted</p>
              <p className="text-sm text-muted-foreground">
                Your retirement request has been sent for approval
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Retirement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Retirement Request</DialogTitle>
          <DialogDescription>
            Submit expenses with proof of spend and receipts for reimbursement.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="retirement-amount">Amount (€)</Label>
            <Input
              id="retirement-amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="retirement-description">Description</Label>
            <Textarea
              id="retirement-description"
              placeholder="Describe the expenses..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proof-of-spend">
              Proof of Spend <span className="text-destructive">*</span>
            </Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  id="proof-of-spend"
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  onChange={(e) => handleFileChange(e, "proofOfSpend")}
                  className="hidden"
                />
                <Label
                  htmlFor="proof-of-spend"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload proof of spend
                  </span>
                </Label>
              </div>
              {formData.proofOfSpend.length > 0 && (
                <div className="space-y-2">
                  {formData.proofOfSpend.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded-lg"
                    >
                      <span className="text-sm truncate flex-1">
                        {file.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFile(index, "proofOfSpend")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="receipts">
              Receipts <span className="text-destructive">*</span>
            </Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  id="receipts"
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  onChange={(e) => handleFileChange(e, "receipts")}
                  className="hidden"
                />
                <Label
                  htmlFor="receipts"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload receipts
                  </span>
                </Label>
              </div>
              {formData.receipts.length > 0 && (
                <div className="space-y-2">
                  {formData.receipts.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded-lg"
                    >
                      <span className="text-sm truncate flex-1">
                        {file.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFile(index, "receipts")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Alert>
            <AlertDescription>
              Please ensure all receipts and proof of spend documents are clear
              and legible. Your request will be reviewed by the finance team.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-teal hover:bg-teal/90"
              disabled={
                isSubmitting ||
                !formData.amount ||
                !formData.description ||
                formData.proofOfSpend.length === 0 ||
                formData.receipts.length === 0
              }
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
