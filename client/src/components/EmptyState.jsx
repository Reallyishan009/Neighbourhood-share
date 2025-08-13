import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action, 
  className 
}) => {
  return (
    <div className={cn("card-elegant p-16 text-center", className)}>
      <div className="text-8xl mb-6">{icon}</div>
      <h3 className="heading-classic text-2xl mb-4 text-slate-900">{title}</h3>
      <p className="text-elegant text-lg mb-8 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <Button 
          onClick={action.onClick}
          asChild={action.href ? true : false}
          className="btn-elegant"
        >
          {action.href ? (
            <a href={action.href}>
              {action.icon && <action.icon className="h-4 w-4 mr-2" />}
              {action.label}
            </a>
          ) : (
            <>
              {action.icon && <action.icon className="h-4 w-4 mr-2" />}
              {action.label}
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;