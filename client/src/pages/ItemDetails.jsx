import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, MapPin, Calendar, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getItemById, requestBorrow } from "@/api/items";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const data = await getItemById(id);
      setItem(data);
    } catch (err) {
      toast.error("Item not found");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestBorrow = async () => {
    try {
      setRequesting(true);
      await requestBorrow(item.id, { userId: "usr123" });
      toast.success("Request sent successfully! 🎉");
      fetchItem();
    } catch (err) {
      toast.error("Could not send request");
    } finally {
      setRequesting(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="skeleton h-8 w-32 mb-8" />
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="skeleton aspect-video rounded-2xl" />
              <div className="space-y-4">
                <div className="skeleton h-8 w-3/4" />
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-24 w-full" />
                <div className="skeleton h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold">Item Not Found</h2>
            <p className="text-muted-foreground">The item you're looking for doesn't exist.</p>
            <Button asChild className="btn-gradient">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button asChild variant="ghost" className="mb-6 hover:bg-white/50">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Items
            </Link>
          </Button>

          {/* Main content */}
          <div className="grid gap-8 lg:grid-cols-2 animate-fade-in">
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full aspect-video object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute top-4 right-4">
                <Badge 
                  variant={item.available ? "success" : "secondary"}
                  className={`shadow-lg text-sm px-3 py-1 ${
                    item.available ? "badge-available" : "badge-borrowed"
                  }`}
                >
                  {item.available ? "Available" : "Borrowed"}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
                <Badge variant="outline" className="mb-4">
                  {item.category}
                </Badge>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Owner info */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {item.owner.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold">Owned by {item.owner}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>4.8 rating • Trusted neighbor</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Item condition */}
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Condition:</span>
                <Badge variant="outline">{item.condition}</Badge>
              </div>

              {/* Borrowed by info */}
              {item.borrowedBy && (
                <Card className="border-yellow-200 bg-yellow-50/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <p className="text-sm">
                      <strong>Currently borrowed by:</strong> {item.borrowedBy}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Action button */}
              {item.available ? (
                <Button
                  onClick={handleRequestBorrow}
                  disabled={requesting}
                  className="w-full h-12 text-lg btn-gradient shadow-lg hover:shadow-xl"
                >
                  {requesting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Request...
                    </div>
                  ) : (
                    `Request to Borrow from ${item.owner}`
                  )}
                </Button>
              ) : (
                <Button disabled className="w-full h-12 text-lg">
                  Currently Unavailable
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
