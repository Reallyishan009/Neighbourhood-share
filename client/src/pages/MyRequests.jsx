import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getMyRequests, cancelRequest } from "@/api/items";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getMyRequests();
      setRequests(data);
    } catch (error) {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRequest = async (requestId) => {
    try {
      await cancelRequest(requestId);
      toast.success("Request cancelled");
      fetchRequests();
    } catch (error) {
      toast.error("Failed to cancel request");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "default";
      case "approved": return "success";
      case "rejected": return "destructive";
      default: return "default";
    }
  };

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
        <h1 className="text-3xl font-bold">My Requests</h1>
        <p className="text-muted-foreground">Track your borrowing requests</p>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No requests yet</p>
            <Button asChild>
              <a href="/">Browse Items</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={request.image}
                    alt={request.itemName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{request.itemName}</h3>
                    <p className="text-sm text-muted-foreground">Owner: {request.owner}</p>
                    <p className="text-sm text-muted-foreground">Requested: {request.requestDate}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge variant={getStatusColor(request.status)} className="flex items-center gap-1">
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>

                    {request.status === "pending" && (
  <Button
    onClick={() => handleCancelRequest(request.id)}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
  >
    <Trash2 className="h-4 w-4" />
    Cancel
  </Button>
)}

                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
