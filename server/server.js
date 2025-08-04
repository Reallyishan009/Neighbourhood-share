const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 500;

app.use(cors());
app.use(bodyParser.json());

// Mock data
const items = [
  {
    id: "itm001",
    name: "Cordless Drill",
    description: "18V cordless drill, lightly used.",
    category: "Tools",
    owner: "Alice Johnson",
    condition: "Good",
    available: true,
    image: "https://picsum.photos/400/300?random=1",
    borrowedBy: null
  },
  {
    id: "itm002",
    name: "Camping Tent",
    description: "4-person waterproof tent, easy setup.",
    category: "Outdoors",
    owner: "Brian Lee",
    condition: "Excellent",
    available: true,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
    borrowedBy: null
  },
  {
    id: "itm003",
    name: "Crock Pot",
    description: "Large 6-quart slow cooker, works great.",
    category: "Kitchen",
    owner: "Samantha Green",
    condition: "Very Good",
    available: false,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    borrowedBy: "Current User"
  },
  {
    id: "itm004",
    name: "Yoga Mat",
    description: "Non-slip yoga mat, 6mm thick, blue color.",
    category: "Fitness",
    owner: "Ravi Mehra",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    borrowedBy: null
  },
  {
    id: "itm005",
    name: "Ladder",
    description: "6-foot aluminum step ladder, sturdy.",
    category: "Tools",
    owner: "Dana Wang",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
    borrowedBy: null
  },
  {
    id: "itm006",
    name: "Board Game: Settlers of Catan",
    description: "Complete set, all pieces included.",
    category: "Games",
    owner: "Luis García",
    condition: "Like New",
    available: true,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
    borrowedBy: null
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
  res.json({ message: "Neighborhood Sharing API is running!" });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Neighborhood Sharing API",
    endpoints: [
      "GET /api/items",
      "GET /api/items/:id", 
      "POST /api/items",
      "POST /api/items/:id/request",
      "GET /api/my-requests",
      "GET /api/map-items",
      "GET /api/trust-score/:userId"
    ]
  });
});

// Items endpoints
app.get("/api/items", (req, res) => res.json(items));

app.get("/api/items/:id", (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

app.post("/api/items", (req, res) => {
  const { name, description, category, condition, image } = req.body;
  if (!name || !description || !category || !condition) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  const newItem = {
    id: `itm${String(items.length + 1).padStart(3, "0")}`,
    name,
    description,
    category,
    owner: "Current User",
    condition,
    available: true,
    image: image || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    borrowedBy: null
  };
  
  items.push(newItem);
  res.status(201).json({ success: true, item: newItem });
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
    location: "Sector 45, Gurgaon"
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
