import { useState, useEffect } from "react";
import { MapPin, Package, Filter, Navigation, Layers, Search, Eye, Clock, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getMapItems } from "@/api/items";
import { cn } from "@/lib/utils";

const MapView = () => {
  const [mapItems, setMapItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("map"); // map or list

  const categories = ["Tools", "Kitchen", "Outdoors", "Fitness", "Games", "Electronics", "Books"];

  const fetchMapItems = async () => {
    try {
      setLoading(true);
      const data = await getMapItems();
      setMapItems(data);
      setFilteredItems(data);
    } catch (error) {
      toast.error("Failed to load map data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMapItems();
  }, []);

  useEffect(() => {
    let filtered = [...mapItems];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Filter by availability
    if (availabilityFilter !== "all") {
      filtered = filtered.filter(item => String(item.available) === availabilityFilter);
    }

    setFilteredItems(filtered);
  }, [categoryFilter, availabilityFilter, searchTerm, mapItems]);

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient">
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
              <MapPin className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="heading-classic text-2xl text-slate-900">Loading Map Data</h2>
              <p className="text-elegant">Discovering items in your neighborhood...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Navigation className="h-4 w-4" />
            <span>{filteredItems.length} items found nearby</span>
          </div>
          
          <h1 className="heading-classic text-5xl md:text-6xl mb-6 text-slate-900">
            Neighborhood{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Map
            </span>
          </h1>
          
          <p className="text-elegant text-xl max-w-2xl mx-auto leading-relaxed">
            Discover amazing items shared by your neighbors. See what's available around you and find exactly what you need.
          </p>
        </div>

        {/* Enhanced Filters */}
        <div className="card-elegant p-8 mb-8 animate-slide-up">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search items or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-classic pl-12 h-12"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="input-classic w-48 h-12">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="input-classic w-40 h-12">
                <SelectValue placeholder="All Items" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="true">Available</SelectItem>
                <SelectItem value="false">Borrowed</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                onClick={() => setViewMode("map")}
                className={cn(
                  "h-12 px-6",
                  viewMode === "map" ? "btn-classic" : "btn-outline-classic"
                )}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Map
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className={cn(
                  "h-12 px-6",
                  viewMode === "list" ? "btn-classic" : "btn-outline-classic"
                )}
              >
                <Layers className="h-5 w-5 mr-2" />
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Map/List View */}
        {viewMode === "map" ? (
          <div className="card-elegant mb-8 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="heading-classic text-xl text-slate-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Interactive Neighborhood Map
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Eye className="h-4 w-4" />
                  <span>{filteredItems.length} items visible</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 h-96 flex items-center justify-center relative overflow-hidden">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-12 h-full">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div key={i} className="border border-slate-300" />
                    ))}
                  </div>
                </div>

                {/* Map Center Info */}
                <div className="text-center text-slate-600 z-10">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                    <MapPin className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                    <h3 className="font-semibold text-lg mb-2">Interactive Map View</h3>
                    <p className="text-sm mb-3">Real map integration with Google Maps or Leaflet</p>
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                      <Navigation className="h-3 w-3" />
                      <span>Sector 45, Gurgaon</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Map Pins */}
                {filteredItems.slice(0, 8).map((item, index) => {
                  const positions = [
                    { left: "15%", top: "20%" },
                    { left: "35%", top: "15%" },
                    { left: "55%", top: "25%" },
                    { left: "75%", top: "18%" },
                    { left: "25%", top: "65%" },
                    { left: "45%", top: "70%" },
                    { left: "65%", top: "60%" },
                    { left: "80%", top: "75%" }
                  ];
                  
                  return (
                    <div
                      key={item.itemId}
                      className="absolute cursor-pointer transform hover:scale-125 transition-all duration-300 z-20"
                      style={positions[index]}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className={cn(
                        "relative group",
                        selectedItem?.itemId === item.itemId && "scale-125"
                      )}>
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transition-all duration-300",
                          item.available 
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" 
                            : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700",
                          selectedItem?.itemId === item.itemId && "ring-4 ring-white ring-opacity-50"
                        )}>
                          {index + 1}
                        </div>
                        
                        {/* Hover tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-slate-300">{item.category}</div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {/* Enhanced Selected Item Details */}
        {selectedItem && (
          <div className="card-elegant mb-8 border-2 border-blue-200 animate-scale-in">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"></div>
                <h3 className="heading-classic text-lg text-slate-900">Selected Item</h3>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="heading-classic text-xl text-slate-900 mb-1">{selectedItem.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedItem.address}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs font-medium">
                      {selectedItem.category}
                    </Badge>
                    <Badge 
                      className={cn(
                        "text-xs font-medium",
                        selectedItem.available ? "badge-available" : "badge-borrowed"
                      )}
                    >
                      {selectedItem.available ? "Available Now" : "Currently Borrowed"}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>2 min walk</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button asChild className="btn-elegant">
                    <a href={`/items/${selectedItem.itemId}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </a>
                  </Button>
                  <Button variant="outline" className="btn-outline-classic text-xs">
                    <Navigation className="h-3 w-3 mr-1" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Items List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="heading-classic text-2xl text-slate-900">
              {viewMode === "list" ? "All Items" : "Nearby Items"}
            </h2>
            <div className="text-sm text-slate-500">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="card-elegant p-16 text-center">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="heading-classic text-2xl mb-4 text-slate-900">No Items Found</h3>
              <p className="text-elegant text-lg mb-8 max-w-md mx-auto">
                No items match your current filters. Try adjusting your search criteria.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setAvailabilityFilter("all");
                }}
                className="btn-elegant"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className={cn(
              viewMode === "list" 
                ? "space-y-4" 
                : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            )}>
              {filteredItems.map((item, index) => (
                <div
                  key={item.itemId}
                  className={cn(
                    "card-elegant cursor-pointer transition-all duration-300 hover:shadow-xl animate-scale-in",
                    selectedItem?.itemId === item.itemId && "ring-2 ring-blue-500 ring-opacity-50 shadow-xl",
                    viewMode === "list" && "p-6"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedItem(item)}
                >
                  {viewMode === "list" ? (
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center flex-shrink-0">
                        <Package className="h-8 w-8 text-blue-600" />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="heading-classic text-lg text-slate-900">{item.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{item.address}</span>
                              <span className="text-slate-400">•</span>
                              <Clock className="h-3 w-3" />
                              <span>2 min walk</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <Star className="h-4 w-4 text-amber-400 fill-current" />
                            <span>4.8</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs font-medium">
                            {item.category}
                          </Badge>
                          <Badge 
                            className={cn(
                              "text-xs font-medium",
                              item.available ? "badge-available" : "badge-borrowed"
                            )}
                          >
                            {item.available ? "Available" : "Borrowed"}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm"
                        className="btn-outline-classic"
                      >
                        <a href={`/items/${item.itemId}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center flex-shrink-0">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="heading-classic text-base text-slate-900 truncate">{item.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{item.address}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge 
                              className={cn(
                                "text-xs",
                                item.available ? "badge-available" : "badge-borrowed"
                              )}
                            >
                              {item.available ? "Available" : "Borrowed"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
