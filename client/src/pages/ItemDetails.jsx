import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const ItemDetails = () => {
  const [item, setItem] = useState({
    id: "itm001",
    name: "Cordless Drill",
    description:
      "18V cordless drill, lightly used. Perfect for home projects and DIY tasks.",
    category: "Tools",
    owner: "Alice Johnson",
    condition: "Good",
    available: true,
    image:
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.4595,
      lng: 77.0266,
      address: "Block A, Sector 45",
    },
  });

  const [loading, setLoading] = useState(false);
  const [requesting, setRequesting] = useState(false);

  // TODO: Implement API integration
  const fetchItem = async () => {};

  // TODO: Implement API integration
  const handleRequestBorrow = async () => {};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Item not found</h3>
        <p className="text-muted-foreground mb-4">
          The item you're looking for doesn't exist
        </p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Items
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden border">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop";
              }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold">{item.name}</h1>
              <Badge
                variant={item.available ? "default" : "secondary"}
                className="text-sm"
              >
                {item.available ? "Available" : "Borrowed"}
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">{item.description}</p>
          </div>

          <Separator />

          {/* Item Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{item.category}</Badge>
              <Badge variant="outline">{item.condition}</Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Owner</p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xs">
                        {item.owner
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{item.owner}</span>
                  </div>
                </div>
              </div>

              {item.location && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {item.location.address}
                    </p>
                  </div>
                </div>
              )}

              {!item.available && item.borrowedBy && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Currently Borrowed By</p>
                    <p className="text-sm text-muted-foreground">
                      {item.borrowedBy}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-4">
            {item.available ? (
              <div className="space-y-3">
                <Button
                  onClick={handleRequestBorrow}
                  disabled={requesting}
                  className="w-full"
                  size="lg"
                >
                  {requesting ? "Requesting..." : "Request to Borrow"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Click to request borrowing this item from {item.owner}
                </p>
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Item Unavailable</CardTitle>
                  <CardDescription>
                    This item is currently borrowed by {item.borrowedBy}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    Currently Borrowed
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
