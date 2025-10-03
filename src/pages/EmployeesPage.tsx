import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { useEmployeeService } from "@/services"
import { EmployeeSearchBar } from "@/components/employees/EmployeeSearchBar"
import { EmployeeTable } from "@/components/employees/EmployeeTable"
import type { Employee } from "@/libs/types"

export const EmployeesPage = () => {
  const { employees, isLoading, getEmployees } = useEmployeeService()
  const [search, setSearch] = useState("")
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])

  useEffect(() => {
    getEmployees()
  }, [])

  useEffect(() => {
    if (search) {
      const filtered = employees.filter((employee) => employee.name.toLowerCase().includes(search.toLowerCase()))
      setFilteredEmployees(filtered)
    } else {
      setFilteredEmployees(employees)
    }
  }, [search, employees])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Employee Management</h1>
          <p className="text-muted-foreground">Manage your team members and their information</p>
        </div>
        <Button className="bg-teal hover:bg-teal/90">
          <Users className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <EmployeeSearchBar search={search} onSearchChange={setSearch} />

      {filteredEmployees.length > 0 ? (
        <Card className="border border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>{search ? `${filteredEmployees.length} results` : "All Employees"}</CardTitle>
            <CardDescription>
              {search ? `${filteredEmployees.length} results` : "Complete list of company employees"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeeTable employees={filteredEmployees} isLoading={isLoading} />
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>No employees found</CardTitle>
            <CardDescription>No employees found matching the search criteria</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
