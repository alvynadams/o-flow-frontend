import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XCircle } from "lucide-react"

interface RejectDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (comment: string) => void
  requestType: string
  isSubmitting?: boolean
}

export const RejectDialog = ({ isOpen, onClose, onConfirm, requestType, isSubmitting = false }: RejectDialogProps) => {
  const [comment, setComment] = useState("")

  const handleConfirm = () => {
    onConfirm(comment)
    setComment("")
  }

  const handleClose = () => {
    setComment("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-destructive" />
            Reject {requestType}
          </DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this request. This will be visible to the employee.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="rejection-comment">Rejection Reason</Label>
            <Textarea
              id="rejection-comment"
              placeholder="Explain why this request is being rejected..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1 bg-transparent"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            className="flex-1"
            disabled={isSubmitting || !comment.trim()}
          >
            {isSubmitting ? "Rejecting..." : "Confirm Rejection"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
