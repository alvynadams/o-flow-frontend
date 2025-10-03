import { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn button
import { Bell, LayoutDashboard, Settings, Users } from "lucide-react";

const LINKS = [
  {
    Icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    Icon: Users,
    label: "Users",
  },
  {
    Icon: Bell,
    label: "Notifications",
  },
  {
    Icon: Settings,
    label: "Settings",
  },
];

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [active, setActive] = useState<string>("Dashboard");

  return (
    <div className={`w-full col-span-2 relative ${className || ""}`}>
      <div className="flex flex-col p-4 py-10 m-2 rounded-2xl bg-white text-dark shadow-xl gap-10 fixed top-0 left-0 bottom-0 w-1/6">
        <h1 className="text-4xl font-semibold italic text-center">O-flow</h1>

        <div className="flex flex-col gap-2">
          {LINKS.map(({ Icon, label }, index) => (
            <Button
              key={index}
              variant={active === label ? "default" : "ghost"}
              size="lg"
              className="justify-start gap-2 py-3 p-2 rounded-full"
              onClick={() => setActive(label)}
            >
              <span className="p-1.5 rounded-full bg-white text-dark">
                <Icon className="size-3.5" />
              </span>
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
