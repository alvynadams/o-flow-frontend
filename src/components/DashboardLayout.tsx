import type { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { NotificationPanel } from "@/components/NotificationPanel";
import { adminMenuItems, employeeMenuItems } from "@/libs/constants";
import { useUserStore } from "@/stores/useUserStore";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const menuItems = user?.role === "admin" ? adminMenuItems : employeeMenuItems;
  const location = useLocation();
  const path = location.pathname;
  const activePath = path === "/" ? "dashboard" : path.replace("/", "");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <div className="relative w-48">
          <Sidebar className="border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarContent>
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div>
                    <h1
                      className="text-xl"
                      style={{ fontFamily: "LogoFont, sans-serif" }}
                    >
                      O - flow
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      HR Management
                    </p>
                  </div>
                </div>
              </div>

              <SidebarGroup className="px-3 py-4">
                <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent className="mt-2">
                  <SidebarMenu className="space-y-1">
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <Link to={item.id}>
                          <SidebarMenuButton
                            isActive={activePath === item.id}
                            className={`w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-all ${
                              activePath === item.id
                                ? "bg-teal text-white shadow-md shadow-teal/20 hover:bg-teal/90"
                                : "hover:bg-muted/50"
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="font-medium">{item.label}</span>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <div className="mt-auto p-4 border-t border-border/50">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Avatar className="w-9 h-9 border-2 border-background">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-teal text-white text-sm">
                      {user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </div>
            </SidebarContent>
          </Sidebar>
        </div>

        <div className="flex-1 flex flex-col">
          <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <div>
                  <h1 className="text-xl font-semibold capitalize">
                    {activePath}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Welcome back, {user?.name.split(" ")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <NotificationPanel />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 hover:bg-muted/50"
                    >
                      <Avatar className="w-8 h-8 border-2 border-border/50">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-teal text-white text-sm">
                          {user?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {user?.role}
                        </p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
