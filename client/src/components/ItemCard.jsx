import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MapPin, Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const ItemCard = ({ item, onRequestBorrow }) => (
  <Card className="card-elegant group overflow-hidden animate-fade-in max-w-xs mx-auto">
    {/* Smaller Image Section */}
    <div className="relative aspect-[3/2] overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Compact Status Badge */}
      <div className="absolute top-3 right-3">
        <Badge 
          className={cn(
            "text-xs px-2 py-1 shadow-lg backdrop-blur-sm font-semibold tracking-wide",
            item.available ? "badge-available" : "badge-borrowed"
          )}
        >
          {item.available ? "Available" : "Borrowed"}
        </Badge>
      </div>

      {/* Smaller Like Button */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200">
          <Heart className="h-3 w-3 text-slate-600" />
        </button>
      </div>
    </div>

    <CardHeader className="space-y-3 p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-semibold tracking-wider text-slate-600 bg-slate-50 px-2 py-1">
            {item.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-amber-400 fill-current" />
            <span className="text-xs text-slate-500">4.8</span>
          </div>
        </div>
        
        <CardTitle className="heading-classic text-lg group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
          {item.name}
        </CardTitle>
        
        <CardDescription className="text-elegant text-sm line-clamp-2 leading-relaxed">
          {item.description}
        </CardDescription>
      </div>

      {/* Compact Owner Information */}
      <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
          {item.owner.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-xs font-medium text-slate-900">{item.owner}</p>
          <div className="flex items-center space-x-1">
            <MapPin className="h-2.5 w-2.5 text-slate-400" />
            <span className="text-xs text-slate-500">Sector 45</span>
          </div>
        </div>
      </div>
    </CardHeader>

    <CardContent className="p-4 pt-0">
      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="btn-outline-classic flex-1 text-xs py-2">
          <Link to={`/items/${item.id}`}>Details</Link>
        </Button>

        {item.available && (
          <Button
            onClick={() => onRequestBorrow(item.id)}
            size="sm"
            className="btn-elegant flex-1 text-xs py-2"
          >
            Request
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export default ItemCard;
