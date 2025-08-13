import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, Trash2, Package, User, Calendar, MessageCircle, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getMyRequests, cancelRequest } from "@/api/items";
import { cn } from "@/lib/utils";

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
      <div className="min-h-screen hero-gradient">
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
              <Package className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="heading-classic text-2xl text-slate-900">Loading Your Requests</h2>
              <p className="text-elegant">Gathering your borrowing history...</p>
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
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>{requests.length} active request{requests.length !== 1 ? 's' : ''}</span>
          </div>
          
          <h1 className="heading-classic text-5xl md:text-6xl mb-6 text-slate-900">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Requests
            </span>
          </h1>
          
          <p className="text-elegant text-xl max-w-2xl mx-auto leading-relaxed">
            Track your borrowing requests and manage your community connections. Stay updated on the status of items you've requested.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="card-elegant p-16 text-center animate-scale-in">
            <div className="text-8xl mb-6">📋</div>
            <h3 className="heading-classic text-2xl mb-4 text-slate-900">No Requests Yet</h3>
            <p className="text-elegant text-lg mb-8 max-w-md mx-auto">
              You haven't made any borrowing requests yet. Start exploring amazing items shared by your neighbors!
            </p>
            <Button asChild className="btn-elegant">
              <a href="/">
                <Package className="h-4 w-4 mr-2" />
                Browse Items
              </a>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="card-elegant p-6 text-center animate-slide-in-left">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {requests.filter(r => r.status === 'pending').length}
                </div>
                <div className="text-sm text-slate-600">Pending</div>
              </div>
              
              <div className="card-elegant p-6 text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {requests.filter(r => r.status === 'approved').length}
                </div>
                <div className="text-sm text-slate-600">Approved</div>
              </div>
              
              <div className="card-elegant p-6 text-center animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {requests.length}
                </div>
                <div className="text-sm text-slate-600">Total Requests</div>
              </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
              {requests.map((request, index) => (
                <div
                  key={request.id}
                  className="card-elegant overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-6">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={request.image}
                          alt={request.itemName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjFGNUY5Ii8+CjxwYXRoIGQ9Ik00MCA1NkM0OC44MzY2IDU2IDU2IDQ4LjgzNjYgNTYgNDBDNTYgMzEuMTYzNCA0OC44MzY2IDI0IDQwIDI0QzMxLjE2MzQgMjQgMjQgMzEuMTYzNCAyNCA0MEMyNCA0OC44MzY2IDMxLjE2MzQgNTYgNDAgNTZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="heading-classic text-xl text-slate-900 mb-1">{request.itemName}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>Owner: {request.owner}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Badge 
                            className={cn(
                              "flex items-center gap-1 text-sm font-medium px-3 py-1",
                              request.status === 'pending' && "bg-yellow-100 text-yellow-800 border-yellow-200",
                              request.status === 'approved' && "bg-green-100 text-green-800 border-green-200",
                              request.status === 'rejected' && "bg-red-100 text-red-800 border-red-200"
                            )}
                          >
                            {getStatusIcon(request.status)}
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                          
                          {request.status === 'approved' && (
                            <Badge variant="outline" className="text-xs">
                              Ready to pickup
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {request.status === "pending" && (
                          <Button
                            onClick={() => handleCancelRequest(request.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        )}
                        
                        {request.status === 'approved' && (
                          <Button size="sm" className="btn-elegant">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact Owner
                          </Button>
                        )}
                        
                        <Button 
                          asChild 
                          variant="outline" 
                          size="sm"
                          className="btn-outline-classic"
                        >
                          <a href={`/items/${request.itemId}`}>
                            View Item
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar for pending requests */}
                  {request.status === 'pending' && (
                    <div className="px-6 pb-4">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span>Request sent</span>
                        <span>Awaiting response</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
