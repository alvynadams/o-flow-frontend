import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import ActionButton from "../dahboard/ActionButton"
import { Calendar, DollarSign, FileText } from "lucide-react"

const quickActions = [
  {
    title: "Request Leave",
    description: "Submit a new leave application",
    icon: Calendar,
    color: "bg-teal",
  },
  {
    title: "Petty Cash",
    description: "Request petty cash reimbursement",
    icon: DollarSign,
    color: "bg-amber",
  },
  {
    title: "Upload Document",
    description: "Add a new document",
    icon: FileText,
    color: "bg-violet",
  },
]

export const QuickActionsCard = () => {
  return (
    <Card className="border border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>Common tasks and requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <ActionButton key={index} {...action} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
