import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export const PayslipPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Payslip</h1>
          <p className="text-muted-foreground">
            View and download your salary information
          </p>
        </div>
        <Button className="bg-teal hover:bg-teal/90">
          <Download className="w-4 h-4 mr-2" />
          Download Current
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Month - January 2024</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Base Salary</span>
              <span className="font-medium">€4,000.00</span>
            </div>
            <div className="flex justify-between">
              <span>Overtime</span>
              <span className="font-medium">€250.00</span>
            </div>
            <div className="flex justify-between">
              <span>Allowances</span>
              <span className="font-medium">€150.00</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-medium text-red-600">-€800.00</span>
            </div>
            <div className="flex justify-between">
              <span>Insurance</span>
              <span className="font-medium text-red-600">-€200.00</span>
            </div>
            <div className="flex justify-between">
              <span>Pension</span>
              <span className="font-medium text-red-600">-€150.00</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Net Pay</span>
              <span>€3,250.00</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Previous Payslips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">December 2023</p>
                  <p className="text-sm text-muted-foreground">
                    Net: €3,150.00
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">November 2023</p>
                  <p className="text-sm text-muted-foreground">
                    Net: €3,200.00
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">October 2023</p>
                  <p className="text-sm text-muted-foreground">
                    Net: €3,100.00
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
