import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Plus, List, MapPin, User, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/add-item", label: "Add Item", icon: Plus },
    { path: "/my-requests", label: "Requests", icon: List },
    { path: "/map", label: "Map", icon: MapPin },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="nav-classic sticky top-0 z-50 w-full">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Elegant Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-slate-900 tracking-tight">
                NeighborShare
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wider">
                COMMUNITY SHARING
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                      isActive 
                        ? "bg-slate-900 text-white shadow-lg hover:shadow-xl" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="hidden md:inline tracking-wide">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
