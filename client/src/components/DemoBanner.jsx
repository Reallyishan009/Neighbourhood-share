import { useState } from "react";
import { X, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DemoBanner = ({ isOnline = true, onRetry }) => {
  const [isVisible, setIsVisible] = useState(!isOnline);

  if (isOnline || !isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WifiOff className="h-5 w-5" />
            <div>
              <span className="font-medium">Demo Mode Active</span>
              <span className="ml-2 text-orange-100">
                You're viewing sample data. Some features are simulated.
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onRetry && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRetry}
                className="text-white hover:bg-white/20 h-8"
              >
                <Wifi className="h-4 w-4 mr-1" />
                Retry Connection
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoBanner;