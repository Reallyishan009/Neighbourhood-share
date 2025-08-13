import { cn } from "@/lib/utils";

const LoadingSpinner = ({ size = "md", className, children }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <div className="relative">
        <div className={cn(
          "animate-spin rounded-full border-4 border-slate-200 border-t-blue-600",
          sizeClasses[size]
        )} />
        {size === "lg" || size === "xl" ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={cn(
              "animate-pulse text-blue-600",
              size === "lg" ? "text-lg" : "text-xl"
            )}>
              🏘️
            </div>
          </div>
        ) : null}
      </div>
      {children && (
        <div className="text-center space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;