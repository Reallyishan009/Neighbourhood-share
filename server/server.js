const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration - Allow all origins for now
app.use(cors({
  origin: true, // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Use express built-in parsers instead of body-parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Enhanced mock data with more realistic information
const items = [
  {
    id: "itm001",
    name: "Cordless Drill",
    description: "18V cordless drill with battery and charger. Perfect for home improvement projects. Lightly used, works perfectly.",
    category: "Tools",
    owner: "Alice Johnson",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-10",
    rating: 4.8,
    borrowCount: 3,
    tags: ["power-tools", "diy", "home-improvement"]
  },
  {
    id: "itm002",
    name: "Camping Tent",
    description: "4-person waterproof tent with easy setup. Includes stakes, rainfly, and carrying bag. Perfect for family camping trips.",
    category: "Outdoors",
    owner: "Brian Lee",
    condition: "Excellent",
    available: true,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-08",
    rating: 4.9,
    borrowCount: 5,
    tags: ["camping", "outdoor", "family"]
  },
  {
    id: "itm003",
    name: "Crock Pot",
    description: "Large 6-quart slow cooker with programmable timer. Perfect for meal prep and family dinners. Works great!",
    category: "Kitchen",
    owner: "Samantha Green",
    condition: "Very Good",
    available: false,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    borrowedBy: "Current User",
    createdAt: "2024-01-05",
    rating: 4.7,
    borrowCount: 8,
    tags: ["cooking", "kitchen", "meal-prep"]
  },
  {
    id: "itm004",
    name: "Yoga Mat",
    description: "Non-slip yoga mat, 6mm thick, blue color. Eco-friendly material, perfect for home workouts and meditation.",
    category: "Fitness",
    owner: "Ravi Mehra",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-12",
    rating: 4.6,
    borrowCount: 2,
    tags: ["yoga", "fitness", "meditation"]
  },
  {
    id: "itm005",
    name: "Ladder",
    description: "6-foot aluminum step ladder, sturdy and lightweight. Great for home maintenance, painting, and reaching high places.",
    category: "Tools",
    owner: "Dana Wang",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-03",
    rating: 4.5,
    borrowCount: 6,
    tags: ["ladder", "maintenance", "painting"]
  },
  {
    id: "itm006",
    name: "Board Game: Settlers of Catan",
    description: "Complete set with all pieces included. Great for game nights with friends and family. Ages 10+, 3-4 players.",
    category: "Games",
    owner: "Luis García",
    condition: "Like New",
    available: true,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-15",
    rating: 4.9,
    borrowCount: 1,
    tags: ["board-game", "family", "strategy"]
  },
  {
    id: "itm007",
    name: "Power Saw",
    description: "Circular saw with safety guard and extra blades. Perfect for woodworking projects. Requires experience to operate safely.",
    category: "Tools",
    owner: "Mike Chen",
    condition: "Excellent",
    available: true,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-18",
    rating: 4.8,
    borrowCount: 0,
    tags: ["power-tools", "woodworking", "construction"]
  },
  {
    id: "itm008",
    name: "Stand Mixer",
    description: "KitchenAid stand mixer with multiple attachments. Perfect for baking bread, cakes, and cookies. Heavy-duty motor.",
    category: "Kitchen",
    owner: "Emma Wilson",
    condition: "Very Good",
    available: true,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-20",
    rating: 4.9,
    borrowCount: 4,
    tags: ["baking", "kitchen", "mixer"]
  }
];

// Mock requests data
let userRequests = [
  {
    id: "req001",
    itemId: "itm003",
    itemName: "Crock Pot",
    owner: "Samantha Green",
    status: "approved",
    requestDate: "2024-01-15",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
  },
  {
    id: "req002", 
    itemId: "itm007",
    itemName: "Power Saw",
    owner: "Mike Chen",
    status: "pending",
    requestDate: "2024-01-18",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop"
  }
];

// API routes
app.get("/", (req, res) => {
  res.json({ 
    message: "🏘️ Neighborhood Sharing API is running!",
    version: "1.0.0",
    status: "healthy",
    timestamp: new Date().toISOString(),
    itemsCount: items.length
  });
});

// Simple items endpoint for testing
app.get("/api/items/simple", (req, res) => {
  try {
    res.json(items);
  } catch (error) {
    console.error('Error in simple items endpoint:', error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

app.get("/api", (req, res) => {
  res.json({
    message: "Neighborhood Sharing API",
    version: "1.0.0",
    endpoints: {
      items: [
        "GET /api/items - Get all items with optional filters",
        "GET /api/items/:id - Get specific item details", 
        "POST /api/items - Add new item",
        "PUT /api/items/:id - Update item",
        "DELETE /api/items/:id - Delete item"
      ],
      requests: [
        "POST /api/items/:id/request - Request to borrow item",
        "GET /api/my-requests - Get user's requests",
        "DELETE /api/my-requests/:id - Cancel request"
      ],
      features: [
        "GET /api/map-items - Get items with location data",
        "GET /api/trust-score/:userId - Get user trust score",
        "GET /api/categories - Get available categories",
        "GET /api/stats - Get platform statistics"
      ]
    }
  });
});

// Enhanced Items endpoints
app.get("/api/items", (req, res) => {
  try {
    let filteredItems = [...items];
    
    // Filter by category
    if (req.query.category && req.query.category !== 'all') {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === req.query.category.toLowerCase()
      );
    }
    
    // Filter by availability
    if (req.query.available && req.query.available !== 'all') {
      const isAvailable = req.query.available === 'true';
      filteredItems = filteredItems.filter(item => item.available === isAvailable);
    }
    
    // Search by name or description
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Sort options
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'name':
          filteredItems.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'rating':
          filteredItems.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'popular':
          filteredItems.sort((a, b) => b.borrowCount - a.borrowCount);
          break;
      }
    }
    
    // Check if client wants paginated response
    const wantsPagination = req.query.page || req.query.limit;
    
    if (wantsPagination) {
      // Pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedItems = filteredItems.slice(startIndex, endIndex);
      
      res.json({
        items: paginatedItems,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredItems.length / limit),
          totalItems: filteredItems.length,
          hasNext: endIndex < filteredItems.length,
          hasPrev: startIndex > 0
        }
      });
    } else {
      // Return simple array for backward compatibility
      res.json(filteredItems);
    }
  } catch (error) {
    console.error('Error in /api/items:', error);
    res.status(500).json({ error: "Failed to fetch items", details: error.message });
  }
});

app.get("/api/items/:id", (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

app.post("/api/items", (req, res) => {
  try {
    const { name, description, category, condition, image, tags } = req.body;
    
    // Validation
    if (!name || !description || !category || !condition) {
      return res.status(400).json({ 
        error: "Missing required fields",
        required: ["name", "description", "category", "condition"]
      });
    }
    
    if (name.length < 3) {
      return res.status(400).json({ error: "Item name must be at least 3 characters long" });
    }
    
    if (description.length < 10) {
      return res.status(400).json({ error: "Description must be at least 10 characters long" });
    }
    
    const validCategories = ["Tools", "Kitchen", "Outdoors", "Fitness", "Games", "Electronics", "Books", "Other"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }
    
    const validConditions = ["Like New", "Excellent", "Very Good", "Good", "Fair"];
    if (!validConditions.includes(condition)) {
      return res.status(400).json({ error: "Invalid condition" });
    }
    
    const newItem = {
      id: `itm${String(items.length + 1).padStart(3, "0")}`,
      name: name.trim(),
      description: description.trim(),
      category,
      owner: "Current User",
      condition,
      available: true,
      image: image || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      borrowedBy: null,
      createdAt: new Date().toISOString().split('T')[0],
      rating: 0,
      borrowCount: 0,
      tags: tags || []
    };
    
    items.push(newItem);
    res.status(201).json({ 
      success: true, 
      message: "Item added successfully!",
      item: newItem 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

app.post("/api/items/:id/request", (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  if (!item.available) return res.status(400).json({ error: "Item not available" });

  // Add to user requests
  const newRequest = {
    id: `req${String(userRequests.length + 1).padStart(3, "0")}`,
    itemId: item.id,
    itemName: item.name,
    owner: item.owner,
    status: "pending",
    requestDate: new Date().toISOString().split('T')[0],
    image: item.image
  };
  userRequests.push(newRequest);

  res.json({ success: true, status: "requested", message: `Request sent to ${item.owner}` });
});

// Bonus endpoints
app.get("/api/my-requests", (req, res) => {
  res.json(userRequests);
});

app.delete("/api/my-requests/:id", (req, res) => {
  const requestIndex = userRequests.findIndex(r => r.id === req.params.id);
  if (requestIndex === -1) return res.status(404).json({ error: "Request not found" });
  
  userRequests.splice(requestIndex, 1);
  res.json({ success: true, message: "Request cancelled" });
});

app.get("/api/map-items", (req, res) => {
  const mapData = items.map((item, index) => ({
    itemId: item.id,
    lat: 28.4595 + (Math.random() - 0.5) * 0.1,
    lng: 77.0266 + (Math.random() - 0.5) * 0.1,
    address: `Block ${String.fromCharCode(65 + index % 5)}, Sector ${45 + index}`,
    name: item.name,
    category: item.category,
    available: item.available
  }));
  res.json(mapData);
});

app.get("/api/trust-score/:userId", (req, res) => {
  res.json({
    userId: req.params.userId,
    name: "Current User",
    email: "user@example.com",
    trustScore: 9.2,
    lendingCount: 7,
    borrowingCount: 3,
    positiveFeedback: 96,
    joinDate: "2023-08-15",
    location: "Sector 45, Gurgaon",
    badges: ["Trusted Lender", "Community Helper", "Early Adopter"],
    recentActivity: [
      { type: "lent", item: "Cordless Drill", date: "2024-01-20" },
      { type: "borrowed", item: "Camping Tent", date: "2024-01-18" }
    ]
  });
});

// Additional API endpoints
app.get("/api/categories", (req, res) => {
  const categories = [
    { name: "Tools", count: items.filter(i => i.category === "Tools").length, icon: "🔧" },
    { name: "Kitchen", count: items.filter(i => i.category === "Kitchen").length, icon: "🍳" },
    { name: "Outdoors", count: items.filter(i => i.category === "Outdoors").length, icon: "🏕️" },
    { name: "Fitness", count: items.filter(i => i.category === "Fitness").length, icon: "💪" },
    { name: "Games", count: items.filter(i => i.category === "Games").length, icon: "🎲" },
    { name: "Electronics", count: items.filter(i => i.category === "Electronics").length, icon: "📱" },
    { name: "Books", count: items.filter(i => i.category === "Books").length, icon: "📚" }
  ];
  res.json(categories);
});

app.get("/api/stats", (req, res) => {
  const totalItems = items.length;
  const availableItems = items.filter(i => i.available).length;
  const totalBorrows = items.reduce((sum, item) => sum + item.borrowCount, 0);
  const avgRating = items.reduce((sum, item) => sum + item.rating, 0) / totalItems;
  
  res.json({
    totalItems,
    availableItems,
    borrowedItems: totalItems - availableItems,
    totalBorrows,
    avgRating: Math.round(avgRating * 10) / 10,
    activeUsers: 25,
    communitySavings: totalBorrows * 45 // Estimated savings
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: "1.0.0"
  });
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    path: req.path,
    method: req.method
  });
});

// Global error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API documentation available at http://localhost:${PORT}/api`);
  console.log(`💚 Health check at http://localhost:${PORT}/api/health`);
});
