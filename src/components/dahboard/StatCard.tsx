import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type StatProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  progress?: number;
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  progress,
}: StatProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={`w-8 h-8 ${color} text-white rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        {progress && (
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {progress}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
