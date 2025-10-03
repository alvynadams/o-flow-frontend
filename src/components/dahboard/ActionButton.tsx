import type React from "react";
import { Button } from "@/components/ui/button";

type ActionType = {
  title: string;
  description: string;
  color: string;
  icon: React.ElementType;
};

const ActionButton = ({
  title,
  description,
  color,
  icon: Icon,
}: ActionType) => {
  return (
    <Button variant="outline" className="h-auto p-4 justify-start">
      <div className="flex items-center gap-3 w-full">
        <div
          className={`w-8 h-8 ${color} text-white rounded-lg flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Button>
  );
};

export default ActionButton;
