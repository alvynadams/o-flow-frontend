import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Download,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

const leaveData = [
  { month: "Jan", approved: 45, pending: 8, rejected: 2 },
  { month: "Feb", approved: 52, pending: 12, rejected: 3 },
  { month: "Mar", approved: 48, pending: 6, rejected: 1 },
  { month: "Apr", approved: 61, pending: 15, rejected: 4 },
  { month: "May", approved: 55, pending: 9, rejected: 2 },
  { month: "Jun", approved: 67, pending: 11, rejected: 3 },
];

const financeData = [
  { month: "Jan", pettyCash: 2400, cashAdvance: 8400, requisitions: 1200 },
  { month: "Feb", pettyCash: 2100, cashAdvance: 7200, requisitions: 1800 },
  { month: "Mar", pettyCash: 2800, cashAdvance: 9800, requisitions: 1400 },
  { month: "Apr", pettyCash: 3200, cashAdvance: 11200, requisitions: 2200 },
  { month: "May", pettyCash: 2900, cashAdvance: 10100, requisitions: 1900 },
  { month: "Jun", pettyCash: 3100, cashAdvance: 12400, requisitions: 2100 },
];

const departmentData = [
  { name: "IT", value: 45, color: "#0891b2" },
  { name: "HR", value: 25, color: "#f59e0b" },
  { name: "Finance", value: 20, color: "#8b5cf6" },
  { name: "Marketing", value: 30, color: "#ef4444" },
  { name: "Operations", value: 35, color: "#10b981" },
];

const expenseCategories = [
  { name: "Office Supplies", value: 3500, color: "#0891b2" },
  { name: "Travel", value: 8200, color: "#f59e0b" },
  { name: "Meals", value: 2800, color: "#8b5cf6" },
  { name: "Software", value: 4600, color: "#ef4444" },
  { name: "Other", value: 1900, color: "#10b981" },
];

export const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into HR and Finance operations
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-teal hover:bg-teal/90">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Employees
            </CardTitle>
            <Users className="w-4 h-4 text-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Leave Requests
            </CardTitle>
            <Calendar className="w-4 h-4 text-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
            <DollarSign className="w-4 h-4 text-violet" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€45,200</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approval Rate
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leave" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leave">Leave Analytics</TabsTrigger>
          <TabsTrigger value="finance">Finance Reports</TabsTrigger>
          <TabsTrigger value="departments">Department Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="leave" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Leave Requests Trend</CardTitle>
                <CardDescription>
                  Monthly leave requests by status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={leaveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="approved" fill="#10b981" name="Approved" />
                    <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                    <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave by Department</CardTitle>
                <CardDescription>
                  Distribution of leave requests across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${((percent as number) * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Finance Trends</CardTitle>
                <CardDescription>
                  Monthly financial requests and expenditures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={financeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`€${value}`, ""]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pettyCash"
                      stroke="#0891b2"
                      name="Petty Cash"
                    />
                    <Line
                      type="monotone"
                      dataKey="cashAdvance"
                      stroke="#f59e0b"
                      name="Cash Advance"
                    />
                    <Line
                      type="monotone"
                      dataKey="requisitions"
                      stroke="#8b5cf6"
                      name="Requisitions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>
                  Breakdown of expenses by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      label={({ name, value }: any) => `${name}: €${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`€${value}`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>
                  Comprehensive view of departmental metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{dept.name}</h4>
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            `bg-[${dept.color}]`
                          )}
                        />
                      </div>
                      <p className="text-2xl font-bold">{dept.value}</p>
                      <p className="text-sm text-muted-foreground">Employees</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Leave Rate</span>
                          <span>12%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Avg. Expenses</span>
                          <span>€2,400</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
