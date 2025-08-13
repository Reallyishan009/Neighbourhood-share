import { useState, useEffect, useMemo } from "react";
import { Search, Grid, List, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ItemCard from "@/components/ItemCard";
import { getAllItems, requestBorrow } from "@/api/items";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { dummyItems } from "@/data/dummyData";

const Home = () => {
  const [items, setItems] = useState(dummyItems); // Start with dummy data
  const [loading, setLoading] = useState(false); // Start with false since we have dummy data
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOnline, setIsOnline] = useState(true);

  const itemsPerPage = 6;
  const categories = ["Tools", "Kitchen", "Outdoors", "Fitness", "Games"];

  const filteredItems = useMemo(() => {
    let filtered = [...items];

    if (searchTerm) {
      filtered = filtered.filter(
        (i) =>
          i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((i) => i.category === categoryFilter);
    }

    if (availabilityFilter !== "all") {
      filtered = filtered.filter(
        (i) => String(i.available) === availabilityFilter
      );
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [items, searchTerm, categoryFilter, availabilityFilter]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(""); // Clear any previous errors
      
      const response = await getAllItems();
      console.log("API Response:", response); // Debug log

      // Handle both old and new API response formats
      const itemsData = response.items || response;
      console.log("Items Data:", itemsData); // Debug log

      if (Array.isArray(itemsData) && itemsData.length > 0) {
        setItems(itemsData);
        setIsOnline(true);
        toast.success("✨ Items loaded from server!");
      } else {
        console.warn("No items from server, using dummy data");
        setItems(dummyItems);
        setIsOnline(false);
        toast.info("📱 Using offline data - some features may be limited");
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setItems(dummyItems); // Always fallback to dummy data
      setIsOnline(false);
      setError(""); // Don't show error since we have fallback data
      toast.info("📱 Working offline - using demo data");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestBorrow = async (itemId) => {
    if (!isOnline) {
      toast.info("📱 Demo mode - Request would be sent in real app!");
      // Simulate request in demo mode
      const item = items.find(i => i.id === itemId);
      if (item) {
        toast.success(`✨ Demo: Request sent for "${item.name}"!`);
      }
      return;
    }

    try {
      await requestBorrow(itemId, { userId: "usr123" });
      toast.success("Request sent successfully! 🎉");
      fetchItems();
    } catch (err) {
      toast.error("Could not send request - working in demo mode");
      // Still show success for demo purposes
      const item = items.find(i => i.id === itemId);
      if (item) {
        toast.success(`✨ Demo: Request sent for "${item.name}"!`);
      }
    }
  };

  useEffect(() => {
    // Try to fetch from API, but don't block the UI
    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient">
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
              <Sparkles className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="heading-classic text-2xl text-slate-900">
                Loading Amazing Items
              </h2>
              <p className="text-elegant">
                Discovering treasures in your neighborhood...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen hero-gradient">
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="heading-classic text-3xl text-slate-900">
              Oops! Something went wrong
            </h2>
            <p className="text-elegant text-lg max-w-md mx-auto">{error}</p>
            <Button onClick={fetchItems} className="btn-elegant">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Elegant Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6",
            isOnline 
              ? "bg-blue-50 text-blue-700" 
              : "bg-orange-50 text-orange-700"
          )}>
            <TrendingUp className="h-4 w-4" />
            <span>
              {isOnline 
                ? "Join 2,500+ neighbors sharing resources" 
                : "Demo Mode - Explore the features!"
              }
            </span>
          </div>

          <h1 className="heading-classic text-5xl md:text-7xl mb-6 text-slate-900">
            Share the{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Abundance
            </span>
          </h1>

          <p className="text-elegant text-xl max-w-3xl mx-auto leading-relaxed">
            Transform your neighborhood into a thriving community where sharing
            creates abundance. Discover amazing items nearby, lend what you
            don't need, and borrow what you do.
          </p>
        </div>

        {/* Refined Search Section */}
        <div className="card-elegant p-8 mb-12 animate-slide-up">
          <div className="flex flex-wrap gap-6">
            <div className="relative flex-1 min-w-[320px]">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search for anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-classic pl-12 h-14 text-lg"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="input-classic w-48 h-14">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={availabilityFilter}
              onValueChange={setAvailabilityFilter}
            >
              <SelectTrigger className="input-classic w-40 h-14">
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
                variant={viewMode === "grid" ? "default" : "outline"}
                size="lg"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid" ? "btn-classic" : "btn-outline-classic"
                }
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="lg"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list" ? "btn-classic" : "btn-outline-classic"
                }
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="heading-classic text-2xl text-slate-900">
              Available Items
            </h2>
            <p className="text-elegant">
              {filteredItems.length} wonderful item
              {filteredItems.length !== 1 ? "s" : ""} waiting to be shared
            </p>
          </div>
        </div>

        {/* Cards Container - Side by Side Layout */}
        {paginatedItems.length === 0 ? (
          <div className="card-elegant p-16 text-center">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="heading-classic text-2xl mb-4 text-slate-900">
              No Items Found
            </h3>
            <p className="text-elegant text-lg mb-8 max-w-md mx-auto">
              We couldn't find any items matching your search. Try adjusting
              your filters or explore different categories.
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
          /* UPDATED: Cards Side by Side Layout */
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {paginatedItems.map((item, index) => (
              <div
                key={item.id}
                className="w-80 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ItemCard item={item} onRequestBorrow={handleRequestBorrow} />
              </div>
            ))}
          </div>
        )}

        {/* Elegant Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="btn-outline-classic"
            >
              Previous
            </Button>

            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-12 h-12 rounded-xl font-semibold",
                      currentPage === page
                        ? "btn-classic"
                        : "btn-outline-classic"
                    )}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="btn-outline-classic"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
