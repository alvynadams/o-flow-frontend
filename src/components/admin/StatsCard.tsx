import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: string
  href?: string
}

export const StatsCard = ({ title, value, change, icon: Icon, color, href }: StatsCardProps) => {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer border border-border/50 shadow-sm relative">
      {href && <Link to={href} className="absolute inset-0" />}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div
          className={`w-10 h-10 ${color} text-white rounded-xl flex items-center justify-center shadow-lg ${color.replace(
            "bg-",
            "shadow-",
          )}/20`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          <span className={change.startsWith("+") ? "text-green-600" : "text-red-600"}>{change}</span> from last month
        </p>
      </CardContent>
    </Card>
  )
}
