import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend, 
  color = "blue",
  className 
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600", 
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600",
    teal: "from-teal-500 to-cyan-600"
  };

  return (
    <Card className={cn("card-elegant overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-slate-900">{value}</p>
              {trend && (
                <span className={cn(
                  "text-sm font-medium",
                  trend.type === "up" ? "text-green-600" : "text-red-600"
                )}>
                  {trend.type === "up" ? "↗" : "↘"} {trend.value}
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-slate-500">{description}</p>
            )}
          </div>
          
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r",
            colorClasses[color]
          )}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;