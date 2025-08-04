import { useState, useEffect } from "react";
import { MapPin, Package, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getMapItems } from "@/api/items";

const MapView = () => {
  const [mapItems, setMapItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ["Tools", "Kitchen", "Outdoors", "Fitness", "Games"];

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
    if (categoryFilter === "all") {
      setFilteredItems(mapItems);
    } else {
      setFilteredItems(mapItems.filter(item => item.category === categoryFilter));
    }
  }, [categoryFilter, mapItems]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Map View</h1>
        <p className="text-muted-foreground">Find items near you</p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
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
      </div>

      {/* Mock Map Area */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Map (Demo)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-green-100 to-blue-100 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Interactive map would be displayed here</p>
              <p className="text-sm">Using Google Maps or Leaflet</p>
            </div>
            
            {/* Mock pins */}
            {filteredItems.slice(0, 6).map((item, index) => (
              <div
                key={item.itemId}
                className="absolute cursor-pointer transform hover:scale-110 transition-transform"
                style={{
                  left: `${20 + (index % 3) * 30}%`,
                  top: `${30 + Math.floor(index / 3) * 40}%`
                }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Item Details */}
      {selectedItem && (
        <Card className="mb-6 border-primary">
          <CardHeader>
            <CardTitle>Selected Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <h3 className="font-semibold">{selectedItem.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedItem.address}</p>
                <Badge variant={selectedItem.available ? "success" : "secondary"} className="mt-1">
                  {selectedItem.available ? "Available" : "Borrowed"}
                </Badge>
              </div>
              <Button asChild>
                <a href={`/items/${selectedItem.itemId}`}>View Details</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card 
            key={item.itemId} 
            className={`cursor-pointer transition-colors hover:bg-muted/50 ${
              selectedItem?.itemId === item.itemId ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedItem(item)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.address}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <Badge variant={item.available ? "success" : "secondary"} className="text-xs">
                      {item.available ? "Available" : "Borrowed"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MapView;
