import { AdminDashboard } from "./components/AdminDashboard";
import { AuthProvider } from "./components/AuthContext";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { useAuth } from "./libs/hooks";
import { EmployeesPage } from "./pages/EmployeesPage";
import { LeavePage } from "./pages/LeavePage";
import { LoginPage } from "./pages/LoginPage";
import { FinancePage } from "./pages/FinancePage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { PayslipPage } from "./pages/PayslipPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const AppContent = () => {
  const { user } = useAuth();

  if (!user) return <LoginPage />;

  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={
            user.role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />
          }
        />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/payslip" element={<PayslipPage />} />
        <Route path="/petty-cash" element={<FinancePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DashboardLayout>
  );
};
